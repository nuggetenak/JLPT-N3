import { formatTime } from '../../utils/scoring.js'

/**
 * Sticky header shown during any quiz section.
 *
 * @param {{ title: string, current: number, total: number, timeLeft: number, color: string, progress: number }} props
 */
export default function ProgressHeader({ title, current, total, timeLeft, color, progress }) {
  const low = timeLeft < 300 // < 5 minutes → red warning

  return (
    <div
      style={{
        background: color,
        color: 'white',
        padding: '12px 16px',
        position: 'sticky',
        top: 0,
        zIndex: 10,
        boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
      }}
    >
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        {/* Top row */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 7,
          }}
        >
          <div>
            <span style={{ fontSize: 11, opacity: 0.72 }}>{title} — </span>
            <span style={{ fontSize: 16, fontWeight: 700 }}>
              {current}{' '}
              <span style={{ opacity: 0.55, fontWeight: 400 }}>/ {total}</span>
            </span>
          </div>
          <div
            style={{
              fontSize: 18,
              fontWeight: 700,
              color: low ? '#FCA5A5' : 'white',
              transition: 'color 0.3s',
            }}
          >
            ⏱ {formatTime(timeLeft)}
          </div>
        </div>

        {/* Progress bar */}
        <div
          style={{
            background: 'rgba(255,255,255,0.22)',
            borderRadius: 99,
            height: 5,
          }}
        >
          <div
            style={{
              background: 'white',
              borderRadius: 99,
              height: 5,
              width: `${progress}%`,
              transition: 'width 0.35s ease',
            }}
          />
        </div>
      </div>
    </div>
  )
}
