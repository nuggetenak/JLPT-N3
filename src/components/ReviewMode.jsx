import { useState } from 'react'
import { LETTERS } from '../utils/scoring.js'

/**
 * ReviewMode — shows all questions from a completed section with
 * correct/wrong colour-coding and explanations.
 *
 * Supports both:
 *  - Linear questions (GOI / BUNPOU): questions[] + answers[]
 *  - Passage questions (Dokkai): passages[] + answerMap{}
 *
 * @param {{
 *   questions?: import('../data/goi').Question[],
 *   passages?: import('../data/dokkai').Passage[],
 *   answers?: (number|null)[],
 *   answerMap?: Record<string, number>,
 *   config: { title: string, color: string, bg: string, emoji: string },
 *   onBack: () => void,
 * }} props
 */
export default function ReviewMode({ questions, passages, answers, answerMap, config, onBack }) {
  const [filter, setFilter] = useState('all') // 'all' | 'wrong'

  // Build flat list of review items
  const items = []

  if (questions && answers) {
    // Linear mode: GOI / BUNPOU
    questions.forEach((q, i) => {
      const userAns = answers[i] ?? null
      items.push({
        key: q.id,
        cat: q.cat,
        text: q.text,
        question: q.q,
        opts: q.opts,
        correctAns: q.ans,
        userAns,
        exp: q.exp,
        passageTitle: null,
      })
    })
  } else if (passages && answerMap) {
    // Dokkai mode
    passages.forEach((p) => {
      p.qs.forEach((q) => {
        const userAns = answerMap[q.id] ?? null
        items.push({
          key: q.id,
          cat: null,
          text: null,
          question: q.q,
          opts: q.opts,
          correctAns: q.ans,
          userAns,
          exp: q.exp,
          passageTitle: `${p.icon} ${p.type} — ${p.title}`,
        })
      })
    })
  }

  const wrongItems = items.filter((it) => it.userAns !== it.correctAns)
  const displayItems = filter === 'wrong' ? wrongItems : items
  const correctCount = items.filter((it) => it.userAns === it.correctAns).length

  return (
    <div
      style={{
        minHeight: '100vh',
        background: config.bg,
        fontFamily: "'Segoe UI', system-ui, sans-serif",
      }}
    >
      {/* ── Header ── */}
      <div
        style={{
          background: config.color,
          color: 'white',
          padding: '18px 16px 14px',
          position: 'sticky',
          top: 0,
          zIndex: 10,
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        }}
      >
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: 11, opacity: 0.8, letterSpacing: 1, marginBottom: 2 }}>
                {config.emoji} {config.title} — 復習モード
              </div>
              <div style={{ fontSize: 15, fontWeight: 800 }}>
                ✅ {correctCount}/{items.length}問正解
                {'  '}
                <span style={{ opacity: 0.75, fontWeight: 600 }}>
                  ❌ {items.length - correctCount}問不正解
                </span>
              </div>
            </div>
            <button
              onClick={onBack}
              style={{
                background: 'rgba(255,255,255,0.2)',
                border: '1px solid rgba(255,255,255,0.4)',
                borderRadius: 8,
                color: 'white',
                padding: '7px 12px',
                fontSize: 13,
                fontWeight: 700,
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}
            >
              ← 戻る
            </button>
          </div>
        </div>
      </div>

      {/* ── Filter tabs ── */}
      <div style={{ background: 'white', borderBottom: '1px solid #E5E7EB' }}>
        <div style={{ maxWidth: 600, margin: '0 auto', display: 'flex' }}>
          {[
            ['all', `📋 全問題 (${items.length})`],
            ['wrong', `❌ 間違えた問題 (${wrongItems.length})`],
          ].map(([k, label]) => (
            <button
              key={k}
              onClick={() => setFilter(k)}
              style={{
                flex: 1,
                padding: '11px 8px',
                background: 'none',
                border: 'none',
                borderBottom: filter === k ? `2.5px solid ${config.color}` : '2.5px solid transparent',
                fontFamily: 'inherit',
                fontSize: 13,
                fontWeight: 700,
                cursor: 'pointer',
                color: filter === k ? '#111827' : '#9CA3AF',
                transition: 'color 0.15s',
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Question list ── */}
      <div style={{ maxWidth: 600, margin: '0 auto', padding: '14px 14px 32px' }}>
        {displayItems.length === 0 && (
          <div
            style={{
              textAlign: 'center',
              padding: '40px 20px',
              color: '#6B7280',
              fontSize: 15,
            }}
          >
            🎉 全問正解！間違えた問題はありません。
          </div>
        )}

        {displayItems.map((item, idx) => {
          const isCorrect = item.userAns === item.correctAns
          const borderColor = isCorrect ? '#16A34A' : '#DC2626'
          const bgColor = isCorrect ? '#F0FDF4' : '#FFF5F5'

          return (
            <div
              key={item.key}
              style={{
                background: 'white',
                borderRadius: 14,
                marginBottom: 12,
                boxShadow: '0 1px 6px rgba(0,0,0,0.07)',
                overflow: 'hidden',
                borderLeft: `4px solid ${borderColor}`,
              }}
            >
              {/* Question header */}
              <div style={{ padding: '13px 15px 10px' }}>
                {item.passageTitle && (
                  <div
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      color: config.color,
                      marginBottom: 4,
                      letterSpacing: 0.3,
                    }}
                  >
                    {item.passageTitle}
                  </div>
                )}
                {item.cat && (
                  <div
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      color: config.color,
                      marginBottom: 4,
                      letterSpacing: 0.3,
                    }}
                  >
                    {item.cat}
                  </div>
                )}
                {item.text && (
                  <div style={{ fontSize: 14, color: '#374151', lineHeight: 1.8, marginBottom: 6 }}>
                    {item.text}
                  </div>
                )}
                <div style={{ fontSize: 13, fontWeight: 600, color: '#111827' }}>
                  {item.question}
                </div>
              </div>

              {/* Options */}
              <div style={{ padding: '0 15px 10px' }}>
                {item.opts.map((opt, i) => {
                  const isThisCorrect = i === item.correctAns
                  const isThisUser = i === item.userAns
                  let optBg = 'transparent'
                  let optColor = '#374151'
                  let optBorder = '#E5E7EB'
                  let prefix = `${LETTERS[i]}. `

                  if (isThisCorrect) {
                    optBg = '#DCFCE7'
                    optColor = '#15803D'
                    optBorder = '#86EFAC'
                    prefix = '✅ '
                  } else if (isThisUser && !isThisCorrect) {
                    optBg = '#FEE2E2'
                    optColor = '#DC2626'
                    optBorder = '#FCA5A5'
                    prefix = '❌ '
                  }

                  return (
                    <div
                      key={i}
                      style={{
                        background: optBg,
                        border: `1px solid ${optBorder}`,
                        borderRadius: 8,
                        padding: '8px 11px',
                        marginBottom: 6,
                        fontSize: 13,
                        color: optColor,
                        fontWeight: isThisCorrect || isThisUser ? 700 : 400,
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 4,
                      }}
                    >
                      <span style={{ flexShrink: 0 }}>{prefix}</span>
                      <span>{opt}</span>
                    </div>
                  )
                })}
              </div>

              {/* Result badge + explanation */}
              <div
                style={{
                  background: bgColor,
                  borderTop: `1px solid ${isCorrect ? '#BBF7D0' : '#FECACA'}`,
                  padding: '10px 15px 13px',
                }}
              >
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 800,
                    color: borderColor,
                    marginBottom: 5,
                  }}
                >
                  {isCorrect ? '⭕ 正解！' : `✖ 不正解 — 正解は ${LETTERS[item.correctAns]}. ${item.opts[item.correctAns]}`}
                </div>
                <div style={{ fontSize: 12, color: '#4B5563', lineHeight: 1.7 }}>{item.exp}</div>
              </div>
            </div>
          )
        })}

        {/* Bottom back button */}
        <button
          onClick={onBack}
          style={{
            width: '100%',
            background: `linear-gradient(135deg, #0F0C29, ${config.color})`,
            color: 'white',
            border: 'none',
            borderRadius: 12,
            padding: '15px',
            fontSize: 15,
            fontWeight: 700,
            cursor: 'pointer',
            fontFamily: 'inherit',
            marginTop: 8,
            boxShadow: '0 4px 16px rgba(15,12,41,0.3)',
          }}
        >
          ← 結果画面に戻る
        </button>
      </div>
    </div>
  )
}
