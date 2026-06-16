import { useState } from 'react'
import { useTimer } from './hooks/useTimer.js'
import { GOI_QUESTIONS, GOI_CONFIG, BUNPOU_QUESTIONS, BUNPOU_CONFIG } from './data/index.js'
import Home from './components/Home.jsx'
import QuizSection from './components/QuizSection.jsx'
import DokkaiSection from './components/DokkaiSection.jsx'
import Results from './components/Results.jsx'

/**
 * Screen IDs:
 *   "home"    — section picker
 *   "goi"     — 文字・語彙 quiz
 *   "bunpou"  — 文法 quiz
 *   "dokkai"  — 読解
 *   "results" — final score screen
 */
export default function App() {
  const [screen, setScreen] = useState('home')
  const [scores, setScores] = useState({ goi: null, bunpou: null, dokkai: null })
  const { timeLeft, start: startTimer, stop: stopTimer } = useTimer()

  function startSection(key) {
    const cfg = { goi: GOI_CONFIG, bunpou: BUNPOU_CONFIG }
    const limit = cfg[key]?.timeLimit ?? 40 * 60  // dokkai = 40 min
    startTimer(limit)
    setScreen(key)
  }

  function finishSection(key, score) {
    stopTimer()
    setScores((prev) => ({ ...prev, [key]: score }))
    setScreen('home')
  }

  if (screen === 'goi')
    return (
      <QuizSection
        questions={GOI_QUESTIONS}
        config={GOI_CONFIG}
        timeLeft={timeLeft}
        onComplete={(score) => finishSection('goi', score)}
      />
    )

  if (screen === 'bunpou')
    return (
      <QuizSection
        questions={BUNPOU_QUESTIONS}
        config={BUNPOU_CONFIG}
        timeLeft={timeLeft}
        onComplete={(score) => finishSection('bunpou', score)}
      />
    )

  if (screen === 'dokkai')
    return (
      <DokkaiSection
        timeLeft={timeLeft}
        onComplete={(score) => finishSection('dokkai', score)}
      />
    )

  if (screen === 'results')
    return <Results scores={scores} onBack={() => setScreen('home')} />

  return (
    <Home
      scores={scores}
      onStart={startSection}
      onResults={() => setScreen('results')}
    />
  )
}
