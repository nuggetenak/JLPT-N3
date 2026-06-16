import { useState, useEffect, useRef, useCallback } from 'react'

/**
 * A clean countdown timer hook.
 *
 * @returns {{
 *   timeLeft: number,
 *   start: (seconds: number) => void,
 *   stop: () => void,
 * }}
 *
 * @example
 * const { timeLeft, start, stop } = useTimer()
 * start(30 * 60)  // start 30-minute countdown
 */
export function useTimer() {
  const [timeLeft, setTimeLeft] = useState(0)
  const intervalRef = useRef(null)

  const stop = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  const start = useCallback(
    (seconds) => {
      stop()
      setTimeLeft(seconds)
      intervalRef.current = setInterval(() => {
        setTimeLeft((t) => {
          if (t <= 1) {
            clearInterval(intervalRef.current)
            intervalRef.current = null
            return 0
          }
          return t - 1
        })
      }, 1000)
    },
    [stop]
  )

  // Cleanup on unmount
  useEffect(() => () => stop(), [stop])

  return { timeLeft, start, stop }
}
