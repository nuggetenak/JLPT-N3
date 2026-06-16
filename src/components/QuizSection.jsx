import { useState } from 'react'
import { LETTERS, calcScore, shuffleOptions } from '../utils/scoring.js'
import ProgressHeader from './ui/ProgressHeader.jsx'
import { OptionButton, ExplanationBox } from './ui/index.jsx'

/**
 * Generic quiz section used for both 文字・語彙 and 文法.
 * Receives questions + section config as props — completely data-agnostic.
 *
 * Option order is reshuffled fresh on every mount (i.e. every time the
 * section is started or retried), so the correct answer's letter position
 * is never memorizable across attempts.
 *
 * @param {{
 *   questions: import('../data/goi').Question[],
 *   config: { title: string, color: string, bg: string },
 *   timeLeft: number,
 *   onComplete: (score: number, session: { questions: import('../data/goi').Question[], answers: (number|null)[] }) => void,
 * }} props
 */
export default function QuizSection({ questions, config, timeLeft, onComplete }) {
  // Shuffle once per mount (= once per attempt), not on every render.
  const [shuffled] = useState(() => shuffleOptions(questions))
  const [qIdx, setQIdx] = useState(0)
  const [selected, setSelected] = useState(null)
  const [showExp, setShowExp] = useState(false)
  const [answers, setAnswers] = useState(() => Array(shuffled.length).fill(null))

  const q = shuffled[qIdx]
  const answered = selected !== null
  const isCorrect = selected === q.ans
  const progress = ((qIdx + (answered ? 1 : 0)) / shuffled.length) * 100

  function pick(i) {
    if (answered) return
    setSelected(i)
    setShowExp(true)
    setAnswers((prev) => {
      const next = [...prev]
      next[qIdx] = i
      return next
    })
  }

  function next() {
    if (qIdx < shuffled.length - 1) {
      setQIdx((n) => n + 1)
      setSelected(null)
      setShowExp(false)
    } else {
      const finalAnswers = [...answers]
      finalAnswers[qIdx] = selected
      onComplete(calcScore(shuffled, finalAnswers), { questions: shuffled, answers: finalAnswers })
    }
  }

  const isLast = qIdx === shuffled.length - 1

  return (
    <div style={{ minHeight: '100vh', background: config.bg, fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      <ProgressHeader
        title={config.title}
        current={qIdx + 1}
        total={shuffled.length}
        timeLeft={timeLeft}
        color={config.color}
        progress={progress}
      />

      <div style={{ maxWidth: 600, margin: '0 auto', padding: '14px 14px 32px' }}>
        {/* Question card */}
        <div
          style={{
            background: 'white',
            borderRadius: 14,
            padding: '16px 18px',
            marginBottom: 12,
            boxShadow: '0 2px 10px rgba(0,0,0,0.07)',
          }}
        >
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: config.color,
              marginBottom: 8,
              letterSpacing: 0.3,
            }}
          >
            {q.cat}
          </div>
          <div style={{ fontSize: 16, lineHeight: 1.9, color: '#111827', marginBottom: 12 }}>
            {q.text}
          </div>
          <div style={{ height: 1, background: '#F3F4F6', marginBottom: 12 }} />
          <div style={{ fontSize: 14, color: '#374151', fontWeight: 600 }}>{q.q}</div>
        </div>

        {/* Options */}
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

        {/* Explanation */}
        {showExp && (
          <div style={{ marginBottom: 12 }}>
            <ExplanationBox
              isCorrect={isCorrect}
              correctLabel={`${LETTERS[q.ans]}. ${q.opts[q.ans]}`}
              explanation={q.exp}
            />
          </div>
        )}

        {/* Next button */}
        {answered && (
          <button
            onClick={next}
            style={{
              width: '100%',
              background: config.color,
              color: 'white',
              border: 'none',
              borderRadius: 12,
              padding: '15px',
              fontSize: 15,
              fontWeight: 700,
              cursor: 'pointer',
              fontFamily: 'inherit',
              boxShadow: `0 4px 14px ${config.color}55`,
            }}
          >
            {isLast ? '✓ セクション完了！' : '次の問題へ →'}
          </button>
        )}
      </div>
    </div>
  )
}
