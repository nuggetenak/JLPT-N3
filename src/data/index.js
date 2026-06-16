/**
 * @fileoverview Central data index.
 * Import everything from here — don't reach into individual files directly.
 *
 * Usage:
 *   import { GOI_QUESTIONS, BUNPOU_QUESTIONS, DOKKAI_PASSAGES, SECTIONS } from '../data'
 */

export { GOI_QUESTIONS, GOI_CONFIG } from './goi.js'
export { BUNPOU_QUESTIONS, BUNPOU_CONFIG } from './bunpou.js'
export { DOKKAI_PASSAGES, DOKKAI_CONFIG } from './dokkai.js'

import { GOI_CONFIG } from './goi.js'
import { GOI_QUESTIONS } from './goi.js'
import { BUNPOU_CONFIG } from './bunpou.js'
import { BUNPOU_QUESTIONS } from './bunpou.js'
import { DOKKAI_CONFIG } from './dokkai.js'
import { DOKKAI_PASSAGES } from './dokkai.js'

/** Ordered list of all sections — drives the home screen cards */
export const SECTIONS = [GOI_CONFIG, BUNPOU_CONFIG, DOKKAI_CONFIG]

/**
 * Total question counts, derived directly from the data arrays so they can
 * NEVER drift out of sync when questions are added/removed (this bit us
 * once already — see git history. Always read counts from here, never
 * hardcode them in components).
 */
export const TOTAL_GOI_QS = GOI_QUESTIONS.length
export const TOTAL_BUNPOU_QS = BUNPOU_QUESTIONS.length

/** Total number of Dokkai questions across all passages */
export const TOTAL_DOKKAI_QS = DOKKAI_PASSAGES.reduce(
  (sum, p) => sum + p.qs.length,
  0
)
