import { useState } from 'react'
import { DOKKAI_PASSAGES, DOKKAI_CONFIG, TOTAL_DOKKAI_QS } from '../data/index.js'
import { LETTERS, calcDokkaiScore } from '../utils/scoring.js'
import ProgressHeader from './ui/ProgressHeader.jsx'
import { OptionButton, ExplanationBox } from './ui/index.jsx'

/**
 * Reading comprehension section.
 * Passages + questions are imported directly from the data layer.
 *
 * @param {{
 *   timeLeft: number,
 *   onComplete: (score: number) => void,
 * }} props
 */
export default function DokkaiSection({ timeLeft, onComplete }) {
  const [passageIdx, setPassageIdx] = useState(0)
  const [qIdx, setQIdx] = useState(0)
  const [selected, setSelected] = useState(null)
  const [showExp, setShowExp] = useState(false)
  // { [questionId]: selectedOptionIndex }
  const [answerMap, setAnswerMap] = useState({})

  const passage = DOKKAI_PASSAGES[passageIdx]
  const q = passage.qs[qIdx]
  const answered = selected !== null
  const isCorrect = selected === q.ans

  // Global question index across all passages (for progress bar)
  let totalBefore = 0
  for (let i = 0; i < passageIdx; i++) totalBefore += DOKKAI_PASSAGES[i].qs.length
  const globalIdx = totalBefore + qIdx
  const progress = ((globalIdx + (answered ? 1 : 0)) / TOTAL_DOKKAI_QS) * 100

  const isLastQ = passageIdx === DOKKAI_PASSAGES.length - 1 && qIdx === passage.qs.length - 1

  function pick(i) {
    if (answered) return
    setSelected(i)
    setShowExp(true)
    setAnswerMap((prev) => ({ ...prev, [q.id]: i }))
  }

  function next() {
    if (isLastQ) {
      const finalMap = { ...answerMap, [q.id]: selected }
      onComplete(calcDokkaiScore(DOKKAI_PASSAGES, finalMap))
      return
    }

    if (qIdx < passage.qs.length - 1) {
      setQIdx((n) => n + 1)
    } else {
      setPassageIdx((n) => n + 1)
      setQIdx(0)
    }
    setSelected(null)
    setShowExp(false)
  }

  const nextLabel = isLastQ
    ? '✓ セクション完了！'
    : qIdx < passage.qs.length - 1
    ? '次の問題へ →'
    : '次の文章へ →'

  return (
    <div
      style={{
        minHeight: '100vh',
        background: DOKKAI_CONFIG.bg,
        fontFamily: "'Segoe UI', system-ui, sans-serif",
      }}
    >
      <ProgressHeader
        title={`読解 — ${passage.type}`}
        current={globalIdx + 1}
        total={TOTAL_DOKKAI_QS}
        timeLeft={timeLeft}
        color={DOKKAI_CONFIG.color}
        progress={progress}
      />

      <div style={{ maxWidth: 700, margin: '0 auto', padding: '14px 14px 32px' }}>
        {/* ── Passage card ── */}
        <div
          style={{
            background: 'white',
            borderRadius: 14,
            padding: '15px 16px',
            marginBottom: 12,
            boxShadow: '0 2px 10px rgba(0,0,0,0.07)',
          }}
        >
          {/* Passage header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            <span style={{ fontSize: 20 }}>{passage.icon}</span>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: DOKKAI_CONFIG.color,
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                }}
              >
                {passage.type}
              </div>
              <div style={{ fontSize: 14, fontWeight: 800, color: '#111827' }}>
                {passage.title}
              </div>
            </div>
            <div style={{ fontSize: 11, color: '#9CA3AF' }}>
              問 {qIdx + 1}/{passage.qs.length}
            </div>
          </div>

          {/* Passage text — scrollable */}
          <div
            style={{
              background: '#F8FFF9',
              border: '1px solid #D1FAE5',
              borderRadius: 10,
              padding: '13px 14px',
              maxHeight: 220,
              overflowY: 'auto',
              fontSize: 13.5,
              lineHeight: 2.1,
              color: '#1F2937',
              whiteSpace: 'pre-wrap',
            }}
          >
            {passage.text}
          </div>
          <div style={{ fontSize: 10, color: '#9CA3AF', marginTop: 4, textAlign: 'right' }}>
            ↑ スクロールして全文を読んでください
          </div>
        </div>

        {/* ── Question card ── */}
        <div
          style={{
            background: 'white',
            borderRadius: 14,
            padding: '14px 16px',
            marginBottom: 12,
            boxShadow: '0 2px 10px rgba(0,0,0,0.07)',
          }}
        >
          <div
            style={{ fontSize: 11, fontWeight: 700, color: DOKKAI_CONFIG.color, marginBottom: 6 }}
          >
            問 {qIdx + 1}
          </div>
          <div style={{ fontSize: 14, color: '#111827', fontWeight: 600, lineHeight: 1.7 }}>
            {q.q}
          </div>
        </div>

        {/* ── Options ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 9, marginBottom: 12 }}>
          {q.opts.map((opt, i) => (
            <OptionButton
              key={i}
              index={i}
              text={opt}
              answered={answered}
              selected={selected}
              correct={q.ans}
              onClick={() => pick(i)}
            />
          ))}
        </div>

        {/* ── Explanation ── */}
        {showExp && (
          <div style={{ marginBottom: 12 }}>
            <ExplanationBox
              isCorrect={isCorrect}
              correctLabel={`${LETTERS[q.ans]}. ${q.opts[q.ans]}`}
              explanation={q.exp}
            />
          </div>
        )}

        {/* ── Next button ── */}
        {answered && (
          <button
            onClick={next}
            style={{
              width: '100%',
              background: DOKKAI_CONFIG.color,
              color: 'white',
              border: 'none',
              borderRadius: 12,
              padding: '15px',
              fontSize: 15,
              fontWeight: 700,
              cursor: 'pointer',
              fontFamily: 'inherit',
              boxShadow: `0 4px 14px ${DOKKAI_CONFIG.color}55`,
            }}
          >
            {nextLabel}
          </button>
        )}
      </div>
    </div>
  )
}
