import { SECTIONS, TOTAL_GOI_QS, TOTAL_BUNPOU_QS, TOTAL_DOKKAI_QS } from '../data/index.js'
import { SectionCard } from './ui/index.jsx'

/**
 * @param {{
 *   scores: { goi: number|null, bunpou: number|null, dokkai: number|null },
 *   sessions: { goi: object|null, bunpou: object|null, dokkai: object|null },
 *   onStart: (sectionKey: string) => void,
 *   onResults: () => void,
 *   onReview: (sectionKey: string) => void,
 *   onReset: () => void,
 * }} props
 */
export default function Home({ scores, sessions, onStart, onResults, onReview, onReset }) {
  const totals = { goi: TOTAL_GOI_QS, bunpou: TOTAL_BUNPOU_QS, dokkai: TOTAL_DOKKAI_QS }

  const totalScore = (scores.goi ?? 0) + (scores.bunpou ?? 0) + (scores.dokkai ?? 0)
  const totalMax = TOTAL_GOI_QS + TOTAL_BUNPOU_QS + TOTAL_DOKKAI_QS
  const allDone = SECTIONS.every((s) => scores[s.key] !== null)
  const pct = allDone ? Math.round((totalScore / totalMax) * 100) : null

  return (
    <div style={{ minHeight: '100vh', background: '#F0F2F5', fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      {/* ── Hero ── */}
      <div
        style={{
          background: 'linear-gradient(150deg, #0F0C29 0%, #302B63 50%, #24243E 100%)',
          color: 'white',
          padding: '28px 16px 20px',
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: 11, letterSpacing: 4, opacity: 0.5, marginBottom: 6, fontWeight: 600 }}>
          NUGGET NIHONGO
        </div>
        <div style={{ fontSize: 26, fontWeight: 900, letterSpacing: -1, lineHeight: 1.1 }}>
          日本語能力試験
        </div>
        <div style={{ fontSize: 48, fontWeight: 900, color: '#C4B5FD', lineHeight: 1 }}>N3</div>
        <div style={{ fontSize: 13, opacity: 0.65, marginTop: 4 }}>
          総合模擬練習 — Latihan Komprehensif
        </div>

        {allDone && (
          <div
            style={{
              marginTop: 16,
              background: 'rgba(196,181,253,0.15)',
              border: '1px solid rgba(196,181,253,0.3)',
              borderRadius: 14,
              padding: '12px 20px',
              display: 'inline-block',
            }}
          >
            <div style={{ fontSize: 11, opacity: 0.7 }}>総合スコア</div>
            <div
              style={{
                fontSize: 40,
                fontWeight: 900,
                color: pct >= 70 ? '#86EFAC' : pct >= 55 ? '#FDE68A' : '#FCA5A5',
              }}
            >
              {totalScore}
              <span style={{ fontSize: 18, opacity: 0.6 }}>/{totalMax}</span>
            </div>
            <div style={{ fontSize: 13, marginTop: 2 }}>
              {pct >= 70
                ? '🎉 合格圏内！この調子で！'
                : pct >= 55
                ? '💪 もう少し！がんばれ！'
                : '📚 もっと練習が必要！'}
            </div>
          </div>
        )}
      </div>

      {/* ── Countdown banner ── */}
      <div
        style={{
          background: '#FEF3C7',
          borderBottom: '1px solid #FDE68A',
          padding: '9px 16px',
          textAlign: 'center',
          fontSize: 12,
          color: '#92400E',
          fontWeight: 600,
        }}
      >
        🔥 試験まであと2週間！ファイトー！ &nbsp;|&nbsp; 全部で {totalMax} 問
      </div>

      {/* ── Section cards ── */}
      <div style={{ maxWidth: 600, margin: '0 auto', padding: '14px 14px 32px' }}>
        <div style={{ fontSize: 12, color: '#6B7280', fontWeight: 700, marginBottom: 10 }}>
          セクションを選んでください
        </div>

        {SECTIONS.map((s) => (
          <SectionCard
            key={s.key}
            section={s}
            score={scores[s.key]}
            totalQ={totals[s.key]}
            hasSession={!!sessions?.[s.key]}
            onStart={() => onStart(s.key)}
            onReview={() => onReview(s.key)}
          />
        ))}

        {allDone && (
          <button
            onClick={onResults}
            style={{
              width: '100%',
              background: 'linear-gradient(135deg, #0F0C29, #302B63)',
              color: 'white',
              border: 'none',
              borderRadius: 13,
              padding: '16px',
              fontSize: 15,
              fontWeight: 700,
              cursor: 'pointer',
              fontFamily: 'inherit',
              marginTop: 4,
              boxShadow: '0 4px 16px rgba(15,12,41,0.4)',
            }}
          >
            📊 総合結果を見る
          </button>
        )}

        {/* Tips card */}
        <div
          style={{
            marginTop: 16,
            background: '#EFF6FF',
            border: '1px solid #BFDBFE',
            borderRadius: 12,
            padding: '13px 15px',
          }}
        >
          <div style={{ fontSize: 12, fontWeight: 700, color: '#1D4ED8', marginBottom: 6 }}>
            💡 N3 試験攻略のポイント
          </div>
          <div style={{ fontSize: 12, color: '#1E40AF', lineHeight: 1.85 }}>
            • 読解：<b>先に問題文を読んで</b>から本文を読む
            <br />
            • 文法：接続詞「のに・から・ので」の違いを整理する
            <br />
            • 語彙：同じ読みで違う意味の漢字に注意（例：性格・正確）
            <br />• 時間配分：語彙30分 → 文法50分 → 読解40分 が目安
          </div>
        </div>

        {/* Reset progress — small, unobtrusive */}
        {(scores.goi !== null || scores.bunpou !== null || scores.dokkai !== null) && (
          <div style={{ textAlign: 'center', marginTop: 18 }}>
            <button
              onClick={onReset}
              style={{
                fontSize: 11,
                color: '#9CA3AF',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 4,
                fontFamily: 'inherit',
                textDecoration: 'underline',
              }}
            >
              🔄 進捗をリセットする
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
