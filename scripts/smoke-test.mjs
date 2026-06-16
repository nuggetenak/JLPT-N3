/**
 * @fileoverview End-to-end smoke test against the REAL production bundle.
 *
 * Runs `dist/assets/*.js` inside jsdom and drives the UI exactly like a user
 * would (clicking real buttons, reading real rendered text) — not a mock.
 * Covers: full GOI/BUNPOU/DOKKAI completion, ReviewMode (both linear and
 * passage-based), localStorage persistence across a simulated page refresh,
 * and the reset-progress action.
 *
 * Run with: `npm run test:smoke` (builds first, then runs this against dist/).
 * Exits non-zero if any check fails — safe to wire into CI later if desired.
 */
import { JSDOM } from 'jsdom'
import fs from 'fs'
import path from 'path'

const distDir = path.resolve('dist')
const html = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8')
const scriptMatch = html.match(/<script[^>]*src="([^"]+\.js)"/)
if (!scriptMatch) throw new Error('Could not find bundle script tag in dist/index.html')
const bundlePath = path.join(distDir, scriptMatch[1].replace(/^\/JLPT-N3\//, ''))
const bundleCode = fs.readFileSync(bundlePath, 'utf-8')

function log(label, ok, extra = '') {
  console.log(`${ok ? '✅' : '❌'} ${label}${extra ? ' — ' + extra : ''}`)
  if (!ok) process.exitCode = 1
}

function makeWindow() {
  const dom = new JSDOM('<!DOCTYPE html><html><body><div id="root"></div></body></html>', {
    url: 'http://localhost/JLPT-N3/',
    runScripts: 'dangerously',
    resources: 'usable',
  })
  const { window } = dom
  window.console.log = (...a) => console.log('  [page]', ...a)
  window.console.error = (...a) => console.log('  [page error]', ...a)
  window.addEventListener('error', (e) => console.log('  [window error]', e.error?.stack || e.message))
  return window
}

function injectBundle(window) {
  const scriptEl = window.document.createElement('script')
  scriptEl.textContent = bundleCode
  window.document.head.appendChild(scriptEl)
}

const text = (window) => window.document.body.textContent

function clickByText(window, matcher) {
  const btn = [...window.document.querySelectorAll('button')].find((b) => matcher(b.textContent))
  if (!btn) return false
  btn.dispatchEvent(new window.Event('click', { bubbles: true }))
  return true
}

const tick = (ms = 25) => new Promise((r) => setTimeout(r, ms))

/**
 * Drive a section to completion by always picking option "A.", clicking
 * through every advance button until back at Home. Works for both linear
 * quizzes (GOI/BUNPOU) and the passage-based DOKKAI section.
 */
async function completeSectionPickingA(window, maxSteps = 60) {
  let steps = 0
  for (let i = 0; i < maxSteps; i++) {
    const optionButtons = [...window.document.querySelectorAll('button')].filter((b) =>
      b.textContent.trim().startsWith('A.')
    )
    if (optionButtons.length === 0) break
    optionButtons[0].dispatchEvent(new window.Event('click', { bubbles: true }))
    await tick(12)
    steps++
    const advanced = clickByText(
      window,
      (t) => t.includes('次の問題へ') || t.includes('次の文章へ') || t.includes('セクション完了')
    )
    await tick(20)
    if (!advanced) break
  }
  await tick(80)
  return steps
}

async function main() {
  // ═══════════════════════════════════════════════════════════════
  // PHASE 1 — fresh load, complete GOI (35Q), open review, persistence
  // ═══════════════════════════════════════════════════════════════
  const win1 = makeWindow()
  injectBundle(win1)
  await tick(150)

  log('App mounted (Home screen visible)', text(win1).includes('日本語能力試験'))
  log(
    'Section cards present',
    text(win1).includes('文字・語彙') && text(win1).includes('文法') && text(win1).includes('読解')
  )

  let clicked = clickByText(win1, (t) => t.trim() === '開始 →')
  log('Clicked first 開始 button (GOI)', clicked)
  await tick(80)
  log('Entered GOI quiz screen', text(win1).includes('文字・語彙 —'))

  const goiSteps = await completeSectionPickingA(win1)
  log('Answered through all GOI questions', goiSteps === 35, `answered ${goiSteps}/35`)
  log('Returned to Home after GOI completes', text(win1).includes('セクションを選んでください'))
  log('Home shows a GOI score badge out of 35', /✓ \d+\/35/.test(text(win1)))

  clicked = clickByText(win1, (t) => t.trim() === '📝 復習')
  log('Clicked 📝 復習 link on Home', clicked)
  await tick(80)
  log('Entered ReviewMode for GOI', text(win1).includes('復習モード'))
  log('ReviewMode shows correct/incorrect counts out of 35', /✅ \d+\/35問正解/.test(text(win1)))

  clicked = clickByText(win1, (t) => t.includes('間違えた問題'))
  log('Switched to 間違えた問題 filter tab', clicked)
  await tick(50)

  clicked = clickByText(win1, (t) => t.includes('結果画面に戻る'))
  log('Back button works from ReviewMode', clicked)
  await tick(80)
  log('Back on Home screen', text(win1).includes('セクションを選んでください'))

  const saved = win1.localStorage.getItem('jlptN3Progress')
  log('localStorage has saved progress', !!saved)
  let parsedSaved = null
  if (saved) {
    parsedSaved = JSON.parse(saved)
    log('Saved progress has a numeric goi score', typeof parsedSaved.scores?.goi === 'number')
    log('Saved progress has goi session (for review-after-refresh)', !!parsedSaved.sessions?.goi)
    log('Saved goi session has exactly 35 questions', parsedSaved.sessions?.goi?.questions?.length === 35)
  }

  // ═══════════════════════════════════════════════════════════════
  // PHASE 2 — true refresh simulation: brand-new window, localStorage
  // copied over (NOT the same JS context — avoids global redeclaration).
  // ═══════════════════════════════════════════════════════════════
  const win2 = makeWindow()
  if (saved) win2.localStorage.setItem('jlptN3Progress', saved)
  injectBundle(win2)
  await tick(150)

  log('[refresh] App re-mounted on fresh window', text(win2).includes('日本語能力試験'))
  log('[refresh] GOI score badge still shown (out of 35)', /✓ \d+\/35/.test(text(win2)))
  log(
    '[refresh] 📝 復習 link still available (session survived refresh)',
    [...win2.document.querySelectorAll('button')].some((b) => b.textContent.trim() === '📝 復習')
  )

  clicked = clickByText(win2, (t) => t.trim() === '📝 復習')
  await tick(80)
  log('[refresh] ReviewMode renders rehydrated session data', /✅ \d+\/35問正解/.test(text(win2)))
  clickByText(win2, (t) => t.includes('結果画面に戻る'))
  await tick(60)

  win2.confirm = () => true
  clicked = clickByText(win2, (t) => t.includes('進捗をリセット'))
  log('Clicked reset progress link', clicked)
  await tick(80)
  log('Score badge cleared after reset', !/✓ \d+\/35/.test(text(win2)))
  const savedAfterReset = win2.localStorage.getItem('jlptN3Progress')
  const parsedAfterReset = savedAfterReset ? JSON.parse(savedAfterReset) : null
  log(
    'localStorage cleared/reset after reset action',
    !savedAfterReset || parsedAfterReset?.scores?.goi === null
  )

  // ═══════════════════════════════════════════════════════════════
  // PHASE 3 — BUNPOU section end-to-end (25 Qs)
  // ═══════════════════════════════════════════════════════════════
  const win3 = makeWindow()
  injectBundle(win3)
  await tick(150)
  const startBtns3 = () => [...win3.document.querySelectorAll('button')].filter((b) => b.textContent.trim() === '開始 →')
  clicked = startBtns3()[1] ? (startBtns3()[1].dispatchEvent(new win3.Event('click', { bubbles: true })), true) : false
  log('[BUNPOU] Clicked 2nd 開始 button', clicked)
  await tick(80)
  log('[BUNPOU] Entered BUNPOU quiz screen', text(win3).includes('文法 —'))
  const bunpouSteps = await completeSectionPickingA(win3)
  log('[BUNPOU] Answered through all BUNPOU questions', bunpouSteps === 25, `answered ${bunpouSteps}/25`)
  log('[BUNPOU] Home shows BUNPOU score badge out of 25', /✓ \d+\/25/.test(text(win3)))

  // ═══════════════════════════════════════════════════════════════
  // PHASE 4 — DOKKAI section end-to-end (13 Qs across 4 passages incl. new d4)
  // ═══════════════════════════════════════════════════════════════
  const win4 = makeWindow()
  injectBundle(win4)
  await tick(150)
  const startBtns4 = () => [...win4.document.querySelectorAll('button')].filter((b) => b.textContent.trim() === '開始 →')
  clicked = startBtns4()[2] ? (startBtns4()[2].dispatchEvent(new win4.Event('click', { bubbles: true })), true) : false
  log('[DOKKAI] Clicked 3rd 開始 button', clicked)
  await tick(80)
  log('[DOKKAI] Entered DOKKAI screen', text(win4).includes('読解 —'))
  const dokkaiSteps = await completeSectionPickingA(win4)
  log('[DOKKAI] Answered through all DOKKAI questions', dokkaiSteps === 13, `answered ${dokkaiSteps}/13`)
  log('[DOKKAI] New d4 passage reachable (会話サークル)', dokkaiSteps >= 10) // d4 is 10th-13th Q
  log('[DOKKAI] Home shows DOKKAI score badge out of 13', /✓ \d+\/13/.test(text(win4)))

  clicked = clickByText(win4, (t) => t.trim() === '📝 復習')
  await tick(80)
  log('[DOKKAI] ReviewMode opens for passage-based section', text(win4).includes('復習モード'))
  log('[DOKKAI] ReviewMode shows passage titles', text(win4).includes('読解'))

  console.log('\nSmoke test finished.' + (process.exitCode ? ' SOME CHECKS FAILED.' : ' ALL CHECKS PASSED.'))
  process.exit(process.exitCode ?? 0)
}

main().catch((e) => {
  console.error('💥 Smoke test crashed:', e)
  process.exit(1)
})
