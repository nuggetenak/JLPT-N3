/**
 * @fileoverview 文字・語彙 Question Bank
 *
 * HOW TO ADD A NEW QUESTION:
 * Copy the template below and append to the GOI_QUESTIONS array.
 *
 * Template:
 * {
 *   id: "g##",          // unique, sequential (g01, g02, ...)
 *   cat: "📖 問題1｜漢字の読み方",  // pick a category from GOI_CONFIG.categories
 *   text: "Sentence with 【highlighted word】.",
 *   q: "【highlighted word】の読み方はどれですか？",
 *   opts: ["correct", "distractor1", "distractor2", "distractor3"],
 *   ans: 0,             // index of correct option (0–3)
 *   exp: "Explanation in Indonesian/Japanese mix.",
 * },
 */

/**
 * @typedef {Object} Question
 * @property {string} id
 * @property {string} cat
 * @property {string} text
 * @property {string} q
 * @property {[string, string, string, string]} opts
 * @property {0|1|2|3} ans
 * @property {string} exp
 */

/** @type {Question[]} */
export const GOI_QUESTIONS = [
  // ─────────────────────────────────────────────
  // 問題1: 漢字の読み方  (Q1–Q5)
  // ─────────────────────────────────────────────
  {
    id: "g01",
    cat: "📖 問題1｜漢字の読み方",
    text: "彼女は毎日、日本語の【練習】をしています。",
    q: "【練習】の読み方はどれですか？",
    opts: ["れんしゅう", "れんしゃく", "れいしゅう", "れいしゃく"],
    ans: 0,
    exp: "練習（れんしゅう）= latihan. 練（ren）+ 習（shuu）。日常でよく使う超頻出語！",
  },
  {
    id: "g02",
    cat: "📖 問題1｜漢字の読み方",
    text: "電車が遅れたので、会議に【遅刻】してしまいました。",
    q: "【遅刻】の読み方はどれですか？",
    opts: ["ちこく", "ちとく", "おそこく", "そうこく"],
    ans: 0,
    exp: "遅刻（ちこく）= terlambat. 遅（chi）+ 刻（koku）。遅刻する = datang terlambat.",
  },
  {
    id: "g03",
    cat: "📖 問題1｜漢字の読み方",
    text: "先生の【説明】がわかりやすくて助かりました。",
    q: "【説明】の読み方はどれですか？",
    opts: ["せつめい", "せつみょう", "せつべい", "せつまい"],
    ans: 0,
    exp: "説明（せつめい）= penjelasan. 説（setsu）+ 明（mei）。超頻出！絶対覚えよう。",
  },
  {
    id: "g04",
    cat: "📖 問題1｜漢字の読み方",
    text: "彼は【努力家】で、いつも一生懸命です。",
    q: "【努力家】の読み方はどれですか？",
    opts: ["どりょくか", "どうりょくか", "のりょくか", "のうりょくか"],
    ans: 0,
    exp: "努力家（どりょくか）= orang yang rajin berusaha. 努力（どりょく）= usaha/kerja keras.",
  },
  {
    id: "g05",
    cat: "📖 問題1｜漢字の読み方",
    text: "今年の夏休みは【海外】旅行に行く予定です。",
    q: "【海外】の読み方はどれですか？",
    opts: ["かいがい", "かいそと", "うみそと", "かがい"],
    ans: 0,
    exp: "海外（かいがい）= luar negeri. 海（kai）+ 外（gai）。海外旅行 = perjalanan ke luar negeri.",
  },

  // ─────────────────────────────────────────────
  // 問題2: 漢字の書き方  (Q6–Q10)
  // ─────────────────────────────────────────────
  {
    id: "g06",
    cat: "✏️ 問題2｜漢字の書き方",
    text: "【かんきょう】問題はとても深刻です。",
    q: "【かんきょう】の漢字はどれですか？",
    opts: ["環境", "感境", "観境", "換境"],
    ans: 0,
    exp: "環境（かんきょう）= lingkungan. 環（ring/lingkar）+ 境（batas）。重要語彙！",
  },
  {
    id: "g07",
    cat: "✏️ 問題2｜漢字の書き方",
    text: "彼女の【せいかく】は明るくて親切です。",
    q: "【せいかく】の漢字はどれですか？",
    opts: ["性格", "正確", "政格", "精格"],
    ans: 0,
    exp: "性格（せいかく）= kepribadian. 注意⚠️ 正確（せいかく）= akurat — 読みが同じで意味が違う！",
  },
  {
    id: "g08",
    cat: "✏️ 問題2｜漢字の書き方",
    text: "今月の【けいかく】を立てましょう。",
    q: "【けいかく】の漢字はどれですか？",
    opts: ["計画", "計書", "係画", "系画"],
    ans: 0,
    exp: "計画（けいかく）= rencana. 計画を立てる（たてる）= membuat rencana. 定番フレーズ！",
  },
  {
    id: "g09",
    cat: "✏️ 問題2｜漢字の書き方",
    text: "明日の天気【よほう】を確認してください。",
    q: "【よほう】の漢字はどれですか？",
    opts: ["予報", "予法", "予帽", "予包"],
    ans: 0,
    exp: "予報（よほう）= prakiraan. 天気予報（てんきよほう）= prakiraan cuaca. 毎日使う！",
  },
  {
    id: "g10",
    cat: "✏️ 問題2｜漢字の書き方",
    text: "先生に【しつもん】しました。",
    q: "【しつもん】の漢字はどれですか？",
    opts: ["質問", "失問", "室問", "疾問"],
    ans: 0,
    exp: "質問（しつもん）= pertanyaan. 質（shitsu = substansi）+ 問（mon = tanya）。",
  },

  // ─────────────────────────────────────────────
  // 問題3: 文脈規定  (Q11–Q15)
  // ─────────────────────────────────────────────
  {
    id: "g11",
    cat: "🔍 問題3｜文脈規定",
    text: "試験の準備のために毎日（　）を続けることが大切です。",
    q: "（　）に最も適切な言葉はどれですか？",
    opts: ["努力", "遊び", "さぼり", "休息"],
    ans: 0,
    exp: "努力（どりょく）= usaha/kerja keras. 「試験の準備」のコンテキスト → 努力 が正解！",
  },
  {
    id: "g12",
    cat: "🔍 問題3｜文脈規定",
    text: "彼は一人で問題を（　）しようとしましたが、難しかったです。",
    q: "（　）に最も適切な言葉はどれですか？",
    opts: ["解決", "発見", "成功", "完成"],
    ans: 0,
    exp: "解決（かいけつ）= menyelesaikan. 問題を解決する = memecahkan masalah. 定番フレーズ！",
  },
  {
    id: "g13",
    cat: "🔍 問題3｜文脈規定",
    text: "彼女は面接で緊張して、うまく自分を（　）できませんでした。",
    q: "（　）に最も適切な言葉はどれですか？",
    opts: ["表現", "表示", "発表", "発見"],
    ans: 0,
    exp: "表現（ひょうげん）= mengekspresikan. 自分を表現する = mengekspresikan diri sendiri.",
  },
  {
    id: "g14",
    cat: "🔍 問題3｜文脈規定",
    text: "転職のために、新しい（　）を身につけています。",
    q: "（　）に最も適切な言葉はどれですか？",
    opts: ["スキル", "趣味", "料金", "制度"],
    ans: 0,
    exp: "スキル = skill/kemampuan. 身につける = menguasai. 「転職」のコンテキスト → スキルが最適！",
  },
  {
    id: "g15",
    cat: "🔍 問題3｜文脈規定",
    text: "彼の発表はとても（　）で、全員が感動しました。",
    q: "（　）に最も適切な言葉はどれですか？",
    opts: ["印象的", "退屈", "普通", "平凡"],
    ans: 0,
    exp: "印象的（いんしょうてき）= berkesan/impressive. 「全員が感動した」→ 印象的 が正解！",
  },

  // ─────────────────────────────────────────────
  // 問題4: 言い換え類義  (Q16–Q18)
  // ─────────────────────────────────────────────
  {
    id: "g16",
    cat: "🔄 問題4｜言い換え類義",
    text: "彼女は「積極的」に仕事に取り組んでいます。",
    q: "「積極的」に最も近い意味はどれですか？",
    opts: ["自分からどんどんやる", "いやいや仕方なくやる", "のんびりゆっくりやる", "だれかに言われてやる"],
    ans: 0,
    exp: "積極的（せっきょくてき）= proaktif/aktif. ⇔消極的（しょうきょくてき）= pasif.",
  },
  {
    id: "g17",
    cat: "🔄 問題4｜言い換え類義",
    text: "この問題はとても「複雑」です。",
    q: "「複雑」に最も近い意味はどれですか？",
    opts: ["わかりにくくて難しい", "とても簡単", "おもしろい", "つまらない"],
    ans: 0,
    exp: "複雑（ふくざつ）= rumit/kompleks. ⇔単純（たんじゅん）= sederhana. N3頻出！",
  },
  {
    id: "g18",
    cat: "🔄 問題4｜言い換え類義",
    text: "彼は「誠実」な人です。",
    q: "「誠実」に最も近い意味はどれですか？",
    opts: ["正直で真面目", "不正直で嘘つき", "怠け者", "わがまま"],
    ans: 0,
    exp: "誠実（せいじつ）= jujur dan tulus. 誠（tulus）+ 実（nyata/sungguh-sungguh）.",
  },

  // ─────────────────────────────────────────────
  // 問題5: 用法  (Q19–Q20)
  // ─────────────────────────────────────────────
  {
    id: "g19",
    cat: "💡 問題5｜用法",
    text: "「参加する」の使い方を選んでください。",
    q: "正しい使い方はどれですか？",
    opts: ["会議に参加する", "ご飯に参加する", "電話に参加する", "本に参加する"],
    ans: 0,
    exp: "参加（さんか）= berpartisipasi. 〜に参加する。会議・イベント・活動 などに使います。",
  },
  {
    id: "g20",
    cat: "💡 問題5｜用法",
    text: "「経験」の使い方を選んでください。",
    q: "正しい使い方はどれですか？",
    opts: ["仕事の経験を積む", "経験を食べる", "経験に乗る", "経験を着る"],
    ans: 0,
    exp: "経験（けいけん）= pengalaman. 経験を積む（つむ）= menumpuk pengalaman. 重要な慣用表現！",
  },
]

export const GOI_CONFIG = {
  key: "goi",
  title: "文字・語彙",
  subtitle: "Moji / Goi",
  emoji: "📝",
  color: "#7C3AED",
  bg: "#F5F3FF",
  timeLimit: 30 * 60, // 30 minutes in seconds
  description: "漢字読み・書き・文脈・言い換え・用法",
}
