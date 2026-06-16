# 🤖 AGENT NOTES — JLPT-N3 Practice App
> Last updated by: Claude Sonnet (June 2026)  
> Next agent: pick up from here. Read this FULLY before touching anything.

---

## ✅ What's Done (v0.1.0)

Full Vite + React app scaffolded and pushed to this repo.

**Architecture:**
```
src/data/        ← QUESTION DATABASE — all edits go here
  goi.js         20 GOI questions + GOI_CONFIG
  bunpou.js      20 BUNPOU questions + BUNPOU_CONFIG
  dokkai.js      3 passages (9 total Qs) + DOKKAI_CONFIG
  index.js       barrel export + SECTIONS array + TOTAL_DOKKAI_QS

src/components/
  QuizSection.jsx     shared quiz UI (GOI + BUNPOU)
  DokkaiSection.jsx   reading passage UI
  Home.jsx            section picker
  Results.jsx         score breakdown + advice
  ui/index.jsx        OptionButton, ExplanationBox, SectionCard
  ui/ProgressHeader.jsx  sticky timer header

src/hooks/useTimer.js     countdown timer hook
src/utils/scoring.js      calcScore, calcDokkaiScore, getLevel, buildAdvice, formatTime
src/App.jsx               router + state (screen, scores, timer)
src/main.jsx              entry point

.github/workflows/deploy.yml   auto-deploy to GitHub Pages on push to main
```

**Deploy:** GitHub Pages auto-deploys via Actions on every push to `main`.  
URL will be: `https://nuggetenak.github.io/JLPT-N3/`  
⚠️ Owner needs to enable Pages: **Settings → Pages → Source: GitHub Actions**

---

## 🐛 KNOWN BUGS (fix these first!)

### 🔴 CRITICAL — GOI answers are all index 0 (always option A)

Every single question in `src/data/goi.js` has `ans: 0`. This means the correct
answer is **always option A**. A test-taker will notice this pattern immediately.

**Root cause:** When writing the questions, all correct options were placed at
index 0 (first in the opts array) for simplicity, but the `ans` field was never
shuffled.

**Fix options:**
1. **Quick fix:** Manually rotate correct answers in `goi.js` so they're spread
   across A/B/C/D (edit each `opts` array and update `ans` accordingly).
2. **Better fix:** Add a `shuffleOptions(questions)` utility in `scoring.js` that
   randomizes `opts` order and updates `ans` index at runtime. Call it in
   `QuizSection.jsx` before rendering.

BUNPOU is fine (has ans 0, 1, 2 mixed). Dokkai is fine too.

---

### 🟡 MEDIUM — Question count is low for a real N3 mock exam

Current counts vs. real JLPT N3:

| Section | This app | Real N3 |
|---|---|---|
| 文字・語彙 | 20 | ~35 |
| 文法 | 20 | ~25 |
| 読解 | 9 | ~15–18 |

Owner said **"banyak kurang nya"** (many things missing). The main gap is question
quantity and variety.

**Suggested additions for `src/data/goi.js`:**
- 問題1 漢字の読み方: add 5–10 more (compound words, common verbs)
- 問題2 漢字の書き方: add 5 more
- 問題3 文脈規定: add 5 more (context-based vocabulary)
- 問題4 言い換え類義: add 5 more (synonym/paraphrase)
- 問題5 用法: add 5 more (word usage)

**Suggested additions for `src/data/bunpou.js`:**
- Add ～だけでなく、～し、～ほど、～ながら (already have but more variety)
- Add more 文章の文法 (paragraph-level grammar, currently only 1 Q)
- Add 文の並べ替え (sentence ordering) — requires new UI component

**Suggested additions for `src/data/dokkai.js`:**
- Add 1–2 more short passages (notices, emails, ads)
- Add 情報検索 type (information retrieval — table/chart reading)

---

### 🟡 MEDIUM — No wrong-answer review after section ends

After completing a section, user just goes back to home with a score number.
They can't see *which* questions they got wrong.

**Fix:** Add a `ReviewMode` component that shows:
- All questions in the completed section
- User's answer vs. correct answer (color-coded)
- Explanation for wrong answers

Suggested flow: Results screen → "間違えた問題を見る" button → ReviewMode

---

### 🟡 MEDIUM — 聴解 (Listening) section missing

Real JLPT N3 has a 聴解 section (40 min). It's intentionally excluded because
it requires audio files, which are hard to source legally.

**If owner wants to add it:**
- Upload `.mp3` files to `/public/audio/`
- Create `src/data/choukai.js` with `{ ...question, audioSrc: "/audio/c01.mp3" }`
- Build a `ChoukaiSection.jsx` with an `<audio>` element

---

## 📋 NEXT AGENT TODO (priority order)

1. **[ ] Fix GOI answer distribution** (CRITICAL — all `ans: 0`)
2. **[ ] Add ~20 more GOI questions** to reach ~35 total
3. **[ ] Add ~10 more BUNPOU questions**, especially 文章の文法
4. **[ ] Add 1–2 more DOKKAI passages** (short/info-retrieval type)
5. **[ ] Build ReviewMode component** (wrong answer review after each section)
6. **[ ] Add question shuffle** so same questions appear in different order on retry
7. **[ ] Add progress persistence** (localStorage so score survives page refresh)
8. **[ ] Test deploy** on GitHub Pages and verify routing works

---

## 📁 How to Add Questions

See the top of each data file for a JSDoc template. Summary:

**GOI/BUNPOU question schema:**
```js
{
  id: "g21",           // unique, increment
  cat: "📖 問題1｜漢字の読み方",
  text: "Sentence with 【highlighted】 word.",
  q: "Question text？",
  opts: ["correct", "wrong1", "wrong2", "wrong3"],  // vary which index is correct!
  ans: 0,              // 0=A, 1=B, 2=C, 3=D
  exp: "Explanation in Indonesian/Japanese.",
}
```

**DOKKAI passage schema:**
```js
{
  id: "d4",
  type: "短文",        // 短文 | 中文 | 長文
  label: "問題D｜短文読解",
  icon: "📰",
  col: "#DC2626",
  title: "Passage Title",
  text: `Full passage text...`,
  qs: [{ id: "d4q1", q: "...", opts: [...], ans: 0, exp: "..." }],
}
```

---

## 🔧 Dev Setup

```bash
npm install
npm run dev       # localhost:5173
npm run build     # build to /dist
```

GitHub Pages deploys automatically on push to `main` via `.github/workflows/deploy.yml`.

---

*— Claude Agent, June 2026*
