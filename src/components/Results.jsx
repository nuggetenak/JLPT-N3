import { useState } from 'react'
import { SECTIONS, TOTAL_DOKKAI_QS } from '../data/index.js'
import { buildAdvice } from '../utils/scoring.js'

const TOTALS = { goi: 20, bunpou: 20, dokkai: TOTAL_DOKKAI_QS }

/**
 * @param {{
 *   scores: { goi: number|null, bunpou: number|null, dokkai: number|null },
 *   onBack: () => void,
 * }} props
 */
export default function Results({ scores, onBack }) {
  const [tab, setTab] = useState('summary')

  const totalMax = 20 + 20 + TOTAL_DOKKAI_QS
  const total = (scores.goi ?? 0) + (scores.bunpou ?? 0) + (scores.dokkai ?? 0)
  const pct = Math.round((total / totalMax) * 100)
  const pass = pct >= 70

  const advice = buildAdvice(scores, TOTAL_DOKKAI_QS)

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#F0F2F5',
        fontFamily: "'Segoe UI', system-ui, sans-serif",
      }}
    >
      {/* ── Hero ── */}
      <div
        style={{
          background: pass
            ? 'linear-gradient(135deg, #052e16, #15803D)'
            : 'linear-gradient(135deg, #450a0a, #b91c1c)',
          color: 'white',
          padding: '28px 16px 20px',
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: 44, marginBottom: 6 }}>{pass ? '🎉' : '📚'}</div>
        <div style={{ fontSize: 12, opacity: 0.7, letterSpacing: 2 }}>JLPT N3 総合結果</div>
        <div
          style={{
            fontSize: 56,
            fontWeight: 900,
            lineHeight: 1,
            color: pass ? '#86EFAC' : '#FCA5A5',
          }}
        >
          {pct}%
        </div>
        <div style={{ fontSize: 17, fontWeight: 700, marginTop: 4 }}>
          {total} / {totalMax} 問正解
        </div>
        <div style={{ fontSize: 14, marginTop: 8, opacity: 0.85 }}>
          {pass
            ? '✨ 合格圏内！この調子でいきましょう！'
            : 'あきらめないで！2週間まだあります 💪'}
        </div>
      </div>

      {/* ── Tabs ── */}
      <div style={{ display: 'flex', background: 'white', borderBottom: '1px solid #E5E7EB' }}>
        {[
          ['summary', '📊 結果'],
          ['advice', '🎯 アドバイス'],
        ].map(([k, label]) => (
          <button
            key={k}
            onClick={() => setTab(k)}
            style={{
              flex: 1,
              padding: '12px',
              background: 'none',
              border: 'none',
              borderBottom: tab === k ? '2.5px solid #4F46E5' : '2.5px solid transparent',
              fontFamily: 'inherit',
              fontSize: 13,
              fontWeight: 700,
              cursor: 'pointer',
              color: tab === k ? '#111827' : '#9CA3AF',
              transition: 'color 0.2s',
            }}
          >
            {label}
          </button>
        ))}
      </div>

      <div style={{ maxWidth: 600, margin: '0 auto', padding: '14px 14px 32px' }}>
        {/* ── Summary tab ── */}
        {tab === 'summary' && (
          <>
            <div
              style={{
                background: 'white',
                borderRadius: 14,
                padding: '16px',
                marginBottom: 12,
                boxShadow: '0 1px 6px rgba(0,0,0,0.07)',
              }}
            >
              <div style={{ fontSize: 13, fontWeight: 700, color: '#374151', marginBottom: 14 }}>
                セクション別スコア
              </div>

              {SECTIONS.map((s) => {
                const sc = scores[s.key] ?? 0
                const max = TOTALS[s.key]
                const p = Math.round((sc / max) * 100)
                const barColor =
                  p >= 70 ? '#16A34A' : p >= 55 ? '#D97706' : '#DC2626'
                const badge =
                  p >= 70 ? '🟢 良い' : p >= 55 ? '🟡 普通' : '🔴 要改善'

                return (
                  <div key={s.key} style={{ marginBottom: 16 }}>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: 6,
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span>{s.emoji}</span>
                        <span style={{ fontSize: 14, fontWeight: 700, color: '#111827' }}>
                          {s.title}
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ fontSize: 11, color: '#6B7280' }}>{badge}</span>
                        <span style={{ fontSize: 16, fontWeight: 800, color: s.color }}>
                          {sc}/{max}
                        </span>
                      </div>
                    </div>
                    <div style={{ background: '#F3F4F6', borderRadius: 99, height: 9 }}>
                      <div
                        style={{
                          background: barColor,
                          borderRadius: 99,
                          height: 9,
                          width: `${p}%`,
                          transition: 'width 0.8s ease',
                        }}
                      />
                    </div>
                    <div
                      style={{ fontSize: 11, color: '#9CA3AF', marginTop: 2, textAlign: 'right' }}
                    >
                      {p}%
                    </div>
                  </div>
                )
              })}
            </div>

            {/* JLPT passing criteria */}
            <div
              style={{
                background: '#EFF6FF',
                border: '1px solid #BFDBFE',
                borderRadius: 12,
                padding: '13px 15px',
                marginBottom: 12,
              }}
            >
              <div style={{ fontSize: 12, fontWeight: 700, color: '#1D4ED8', marginBottom: 5 }}>
                📋 JLPT N3 合格基準（参考）
              </div>
              <div style={{ fontSize: 12, color: '#1E40AF', lineHeight: 1.85 }}>
                • 総合得点：180点満点中 <b>95点以上</b>
                <br />
                • 各セクションに基準点あり（約40%以上が必須）
                <br />
                • 一つでも基準点以下だと<b>総合点に関わらず不合格</b>
                <br />• このアプリの目安：各セクション55%以上・総合70%以上
              </div>
            </div>
          </>
        )}

        {/* ── Advice tab ── */}
        {tab === 'advice' && (
          <>
            {advice.map((a, i) => (
              <div
                key={i}
                style={{
                  background: 'white',
                  borderRadius: 14,
                  padding: '16px',
                  marginBottom: 12,
                  boxShadow: '0 1px 6px rgba(0,0,0,0.07)',
                  borderLeft: '4px solid #4F46E5',
                }}
              >
                <div style={{ fontSize: 14, fontWeight: 800, color: '#111827', marginBottom: 5 }}>
                  {a.emoji} {a.title}
                </div>
                <div style={{ fontSize: 13, color: '#4B5563', lineHeight: 1.8 }}>{a.detail}</div>
              </div>
            ))}

            {/* 2-week plan */}
            <div
              style={{
                background: '#FEF3C7',
                border: '1px solid #FDE68A',
                borderRadius: 12,
                padding: '14px 15px',
                marginBottom: 12,
              }}
            >
              <div style={{ fontSize: 13, fontWeight: 800, color: '#92400E', marginBottom: 8 }}>
                📅 残り2週間 — 作戦プラン
              </div>
              <div style={{ fontSize: 12, color: '#78350F', lineHeight: 2 }}>
                <b>週1（今週）：</b>弱点セクションを集中復習
                <br />
                <b>週2前半：</b>全セクション再チャレンジ＋間違えた問題の復習
                <br />
                <b>週2後半：</b>JLPT公式過去問で本番の時間感覚をつかむ
                <br />
                <b>前日：</b>軽く復習して早めに寝る。睡眠が一番大事！💤
              </div>
            </div>

            {/* Resources */}
            <div
              style={{
                background: '#F0FDF4',
                border: '1px solid #86EFAC',
                borderRadius: 12,
                padding: '13px 15px',
              }}
            >
              <div style={{ fontSize: 12, fontWeight: 700, color: '#15803D', marginBottom: 5 }}>
                🌐 おすすめ学習リソース
              </div>
              <div style={{ fontSize: 12, color: '#166534', lineHeight: 1.9 }}>
                • JLPT公式サイト — 過去問・模擬試験
                <br />
                • Nihongo no Mori（YouTube）— N3文法解説
                <br />
                • Anki — 語彙・漢字の暗記
                <br />• NHK Web Easy — 読解練習（やさしい日本語）
              </div>
            </div>
          </>
        )}

        {/* Back button */}
        <button
          onClick={onBack}
          style={{
            width: '100%',
            background: 'linear-gradient(135deg, #0F0C29, #302B63)',
            color: 'white',
            border: 'none',
            borderRadius: 12,
            padding: '15px',
            fontSize: 15,
            fontWeight: 700,
            cursor: 'pointer',
            fontFamily: 'inherit',
            marginTop: 16,
            boxShadow: '0 4px 16px rgba(15,12,41,0.35)',
          }}
        >
          🏠 ホームへ戻る（もう一度練習）
        </button>
      </div>
    </div>
  )
}
