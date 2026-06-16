/** Answer letter labels */
export const LETTERS = ['A', 'B', 'C', 'D']

/**
 * Format seconds into M:SS string.
 * @param {number} seconds
 * @returns {string}
 */
export function formatTime(seconds) {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

/**
 * Calculate score for a linear question array.
 * @param {import('../data/goi').Question[]} questions
 * @param {(number|null)[]} answers  - array of selected option indices
 * @returns {number}
 */
export function calcScore(questions, answers) {
  return answers.filter((a, i) => a !== null && a === questions[i].ans).length
}

/**
 * Calculate Dokkai score from an answer map.
 * @param {import('../data/dokkai').Passage[]} passages
 * @param {Record<string, number>} answerMap  - { questionId: selectedIndex }
 * @returns {number}
 */
export function calcDokkaiScore(passages, answerMap) {
  let score = 0
  passages.forEach((p) => {
    p.qs.forEach((q) => {
      if (answerMap[q.id] === q.ans) score++
    })
  })
  return score
}

/**
 * Get a performance label based on percentage.
 * @param {number} pct  - 0–100
 * @returns {{ label: string, color: string, emoji: string }}
 */
export function getLevel(pct) {
  if (pct >= 80) return { label: '優秀', color: '#15803D', emoji: '🌟' }
  if (pct >= 70) return { label: '良い',  color: '#16A34A', emoji: '✅' }
  if (pct >= 55) return { label: '普通',  color: '#D97706', emoji: '💪' }
  return           { label: '要改善', color: '#DC2626', emoji: '📚' }
}

/**
 * Build study advice lines based on section scores.
 * @param {{ goi: number|null, bunpou: number|null, dokkai: number|null }} scores
 * @param {number} dokkaiMax
 * @returns {{ emoji: string, title: string, detail: string }[]}
 */
export function buildAdvice(scores, dokkaiMax) {
  const gp = scores.goi    !== null ? Math.round((scores.goi    / 20)        * 100) : 100
  const bp = scores.bunpou !== null ? Math.round((scores.bunpou / 20)        * 100) : 100
  const dp = scores.dokkai !== null ? Math.round((scores.dokkai / dokkaiMax) * 100) : 100

  const lines = []
  if (gp < 70) lines.push({ emoji: '📝', title: '語彙を強化しましょう',   detail: 'Anki等で漢字を毎日10語復習。音読も効果的！同じ読みで意味が違う漢字（性格 vs 正確）に特に注意。' })
  if (bp < 70) lines.push({ emoji: '🔤', title: '文法パターンを整理しよう', detail: '「のに vs ので」「ために vs ように」「使役・受け身」など混同しやすいものを例文ごと覚えよう。' })
  if (dp < 70) lines.push({ emoji: '📖', title: '読解の練習が必要です',    detail: '毎日1文章を読む習慣を。コツ：①先に問題文を読む ②本文で答えの根拠を探す ③筆者の主張は最後の段落に多い！' })
  if (lines.length === 0) lines.push({ emoji: '🌟', title: '全セクション好成績！', detail: 'JLPT公式過去問を解いて本番の形式・時間感覚に慣れましょう。この調子なら合格できます！' })
  return lines
}
