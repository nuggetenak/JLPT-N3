# 🤖 AGENT NOTES — JLPT-N3 Practice App
> Last updated by: Claude Agent (June 2026)
> Next agent: pick up from here. Read this FULLY before touching anything.

---

## ✅ What's Done (v0.2.0 — this pass)

All 8 items from the previous agent's TODO list are now done. Summary of what changed:

| # | Task | Status |
|---|---|---|
| 1 | Fix GOI answer distribution (was all `ans:0`) | ✅ Fixed — now 8/9/9/9 across A/B/C/D |
| 2 | Expand GOI to ~35 questions | ✅ 20 → **35** (added g21–g35) |
| 3 | Expand BUNPOU to ~25–30 questions | ✅ 20 → **25** (added b21–b25, all 文章の文法) |
| 4 | Add 1–2 more DOKKAI passages | ✅ Added `d4` (情報検索 type) → 3 → **4 passages, 13 Qs total** |
| 5 | Build ReviewMode component | ✅ `src/components/ReviewMode.jsx` — works for both linear (GOI/BUNPOU) and passage-based (DOKKAI) sections, with an "all / wrong only" filter toggle |
| 6 | Add option shuffle (different order on retry) | ✅ `shuffleOptions()` in `scoring.js`, applied fresh on every mount of `QuizSection`/`DokkaiSection` |
| 7 | Add progress persistence (localStorage) | ✅ `src/utils/storage.js` — persists scores **and full session data** (so review still works after a refresh, not just bare scores) |
| 8 | Test deploy on GitHub Pages, verify routing | ⚠️ Partially done — see note below |

**On #8:** I don't have a real browser or live internet access to GitHub Pages from this environment, so I couldn't click through the actual deployed `https://nuggetenak.github.io/JLPT-N3/` URL. Instead I built a thorough substitute: `npm run test:smoke` runs the **real production bundle** (`vite build` output, including the `/JLPT-N3/` base path) inside jsdom and drives it like a real user — clicking actual buttons, reading actual rendered text. It covers all 3 sections end-to-end, ReviewMode, a simulated page refresh (fresh JS context + carried-over localStorage), and the reset action. All 32 checks pass. **Owner should still do one real click-through on the live Pages URL** after enabling Pages (Settings → Pages → Source: GitHub Actions), just to rule out anything jsdom can't catch (real network/CDN issues, mobile viewport quirks, etc.) — but the app logic itself is now well-verified.

---

## 🐛 A bug I found *while verifying* (not in the original list) — now fixed

When I bumped GOI to 35 and BUNPOU to 25 questions, several places still had the **old counts hardcoded as `20`**:
- `Home.jsx` — section card totals + hero total score denominator + banner question count
- `Results.jsx` — score breakdown totals + total score denominator
- `scoring.js` — `buildAdvice()` percentage calculations

This silently broke the score badges (e.g. showing "✓ 30/20 (150%)" instead of "✓ 30/35 (86%)"). My smoke test caught it immediately (the regex check for `/✓ \d+\/35/` failed even though the underlying score was correct).

**Root-caused fix:** added `TOTAL_GOI_QS` and `TOTAL_BUNPOU_QS` to `src/data/index.js`, computed directly from `GOI_QUESTIONS.length` / `BUNPOU_QUESTIONS.length` (same pattern as the pre-existing `TOTAL_DOKKAI_QS`). **Nothing should ever hardcode a question count again** — always import these constants. If you add more questions later, the counts update everywhere automatically.

---

## Architecture (updated)

```
src/data/        ← QUESTION DATABASE — all content edits go here
  goi.js         35 GOI questions + GOI_CONFIG   (8/9/9/9 answer distribution)
  bunpou.js      25 BUNPOU questions + BUNPOU_CONFIG
  dokkai.js      4 passages (13 total Qs) + DOKKAI_CONFIG
  index.js       barrel export + SECTIONS + TOTAL_GOI_QS + TOTAL_BUNPOU_QS + TOTAL_DOKKAI_QS

src/components/
  QuizSection.jsx     shared quiz UI (GOI + BUNPOU) — shuffles opts fresh per attempt,
                       emits { questions, answers } session data on completion
  DokkaiSection.jsx   reading passage UI — same shuffle + session-emit pattern
  ReviewMode.jsx       ★ NEW — wrong-answer review screen, handles both session shapes
  Home.jsx            section picker — now shows "📝 復習" link + reset-progress link
  Results.jsx         score breakdown + advice — now has per-section "📝 復習" buttons
  ui/index.jsx        OptionButton, ExplanationBox, SectionCard (+ hasSession/onReview props)
  ui/ProgressHeader.jsx  sticky timer header

src/hooks/useTimer.js     countdown timer hook (unchanged)
src/utils/
  scoring.js         calcScore, calcDokkaiScore, getLevel, buildAdvice (now takes per-section
                      maxes instead of hardcoded 20), formatTime, shuffleOptions ★ NEW
  storage.js         ★ NEW — loadProgress / saveProgress / clearProgress (localStorage,
                      versioned payload, fails safe to empty state on corruption)

src/App.jsx          router + state — now also tracks `sessions` (per-section review data),
                      a "review" screen with reviewKey/reviewFrom, and resetProgress()
src/main.jsx         entry point (unchanged)

scripts/
  smoke-test.mjs     ★ NEW — e2e smoke test against the real built bundle (see below)

.github/workflows/deploy.yml   auto-deploy to GitHub Pages on push to main (unchanged)
```

**Deploy:** GitHub Pages auto-deploys via Actions on every push to `main`.
URL: `https://nuggetenak.github.io/JLPT-N3/`
⚠️ Owner still needs to enable Pages if not done already: **Settings → Pages → Source: GitHub Actions**

---

## 🧪 Testing — `npm run test:smoke`

```bash
npm run test:smoke
```

This runs `vite build` then drives the **actual production bundle** inside jsdom (no mocking of components — it's literally clicking buttons in the real compiled app). Checks: all 3 sections completable end-to-end with correct question counts, ReviewMode for both linear and passage-based sections, localStorage survives a simulated refresh (new JS context + carried-over storage, not just re-running in the same context — that causes false "already declared" errors since the bundle has top-level `const`s), and reset-progress clears everything correctly.

There's no other test infra in this repo (no vitest/jest) — this is a single pragmatic smoke-test script, not a full suite. If this app keeps growing, consider migrating to a real test runner; for now this is enough to catch the class of regression bugs (like the hardcoded-20 one above) that "looks right in a 5-second glance" but is wrong.

`jsdom` is a **devDependency only** — doesn't touch the production bundle at all (verified: same ~186KB output before/after adding it).

---

## ⚠️ Pre-existing, out-of-scope item: npm audit warning

`npm install` reports 2 high-severity advisories in `esbuild`/`vite` (dev-server-only, not present in production builds — see GHSA-67mh-4wv8-2f99). This predates my changes; it was already there on a clean `npm install` of the original scaffold. Fixing it means `npm audit fix --force` → upgrades to **vite 8**, a breaking major-version change that's out of scope for a content/feature pass like this one. Flagging it here so it doesn't get silently fixed-or-ignored without the owner's input — it's a "someday, deliberately" task, not a "right now" one.

---

## 📋 Remaining / optional future work (nothing urgent)

Everything from the previous TODO list is done. What's left is genuinely optional, lower-priority polish — not bugs:

1. **聴解 (Listening) section** — still intentionally excluded (needs licensed/sourced audio files). Scaffold note from last time still applies: `public/audio/*.mp3` + `src/data/choukai.js` + a `ChoukaiSection.jsx` with `<audio>`.
2. **文の並べ替え (sentence-ordering / 4-choice scramble)** question type for BUNPOU — real N3 has this as one of its 5 文法 sub-types; would need a new drag-or-tap-to-order UI component, not just new data rows. Bigger lift than the others.
3. Could keep growing GOI/BUNPOU further toward exact real-exam proportions (real N3 文字語彙 ≈35 ✅ now matches; 文法 ≈25–30, currently 25, in range) — diminishing returns at this point though.
4. If question volume keeps growing, consider migrating `test:smoke` to a real test runner (vitest) with per-feature test files instead of one long script.

---

## 📁 How to Add Questions (unchanged schema, just bigger arrays now)

**GOI/BUNPOU question schema:**
```js
{
  id: "g36",           // unique, increment from last id in the file
  cat: "📖 問題1｜漢字の読み方",
  text: "Sentence with 【highlighted】 word.",
  q: "Question text？",
  opts: ["correct", "wrong1", "wrong2", "wrong3"],  // vary which index is correct!
  ans: 0,              // 0=A, 1=B, 2=C, 3=D — check the running A/B/C/D balance, don't dump them all on one letter
  exp: "Explanation in Indonesian/Japanese.",
}
```

**DOKKAI passage schema:**
```js
{
  id: "d5",
  type: "短文",        // 短文 | 中文 | 長文 | 情報検索
  label: "問題E｜短文読解",
  icon: "📰",
  col: "#DC2626",
  title: "Passage Title",
  text: `Full passage text...`,
  qs: [{ id: "d5q1", q: "...", opts: [...], ans: 0, exp: "..." }],
}
```

**Reminder:** never hardcode a question-count number in a component. Import `TOTAL_GOI_QS` / `TOTAL_BUNPOU_QS` / `TOTAL_DOKKAI_QS` from `src/data/index.js` — they're derived live from the arrays, so adding/removing questions can never make the counts drift out of sync again.

---

## 🔧 Dev Setup

```bash
npm install
npm run dev          # localhost:5173
npm run build         # build to /dist
npm run test:smoke    # build + run the e2e smoke test against the real bundle
```

GitHub Pages deploys automatically on push to `main` via `.github/workflows/deploy.yml`.

---

*— Claude Agent, June 2026*
