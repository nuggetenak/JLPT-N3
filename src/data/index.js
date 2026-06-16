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
import { BUNPOU_CONFIG } from './bunpou.js'
import { DOKKAI_CONFIG } from './dokkai.js'
import { DOKKAI_PASSAGES } from './dokkai.js'

/** Ordered list of all sections — drives the home screen cards */
export const SECTIONS = [GOI_CONFIG, BUNPOU_CONFIG, DOKKAI_CONFIG]

/** Total number of Dokkai questions across all passages */
export const TOTAL_DOKKAI_QS = DOKKAI_PASSAGES.reduce(
  (sum, p) => sum + p.qs.length,
  0
)
