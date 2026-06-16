import { useState, useEffect } from 'react'
import { useTimer } from './hooks/useTimer.js'
import {
  GOI_QUESTIONS,
  GOI_CONFIG,
  BUNPOU_QUESTIONS,
  BUNPOU_CONFIG,
  DOKKAI_CONFIG,
} from './data/index.js'
import { loadProgress, saveProgress, clearProgress } from './utils/storage.js'
import Home from './components/Home.jsx'
import QuizSection from './components/QuizSection.jsx'
import DokkaiSection from './components/DokkaiSection.jsx'
import Results from './components/Results.jsx'
import ReviewMode from './components/ReviewMode.jsx'

const CONFIGS = { goi: GOI_CONFIG, bunpou: BUNPOU_CONFIG, dokkai: DOKKAI_CONFIG }
const EMPTY_SCORES = { goi: null, bunpou: null, dokkai: null }
const EMPTY_SESSIONS = { goi: null, bunpou: null, dokkai: null }

/**
 * Screen IDs:
 *   "home"    — section picker
 *   "goi"     — 文字・語彙 quiz
 *   "bunpou"  — 文法 quiz
 *   "dokkai"  — 読解
 *   "results" — final score screen
 *   "review"  — wrong-answer review for one section
 */
export default function App() {
  // Hydrate scores + session data from localStorage on first load.
  const [{ scores: initialScores, sessions: initialSessions }] = useState(() => loadProgress())

  const [screen, setScreen] = useState('home')
  const [scores, setScores] = useState(initialScores)
  const [sessions, setSessions] = useState(initialSessions) // per-section { questions/passages, answers/answerMap }
  const [reviewKey, setReviewKey] = useState(null) // which section is being reviewed
  const [reviewFrom, setReviewFrom] = useState('home') // screen to return to after review
  const { timeLeft, start: startTimer, stop: stopTimer } = useTimer()

  // Persist progress (scores + sessions) on every change so a refresh never
  // wipes it out. Cheap no-op if nothing changed from what's already saved.
  useEffect(() => {
    saveProgress({ scores, sessions })
  }, [scores, sessions])

  function startSection(key) {
    const limit = CONFIGS[key]?.timeLimit ?? 40 * 60 // dokkai = 40 min
    startTimer(limit)
    setScreen(key)
  }

  function finishSection(key, score, session) {
    stopTimer()
    setScores((prev) => ({ ...prev, [key]: score }))
    setSessions((prev) => ({ ...prev, [key]: session }))
    setScreen('home')
  }

  function openReview(key, from) {
    setReviewKey(key)
    setReviewFrom(from)
    setScreen('review')
  }

  function resetProgress() {
    const ok = window.confirm(
      '本当に進捗をリセットしますか？\nすべてのスコアと復習データが削除されます。'
    )
    if (!ok) return
    clearProgress()
    setScores(EMPTY_SCORES)
    setSessions(EMPTY_SESSIONS)
    setScreen('home')
  }

  if (screen === 'goi')
    return (
      <QuizSection
        questions={GOI_QUESTIONS}
        config={GOI_CONFIG}
        timeLeft={timeLeft}
        onComplete={(score, session) => finishSection('goi', score, session)}
      />
    )

  if (screen === 'bunpou')
    return (
      <QuizSection
        questions={BUNPOU_QUESTIONS}
        config={BUNPOU_CONFIG}
        timeLeft={timeLeft}
        onComplete={(score, session) => finishSection('bunpou', score, session)}
      />
    )

  if (screen === 'dokkai')
    return (
      <DokkaiSection
        timeLeft={timeLeft}
        onComplete={(score, session) => finishSection('dokkai', score, session)}
      />
    )

  if (screen === 'results')
    return (
      <Results
        scores={scores}
        sessions={sessions}
        onBack={() => setScreen('home')}
        onReview={(key) => openReview(key, 'results')}
      />
    )

  if (screen === 'review' && reviewKey && sessions[reviewKey]) {
    const session = sessions[reviewKey]
    const config = CONFIGS[reviewKey]
    const reviewProps =
      reviewKey === 'dokkai'
        ? { passages: session.passages, answerMap: session.answerMap }
        : { questions: session.questions, answers: session.answers }

    return (
      <ReviewMode
        {...reviewProps}
        config={config}
        onBack={() => setScreen(reviewFrom)}
      />
    )
  }

  return (
    <Home
      scores={scores}
      sessions={sessions}
      onStart={startSection}
      onResults={() => setScreen('results')}
      onReview={(key) => openReview(key, 'home')}
      onReset={resetProgress}
    />
  )
}
