import { useEffect, useState } from 'react';
import { freshCard, type ReviewState } from '../lib/srs';

export type Progress = {
  states: Record<string, ReviewState>;
  xp: number;
  streak: number;
  lastDay: string;
  dailyNew: number;
  language: 'en' | 'vi' | null;
  showHV: boolean;
  accuracy: Record<string, { right: number; total: number }>;
  games: number;
};

const KEY = 'hanzi-flow-progress-v1';
const initial: Progress = {
  states: {},
  xp: 0,
  streak: 0,
  lastDay: '',
  dailyNew: 10,
  language: null,
  showHV: true,
  accuracy: {},
  games: 0,
};

function localDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function markStudyActivity(progress: Progress): Progress {
  const now = new Date();
  const today = localDateKey(now);
  if (progress.lastDay === today) return progress;
  const yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
  const streak = progress.lastDay === localDateKey(yesterday) ? progress.streak + 1 : 1;
  return { ...progress, streak, lastDay: today };
}

function loadProgress(): Progress {
  try {
    const saved = localStorage.getItem(KEY);
    return saved ? { ...initial, ...JSON.parse(saved) } : initial;
  } catch {
    // Keep the game usable when storage is unavailable or contains invalid data.
    return initial;
  }
}

export function useProgress() {
  const [p, setP] = useState<Progress>(loadProgress);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(p));
    } catch {
      // Storage can be disabled or full; progress remains available for this session.
    }
  }, [p]);

  const stateFor = (id: string) => p.states[id] ?? freshCard();
  const updateState = (id: string, state: ReviewState) =>
    setP((value) => { const tracked = markStudyActivity(value); return { ...tracked, states: { ...tracked.states, [id]: state }, xp: tracked.xp + 5 }; });
  const addXP = (amount: number) => setP((value) => { const tracked = markStudyActivity(value); return { ...tracked, xp: tracked.xp + amount }; });
  const record = (mode: string, correct: boolean) =>
    setP((value) => {
      const tracked = markStudyActivity(value);
      return {
        ...tracked,
        accuracy: {
          ...tracked.accuracy,
          [mode]: {
            right: (tracked.accuracy[mode]?.right ?? 0) + (correct ? 1 : 0),
            total: (tracked.accuracy[mode]?.total ?? 0) + 1,
          },
        },
        games: tracked.games + 1,
        xp: tracked.xp + (correct ? 10 : 2),
      };
    });
  const patch = (changes: Partial<Progress>) => setP((value) => ({ ...value, ...changes }));
  const reset = () => {
    try {
      localStorage.removeItem(KEY);
    } catch {
      // Reset the in-memory session even when storage cannot be reached.
    }
    setP(initial);
  };

  return { p, setP, stateFor, updateState, addXP, record, patch, reset };
}
