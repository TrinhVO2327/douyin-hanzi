# Zizi — Chinese for comments

A mobile-first, local-only Chinese character learning game for Vietnamese speakers who want to understand casual simplified-Chinese social media comments. Built with Vite, React, TypeScript, Tailwind CSS, and Vitest. No backend or account required.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL Vite prints. To run the tests and production build:

```bash
npm test
npm run build
npm run preview
```

## Features

- **Flashcards:** daily queue, new-card limit, Again / Hard / Good / Easy scheduling, pinyin, English and Vietnamese meanings, Hán-Việt when supplied, examples, and browser speech (`zh-CN`).
- **Comment reader:** simulated vertical-feed comments, character tap-to-define, reading coverage, comprehension questions, and mastered/learning/new highlighting.
- **Quick quiz:** multiple choice for meaning, reverse meaning, pinyin, Hán-Việt, and audio.
- **Speed match:** six hanzi-to-meaning pairs, combo scoring, 60-second sprint.
- **Character grid, slang guide, stats, local JSON export/import, settings, XP and level.**

## Data and accuracy notes

- `src/data/hanzi.ts` exports a typed `Hanzi[]` starter list. Each entry includes `char`, `pinyin`, `tones`, `meaningEn`, `meaningVi`, `hanViet`, `exampleComment`, and `frequencyRank`.
- `src/data/slang.ts` exports a typed `Slang[]` list with literal meaning, usage/vibe, Vietnamese meaning, and an example. Entries marked `todo` are intentionally flagged for further verification.
- This is a practical starter dataset, **not a corpus-certified top-300 frequency ranking**. Some entries are multi-character vocabulary useful for comments rather than single hanzi, and the current sample examples are intentionally short. Before using it as a rigorous frequency curriculum, replace/expand the starter list with a corpus-checked list and review pinyin/Hán-Việt readings. Empty Hán-Việt fields mean no reading was supplied; do not infer one automatically.
- Frequency ranks are assigned in the order of the deduplicated list. Edit the order if you want to prioritize a different corpus or comment genre.

## Add characters

1. Open `src/data/hanzi.ts` and add an item to the `raw` list in the form `[character, pinyin, English meaning, Vietnamese meaning, Hán-Việt reading]`.
2. Use tone-marked pinyin. If a reading or Hán-Việt form is uncertain, leave the Hán-Việt field as `TODO` (rendered as empty) and add a source/verification comment instead of guessing.
3. Add or update natural Chinese, pinyin, English, and Vietnamese example-comment text in the `comments` array / mapping. For production quality, attach examples per entry rather than cycling the starter examples.
4. Run `npm test && npm run build`.

## Local data

Progress is stored under `hanzi-flow-progress-v1` in browser `localStorage`. Use **Settings → Export JSON** for a backup before clearing site data. Import accepts a previously exported Zizi JSON. Reset is permanent for the current browser after confirmation.

## Limitations

Speech synthesis depends on browser/OS voice availability; Safari and mobile browsers may need a user tap before playback. Audio quiz questions use browser speech. The game has no backend, sync, authentication, or remote analytics. Daily streak tracking is a lightweight local prototype and can be extended with stricter calendar-day rollover logic.
