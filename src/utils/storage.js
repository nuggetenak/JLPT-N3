/**
 * @fileoverview localStorage persistence for quiz progress.
 *
 * Stores per-section scores AND the full session data (shuffled questions +
 * the user's answers) so that ReviewMode still works correctly after a page
 * refresh — not just the bare score numbers.
 *
 * Storage shape:
 * {
 *   version: 1,
 *   scores:   { goi: number|null, bunpou: number|null, dokkai: number|null },
 *   sessions: { goi: SessionData|null, bunpou: SessionData|null, dokkai: SessionData|null },
 *   savedAt:  string (ISO timestamp)
 * }
 */

const STORAGE_KEY = 'jlptN3Progress'
const STORAGE_VERSION = 1

const EMPTY_PROGRESS = {
  version: STORAGE_VERSION,
  scores: { goi: null, bunpou: null, dokkai: null },
  sessions: { goi: null, bunpou: null, dokkai: null },
  savedAt: null,
}

/**
 * Load saved progress from localStorage.
 * Falls back to an empty progress object if nothing is saved, the data is
 * corrupted, or localStorage is unavailable (e.g. private browsing).
 *
 * @returns {typeof EMPTY_PROGRESS}
 */
export function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { ...EMPTY_PROGRESS }

    const parsed = JSON.parse(raw)
    if (parsed?.version !== STORAGE_VERSION) return { ...EMPTY_PROGRESS }

    return {
      version: STORAGE_VERSION,
      scores: { ...EMPTY_PROGRESS.scores, ...(parsed.scores ?? {}) },
      sessions: { ...EMPTY_PROGRESS.sessions, ...(parsed.sessions ?? {}) },
      savedAt: parsed.savedAt ?? null,
    }
  } catch {
    // Corrupted JSON, storage disabled, or quota error — start fresh.
    return { ...EMPTY_PROGRESS }
  }
}

/**
 * Persist current scores + session data to localStorage.
 * Silently no-ops on failure (e.g. quota exceeded, storage disabled) so the
 * app never crashes just because progress couldn't be saved.
 *
 * @param {{ scores: object, sessions: object }} data
 */
export function saveProgress({ scores, sessions }) {
  try {
    const payload = {
      version: STORAGE_VERSION,
      scores,
      sessions,
      savedAt: new Date().toISOString(),
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
  } catch {
    // Ignore — progress just won't survive a refresh this time.
  }
}

/** Clear all saved progress (used by the "reset" action). */
export function clearProgress() {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    // Ignore.
  }
}
