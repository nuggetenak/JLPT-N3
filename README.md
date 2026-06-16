# 📚 JLPT N3 Practice — Nugget Nihongo

Latihan JLPT N3 komprehensif dengan 3 seksi, timer, dan penjelasan per soal.  
Built with **Vite + React**, deploy otomatis ke **GitHub Pages**.

---

## ✨ Fitur

| Seksi | Soal | Waktu |
|---|---|---|
| 📝 文字・語彙 (Moji/Goi) | 35 | 30 menit |
| 🔤 文法 (Bunpou) | 25 | 70 menit |
| 📖 読解 (Dokkai) | 13 (4 passage) | 40 menit |

- ⏱ Timer real-time per seksi
- ✅ Feedback langsung benar/salah
- 💡 Penjelasan setiap soal (Indonesia + Jepang)
- 🔀 Urutan pilihan jawaban di-shuffle tiap kali mulai/ulang seksi
- 📝 ReviewMode — lihat semua soal yang salah + penjelasan setelah seksi selesai
- 💾 Progress tersimpan di localStorage (refresh browser nggak hilang)
- 📊 Hasil lengkap + advice berdasarkan skor
- 🔄 Bisa diulang tiap seksi

---

## 🗂 Struktur Project

```
jlpt-n3-practice/
├── index.html
├── package.json
├── vite.config.js             ← ⚠️ Set REPO_NAME di sini
├── .github/
│   └── workflows/
│       └── deploy.yml         ← Auto-deploy ke GitHub Pages
├── scripts/
│   └── smoke-test.mjs         ← e2e check against the real built bundle (npm run test:smoke)
└── src/
    ├── main.jsx               ← Entry point
    ├── App.jsx                ← Router + state utama (screens, scores, sessions, timer)
    │
    ├── data/                  ← 📦 DATABASE SOAL (edit di sini!)
    │   ├── goi.js             ← 35 soal 文字・語彙
    │   ├── bunpou.js          ← 25 soal 文法
    │   ├── dokkai.js          ← 4 passage 読解 (13 soal)
    │   └── index.js           ← Barrel export + TOTAL_*_QS constants
    │
    ├── hooks/
    │   └── useTimer.js        ← Countdown timer hook
    │
    ├── utils/
    │   ├── scoring.js         ← Score calc + advice + shuffleOptions
    │   └── storage.js         ← localStorage persistence (scores + review sessions)
    │
    └── components/
        ├── Home.jsx           ← Halaman utama
        ├── QuizSection.jsx    ← Quiz (shared: GOI & BUNPOU)
        ├── DokkaiSection.jsx  ← Reading section
        ├── Results.jsx        ← Layar hasil
        ├── ReviewMode.jsx     ← Review jawaban salah + penjelasan
        └── ui/
            ├── index.jsx      ← OptionButton, ExplanationBox, SectionCard
            └── ProgressHeader.jsx
```

---

## 🚀 Setup & Deploy

### 1. Clone & Install

```bash
git clone https://github.com/nuggetenak/jlpt-n3-practice.git
cd jlpt-n3-practice
npm install
npm run dev
```

### 2. Deploy ke GitHub Pages

1. **Set repo name** di `vite.config.js`:
   ```js
   const REPO_NAME = '/jlpt-n3-practice/'  // ganti sesuai nama repo kamu
   ```

2. **Enable GitHub Pages** di repo settings:
   - Settings → Pages → Source: **GitHub Actions**

3. **Push ke `main`** → GitHub Actions otomatis build & deploy! ✅

---

## ➕ Cara Tambah Soal

### Tambah soal GOI (`src/data/goi.js`)

```js
// Copy template ini dan append ke GOI_QUESTIONS array:
{
  id: "g36",                          // ID unik — cek ID terakhir di file (sekarang sudah sampai g35)
  cat: "📖 問題1｜漢字の読み方",       // pilih kategori yang sesuai
  text: "彼は毎日【努力】しています。", // kalimat soal (pakai 【】 untuk highlight)
  q: "【努力】の読み方はどれですか？",  // pertanyaan
  opts: ["どりょく", "どうりょく", "のりょく", "のうりょく"],  // 4 pilihan
  ans: 0,                             // index jawaban benar (0–3)
  exp: "努力（どりょく）= usaha. Penjelasan dalam bahasa Indonesia/Jepang.",
},
```

### Tambah soal BUNPOU (`src/data/bunpou.js`)

```js
{
  id: "b26",                          // sudah sampai b25 — lanjut dari sini
  cat: "📝 問題1｜文の文法",
  text: "雨が降って（　）、試合は中止になりました。",
  q: "（　）に入る最も適切なものはどれですか？",
  opts: ["しまい", "いたので", "しまったので", "きたので"],
  ans: 2,
  exp: "〜てしまったので = karena telah ... (sudah terjadi, jadi alasan). Penjelasan grammar.",
},
```

### Tambah passage DOKKAI (`src/data/dokkai.js`)

```js
{
  id: "d5",                 // sudah sampai d4 — lanjut dari sini
  type: "中文",             // 短文 | 中文 | 長文 | 情報検索
  label: "問題E｜中文読解",
  icon: "📰",
  col: "#DC2626",           // warna accent
  title: "Judul Passage",
  text: `Isi teks passage di sini.
Bisa multi-line dengan template literal.`,
  qs: [
    {
      id: "d5q1",
      q: "この文章の内容と合うものはどれですか。",
      opts: ["Jawaban A", "Jawaban B", "Jawaban C", "Jawaban D"],
      ans: 0,
      exp: "Penjelasan mengapa jawaban A benar, lengkap dengan referensi ke teks.",
    },
  ],
},
```

---

## 📐 Question Schema

### `Question` (GOI & BUNPOU)

| Field | Type | Keterangan |
|---|---|---|
| `id` | `string` | ID unik, format `g##` atau `b##` |
| `cat` | `string` | Label kategori (muncul di atas soal) |
| `text` | `string` | Kalimat soal. Gunakan `【word】` untuk highlight |
| `q` | `string` | Teks pertanyaan |
| `opts` | `string[4]` | Tepat 4 pilihan jawaban |
| `ans` | `0\|1\|2\|3` | Index jawaban benar |
| `exp` | `string` | Penjelasan setelah menjawab |

### `Passage` (DOKKAI)

| Field | Type | Keterangan |
|---|---|---|
| `id` | `string` | ID unik, format `d#` |
| `type` | `"短文"\|"中文"\|"長文"\|"情報検索"` | Tipe passage |
| `label` | `string` | Label header, e.g. `"問題A｜短文読解"` |
| `icon` | `string` | Emoji icon |
| `col` | `string` | Hex color untuk accent passage ini |
| `title` | `string` | Judul passage |
| `text` | `string` | Isi teks lengkap |
| `qs` | `DokkaiQuestion[]` | Array pertanyaan (biasanya 2–5) |

---

## 🎨 Warna Section

| Section | Color |
|---|---|
| 文字・語彙 | `#7C3AED` (purple) |
| 文法 | `#2563EB` (blue) |
| 読解 | `#059669` (green) |

---

## 📦 Tech Stack

- **Vite 5** — build tool
- **React 18** — UI
- **Pure inline styles** — no CSS framework dependency
- **GitHub Actions** — CI/CD
- **GitHub Pages** — hosting (free)

---

*Part of the **Nugget Nihongo** project ecosystem.*
