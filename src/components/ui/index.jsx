import { LETTERS } from '../../utils/scoring.js'

// ─────────────────────────────────────────────────────────────
// OptionButton
// ─────────────────────────────────────────────────────────────

/**
 * Single answer option button.
 *
 * @param {{
 *   index: number,
 *   text: string,
 *   answered: boolean,
 *   selected: number|null,
 *   correct: number,
 *   onClick: () => void,
 * }} props
 */
export function OptionButton({ index, text, answered, selected, correct, onClick }) {
  let bg = 'white'
  let border = '2px solid #E5E7EB'
  let col = '#1F2937'
  let fw = 400

  if (answered) {
    if (index === correct) {
      bg = '#DCFCE7'; border = '2px solid #16A34A'; col = '#15803D'; fw = 700
    } else if (index === selected) {
      bg = '#FEE2E2'; border = '2px solid #DC2626'; col = '#B91C1C'
    } else {
      bg = '#F9FAFB'; border = '2px solid #F3F4F6'; col = '#9CA3AF'
    }
  }

  return (
    <button
      onClick={onClick}
      style={{
        background: bg,
        border,
        borderRadius: 11,
        padding: '12px 14px',
        textAlign: 'left',
        cursor: answered ? 'default' : 'pointer',
        color: col,
        fontFamily: 'inherit',
        fontSize: 14,
        lineHeight: 1.55,
        fontWeight: fw,
        display: 'flex',
        alignItems: 'flex-start',
        gap: 10,
        transition: 'all 0.15s',
        width: '100%',
      }}
    >
      <span style={{ minWidth: 22, fontWeight: 800, opacity: 0.55 }}>
        {LETTERS[index]}.
      </span>
      <span>{text}</span>
    </button>
  )
}

// ─────────────────────────────────────────────────────────────
// ExplanationBox
// ─────────────────────────────────────────────────────────────

/**
 * Shows correct/wrong feedback + explanation after answering.
 *
 * @param {{
 *   isCorrect: boolean,
 *   correctLabel: string,
 *   explanation: string,
 * }} props
 */
export function ExplanationBox({ isCorrect, correctLabel, explanation }) {
  return (
    <div
      style={{
        background: isCorrect ? '#F0FDF4' : '#FFF7ED',
        border: `1.5px solid ${isCorrect ? '#86EFAC' : '#FED7AA'}`,
        borderRadius: 13,
        padding: '14px 16px',
      }}
    >
      <div
        style={{
          fontSize: 14,
          fontWeight: 800,
          color: isCorrect ? '#15803D' : '#C2410C',
          marginBottom: 6,
        }}
      >
        {isCorrect
          ? '✅ 正解！よくできました！'
          : `❌ 不正解 → 正解：${correctLabel}`}
      </div>
      <div style={{ fontSize: 13, color: '#4B5563', lineHeight: 1.8 }}>
        💡 {explanation}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// SectionCard
// ─────────────────────────────────────────────────────────────

/**
 * Home screen card for a single section.
 *
 * @param {{
 *   section: import('../../data/index').GOI_CONFIG,
 *   score: number|null,
 *   totalQ: number,
 *   hasSession: boolean,
 *   onStart: () => void,
 *   onReview: () => void,
 * }} props
 */
export function SectionCard({ section: s, score, totalQ, hasSession, onStart, onReview }) {
  const done = score !== null
  const pct = done ? Math.round((score / totalQ) * 100) : null
  const barColor =
    pct === null ? '#E5E7EB' : pct >= 70 ? '#16A34A' : pct >= 55 ? '#D97706' : '#DC2626'

  return (
    <div
      style={{
        background: 'white',
        borderRadius: 14,
        padding: '15px 16px',
        marginBottom: 12,
        boxShadow: '0 1px 6px rgba(0,0,0,0.07)',
        border: done ? `1.5px solid ${s.color}30` : '1.5px solid transparent',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        {/* Left: info */}
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
            <span style={{ fontSize: 22 }}>{s.emoji}</span>
            <div>
              <div style={{ fontSize: 17, fontWeight: 800, color: '#111827', lineHeight: 1.1 }}>
                {s.title}
              </div>
              <div style={{ fontSize: 10, color: '#9CA3AF', letterSpacing: 0.5 }}>{s.subtitle}</div>
            </div>
          </div>
          <div style={{ fontSize: 12, color: '#6B7280', margin: '5px 0 8px' }}>{s.description}</div>
          <div style={{ display: 'flex', gap: 14, fontSize: 11, color: '#9CA3AF' }}>
            <span>⏱ {Math.round(s.timeLimit / 60)}分</span>
            <span>📊 {totalQ}問</span>
            {done && (
              <span style={{ color: s.color, fontWeight: 700 }}>
                ✓ {score}/{totalQ} ({pct}%)
              </span>
            )}
          </div>
        </div>

        {/* Right: score circle or start button */}
        <div style={{ marginLeft: 12, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
          {done ? (
            <>
              <div
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: '50%',
                  background: pct >= 70 ? '#DCFCE7' : pct >= 55 ? '#FEF3C7' : '#FEE2E2',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 13,
                  fontWeight: 900,
                  color: pct >= 70 ? '#15803D' : pct >= 55 ? '#B45309' : '#DC2626',
                }}
              >
                {pct}%
              </div>
              <button
                onClick={onStart}
                style={{
                  fontSize: 11,
                  color: s.color,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  fontFamily: 'inherit',
                  fontWeight: 600,
                }}
              >
                再挑戦
              </button>
              {hasSession && (
                <button
                  onClick={onReview}
                  style={{
                    fontSize: 10,
                    color: '#9CA3AF',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    fontFamily: 'inherit',
                    fontWeight: 600,
                  }}
                >
                  📝 復習
                </button>
              )}
            </>
          ) : (
            <button
              onClick={onStart}
              style={{
                background: s.color,
                color: 'white',
                border: 'none',
                borderRadius: 10,
                padding: '11px 18px',
                fontSize: 13,
                fontWeight: 700,
                cursor: 'pointer',
                fontFamily: 'inherit',
                whiteSpace: 'nowrap',
                boxShadow: `0 3px 10px ${s.color}44`,
              }}
            >
              開始 →
            </button>
          )}
        </div>
      </div>

      {/* Score bar */}
      {done && (
        <div style={{ marginTop: 10, background: '#F3F4F6', borderRadius: 99, height: 6 }}>
          <div
            style={{
              background: barColor,
              borderRadius: 99,
              height: 6,
              width: `${pct}%`,
              transition: 'width 0.6s ease',
            }}
          />
        </div>
      )}
    </div>
  )
}
