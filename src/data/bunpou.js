/**
 * @fileoverview 文法 Question Bank
 *
 * HOW TO ADD A NEW QUESTION:
 * {
 *   id: "b##",          // unique, sequential (b01, b02, ...)
 *   cat: "📝 問題1｜文の文法",
 *   text: "Sentence with （　） blank.",
 *   q: "（　）に入る最も適切なものはどれですか？",
 *   opts: ["correct", "wrong1", "wrong2", "wrong3"],
 *   ans: 0,             // index 0–3
 *   exp: "Grammar explanation in Indonesian/Japanese mix.",
 * },
 */

/** @type {import('./goi.js').Question[]} */
export const BUNPOU_QUESTIONS = [
  // ─────────────────────────────────────────────
  // 問題1: 文の文法（接続・助詞）  (B01–B08)
  // ─────────────────────────────────────────────
  {
    id: "b01",
    cat: "📝 問題1｜文の文法",
    text: "毎日練習した（　）、試合に負けてしまいました。",
    q: "（　）に入る最も適切なものはどれですか？",
    opts: ["から", "ので", "のに", "ために"],
    ans: 2,
    exp: "〜のに = meskipun (hasil berlawanan dari harapan → ungkapan kekecewaan). 練習したのに負けた = sudah latihan tapi kalah. ※から/のでは 理由を表す。",
  },
  {
    id: "b02",
    cat: "📝 問題1｜文の文法",
    text: "彼は音楽を聴き（　）、勉強しています。",
    q: "（　）に入る最も適切なものはどれですか？",
    opts: ["ながら", "から", "のに", "ので"],
    ans: 0,
    exp: "〜ながら = sambil (dua aksi bersamaan). 音楽を聴きながら勉強する = belajar sambil dengar musik. 動詞ます形 + ながら！",
  },
  {
    id: "b03",
    cat: "📝 問題1｜文の文法",
    text: "日本語が話せる（　）、毎日練習しています。",
    q: "（　）に入る最も適切なものはどれですか？",
    opts: ["ために", "ように", "から", "ので"],
    ans: 1,
    exp: "〜ように = supaya/agar bisa (perubahan kemampuan jadi tujuan). 話せるように練習する = berlatih agar bisa berbicara. ※ために = tujuan yang dilakukan secara sadar oleh diri sendiri.",
  },
  {
    id: "b04",
    cat: "📝 問題1｜文の文法",
    text: "彼女はもう駅に着いている（　）です。10分前に出発したので。",
    q: "（　）に入る最も適切なものはどれですか？",
    opts: ["はず", "わけ", "もの", "こと"],
    ans: 0,
    exp: "〜はずだ = seharusnya (berdasarkan logika/pengetahuan). 10分前に出発した → 着いているはず。情報・知識からの推測！",
  },
  {
    id: "b05",
    cat: "📝 問題1｜文の文法",
    text: "天気予報によると、明日は雨が降る（　）です。",
    q: "（　）に入る最も適切なものはどれですか？",
    opts: ["らしい", "そう", "よう", "みたい"],
    ans: 0,
    exp: "〜らしい = katanya/konon (dari sumber terpercaya seperti berita/ramalan). 天気予報によると → らしい が最適！",
  },
  {
    id: "b06",
    cat: "📝 問題1｜文の文法",
    text: "彼はゲームをして（　）いて、全然勉強しません。",
    q: "（　）に入る最も適切なものはどれですか？",
    opts: ["ばかり", "だけ", "しか", "まで"],
    ans: 0,
    exp: "〜てばかりいる = hanya melakukan itu terus-terusan (konotasi negatif/kritik). ゲームをしてばかりいる = cuma main game mulu.",
  },
  {
    id: "b07",
    cat: "📝 問題1｜文の文法",
    text: "大切な財布を（　）しまいました。",
    q: "（　）に入る最も適切なものはどれですか？",
    opts: ["なくして", "なくし", "なくした", "なくす"],
    ans: 0,
    exp: "〜てしまう = melakukan sesuatu (seringkali disertai penyesalan/tidak sengaja). なくして（te-form）+ しまう。なくしてしまった = (sayang) kehilangan.",
  },
  {
    id: "b08",
    cat: "📝 問題1｜文の文法",
    text: "私が出かけている（　）、友達から電話がありました。",
    q: "（　）に入る最も適切なものはどれですか？",
    opts: ["間に", "ために", "のに", "ので"],
    ans: 0,
    exp: "〜間に（あいだに）= selama / ketika sedang... ada hal lain yang terjadi. 出かけている間に電話があった = saat sedang pergi ada telepon masuk.",
  },

  // ─────────────────────────────────────────────
  // 問題2: 助詞・複合助詞  (B09–B12)
  // ─────────────────────────────────────────────
  {
    id: "b09",
    cat: "📝 問題2｜助詞・複合助詞",
    text: "日本の文化（　）、もっと知りたいです。",
    q: "（　）に入る最も適切なものはどれですか？",
    opts: ["について", "によって", "にとって", "に対して"],
    ans: 0,
    exp: "について = tentang/mengenai. によって = melalui/tergantung. にとって = bagi (seseorang). に対して = terhadap. 文化について = tentang budaya.",
  },
  {
    id: "b10",
    cat: "📝 問題2｜助詞・複合助詞",
    text: "この病気は早期発見（　）、治る可能性が高くなります。",
    q: "（　）に入る最も適切なものはどれですか？",
    opts: ["によって", "について", "に対して", "にとって"],
    ans: 0,
    exp: "〜によって = melalui/dengan cara. 早期発見によって = melalui deteksi dini. によって は手段・原因・違いを示す！",
  },
  {
    id: "b11",
    cat: "📝 問題2｜助詞・複合助詞",
    text: "彼女は５か国語を話す（　）。",
    q: "（　）に入る最も適切なものはどれですか？",
    opts: ["ことができます", "ことがあります", "ことになります", "ことにします"],
    ans: 0,
    exp: "ことができる = bisa/mampu (kemampuan). ことがある = pernah (pengalaman). ことになる = diputuskan dari luar. ことにする = memutuskan sendiri.",
  },
  {
    id: "b12",
    cat: "📝 問題2｜助詞・複合助詞",
    text: "毎日練習したら、上手に弾ける（　）。",
    q: "（　）に入る最も適切なものはどれですか？",
    opts: ["ようになりました", "ようにします", "ようでした", "ようです"],
    ans: 0,
    exp: "〜ようになる = jadi bisa / mulai bisa (perubahan bertahap). 弾けるようになった = akhirnya jadi bisa memainkan (alat musik). Menunjukkan progress!",
  },

  // ─────────────────────────────────────────────
  // 問題3: 使役・受け身・授受  (B13–B15)
  // ─────────────────────────────────────────────
  {
    id: "b13",
    cat: "📝 問題3｜使役形",
    text: "先生は学生に作文を書か（　）。",
    q: "（　）に入る最も適切なものはどれですか？（使役文）",
    opts: ["せました", "れました", "されました", "らせました"],
    ans: 0,
    exp: "使役（させる）: 書く→書かせる→書かせました。先生は学生に書かせた = guru menyuruh murid menulis. 〜に〜させる の形！",
  },
  {
    id: "b14",
    cat: "📝 問題3｜受け身形",
    text: "私の自転車が誰かに（　）しまいました。",
    q: "（　）に入る最も適切なものはどれですか？（受け身文）",
    opts: ["盗まれて", "盗んで", "盗ませて", "盗まして"],
    ans: 0,
    exp: "受け身（られる）: 盗む→盗まれる。自転車が盗まれた = sepeda dicuri. 被害の受け身 + てしまう = peristiwa yang tidak diinginkan！",
  },
  {
    id: "b15",
    cat: "📝 問題3｜授受表現",
    text: "友達に宿題のやり方を教えて（　）。",
    q: "（　）に入る最も適切なものはどれですか？（授受表現）",
    opts: ["もらいました", "あげました", "やりました", "させました"],
    ans: 0,
    exp: "てもらう = saya menerima bantuan dari orang lain. 教えてもらった = (teman) mengajariku. ※てあげる = saya melakukan untuk orang lain.",
  },

  // ─────────────────────────────────────────────
  // 問題4: 複合表現・接続  (B16–B19)
  // ─────────────────────────────────────────────
  {
    id: "b16",
    cat: "📝 問題4｜複合表現",
    text: "「桜」（　）花は春に咲きます。",
    q: "（　）に入る最も適切なものはどれですか？",
    opts: ["という", "と言って", "と言えば", "といった"],
    ans: 0,
    exp: "〜という = yang bernama/yang disebut. 「桜」という花 = bunga yang namanya 'sakura'. 名前・定義を説明するとき使う！",
  },
  {
    id: "b17",
    cat: "📝 問題4｜複合表現",
    text: "手を洗っ（　）、ご飯を食べてください。",
    q: "（　）に入る最も適切なものはどれですか？",
    opts: ["てから", "てので", "てのに", "てなら"],
    ans: 0,
    exp: "〜てから = setelah melakukan ~, baru kemudian. 手を洗ってから食べる = makan setelah cuci tangan. 順序が明確！",
  },
  {
    id: "b18",
    cat: "📝 問題4｜複合表現",
    text: "もし雨が降っ（　）、傘を持っていきます。",
    q: "（　）に入る最も適切なものはどれですか？",
    opts: ["たら", "れば", "なら", "と"],
    ans: 0,
    exp: "〜たら = jika/kalau (kondisi hipotetis). もし + 〜たら は定番ペア！雨が降ったら = kalau hujan. 自然な会話でよく使う。",
  },
  {
    id: "b19",
    cat: "📝 問題4｜複合表現",
    text: "どんなに困難な状況で（　）、前向きに考えることが大切です。",
    q: "（　）に入る最も適切なものはどれですか？",
    opts: ["あっても", "あるので", "あるから", "あるのに"],
    ans: 0,
    exp: "〜ても = meskipun/bahkan jika. 困難な状況であっても = meskipun dalam situasi sulit. あっても = あって（te-form）+ も.",
  },

  // ─────────────────────────────────────────────
  // 問題5: 文章の文法  (B20)
  // ─────────────────────────────────────────────
  {
    id: "b20",
    cat: "📝 問題5｜文章の文法",
    text: "来週の会議に（　）かどうか、まだわかりません。",
    q: "（　）に入る最も適切なものはどれですか？",
    opts: ["出席できる", "出席した", "出席しよう", "出席している"],
    ans: 0,
    exp: "〜かどうか = apakah ~ atau tidak. 〜かどうか の前は普通形（辞書形/ている形）。出席できるかどうか = apakah bisa hadir atau tidak.",
  },
]

export const BUNPOU_CONFIG = {
  key: "bunpou",
  title: "文法",
  subtitle: "Bunpou",
  emoji: "🔤",
  color: "#2563EB",
  bg: "#EFF6FF",
  timeLimit: 70 * 60, // 70 minutes
  description: "のに・ながら・ように・はずだ・使役・受け身・授受・たら・ても",
}
