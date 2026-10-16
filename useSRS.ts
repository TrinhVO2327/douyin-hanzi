import {useMemo} from 'react';import {dailyQueue} from '../lib/srs';import {hanzi} from '../data/hanzi';import type {Progress} from './useProgress';
export function useSRS(p:Progress){return useMemo(()=>dailyQueue(hanzi,p.states,p.dailyNew),[p.states,p.dailyNew])}
