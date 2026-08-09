import { useEffect, useState } from 'react'
import { motion, AnimatePresence, animate } from 'framer-motion'

/**
 * Looping phone mockup of the MacroSet photo → macros flow.
 *
 * Framer Motion earns its place here: this is an orchestrated multi-step
 * sequence (shutter, scan, count-up, staggered bars) with enter/exit
 * transitions, not a scroll reveal. Everything scroll-triggered on this
 * site still runs on IntersectionObserver + CSS.
 *
 * Reduced motion: renders the finished 'results' state statically and never
 * starts the loop.
 */

// Step durations in ms — the cycle is the sum, ~6.4s.
const STEPS = [
  ['idle', 700],
  ['tap', 300],
  ['flash', 150],
  ['thumb', 400],
  ['parse', 1500],
  ['results', 700],
  ['hold', 2200],
  ['reset', 450],
]

const RING_R = 37
const RING_C = 2 * Math.PI * RING_R

const CAL_GOAL = 2300
const CAL_BEFORE = 1840
const CAL_AFTER = 2312

// [before, after] fill percentages
const MACROS = [
  { key: 'PROT', from: 62, to: 88, color: 'var(--accent)' },
  { key: 'CARB', from: 48, to: 71, color: 'var(--blue)' },
  { key: 'FAT', from: 35, to: 54, color: 'var(--magenta)' },
]

// Steps at which the post-log state is showing.
const DONE_STEPS = new Set(['results', 'hold'])

export default function MacroSetDemo() {
  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // Reduced motion pins the sequence to the finished state.
  const [stepIndex, setStepIndex] = useState(0)
  const step = prefersReduced ? 'results' : STEPS[stepIndex][0]

  const [calories, setCalories] = useState(prefersReduced ? CAL_AFTER : CAL_BEFORE)

  // Advance the loop.
  useEffect(() => {
    if (prefersReduced) return
    const [, duration] = STEPS[stepIndex]
    const id = setTimeout(() => setStepIndex((i) => (i + 1) % STEPS.length), duration)
    return () => clearTimeout(id)
  }, [stepIndex, prefersReduced])

  // Count the calorie number up on 'results', snap back on 'reset'.
  useEffect(() => {
    if (prefersReduced) return

    if (step === 'results') {
      const controls = animate(CAL_BEFORE, CAL_AFTER, {
        duration: 0.7,
        ease: 'easeOut',
        onUpdate: (v) => setCalories(Math.round(v)),
      })
      return () => controls.stop()
    }

    if (step === 'reset') setCalories(CAL_BEFORE)
  }, [step, prefersReduced])

  const done = prefersReduced || DONE_STEPS.has(step)
  const showThumb = prefersReduced || ['thumb', 'parse', 'results', 'hold'].includes(step)
  const scanning = !prefersReduced && ['thumb', 'parse'].includes(step)

  const ringPct = Math.min(calories / CAL_GOAL, 1)

  return (
    <div className="v-phone" role="img" aria-label="MacroSet demo: logging a meal photo updates the day's macros">
      <div className="v-phone-head">
        <span>TODAY</span>
        <span>8:41 AM</span>
      </div>

      {/* thumbnail + scanning line — fixed-height slot, so entering doesn't reflow */}
      <div className="v-thumb-slot">
      <AnimatePresence>
        {showThumb && (
          <motion.div
            className="v-thumb"
            initial={prefersReduced ? false : { opacity: 0, y: -10, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="v-thumb-label">{done ? 'Chicken bowl' : 'Analyzing…'}</span>

            {scanning && (
              <motion.div
                className="v-thumb-scan"
                initial={{ top: 0 }}
                animate={{ top: '100%' }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              />
            )}

            {done && (
              <motion.span
                className="v-thumb-check"
                initial={prefersReduced ? false : { scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 18 }}
              >
                ✓
              </motion.span>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      </div>

      {/* calorie ring */}
      <div className="v-phone-ring">
        <svg viewBox="0 0 100 100" width="96" height="96">
          <circle className="v-ring-bg" cx="50" cy="50" r={RING_R} />
          <motion.circle
            className="v-ring-fg"
            cx="50"
            cy="50"
            r={RING_R}
            transform="rotate(-90 50 50)"
            strokeDasharray={RING_C}
            animate={{ strokeDashoffset: RING_C * (1 - ringPct) }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          />
          <text className="v-ring-value" x="50" y="47">
            {calories.toLocaleString()}
          </text>
          <text className="v-ring-unit" x="50" y="60">
            of {CAL_GOAL.toLocaleString()} kcal
          </text>
        </svg>
      </div>

      {/* macro bars */}
      <div className="v-macro-bars">
        {MACROS.map((m, i) => (
          <div key={m.key}>
            <div className="v-macro-lbl">{m.key}</div>
            <div className="v-macro-track">
              <motion.div
                className="v-macro-fill"
                style={{ background: m.color }}
                initial={false}
                animate={{ width: `${done ? m.to : m.from}%` }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: done ? i * 0.08 : 0 }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* toast chip */}
      <AnimatePresence>
        {done && (
          <motion.div
            className="v-toast"
            initial={prefersReduced ? false : { opacity: 0, y: 8, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 4, x: '-50%' }}
            transition={{ duration: 0.35 }}
          >
            +42g protein
          </motion.div>
        )}
      </AnimatePresence>

      {/* camera button — scale pulse on tap, plus an expanding ripple */}
      <motion.div
        className="v-phone-camera"
        animate={{ scale: step === 'tap' ? 0.86 : 1 }}
        transition={{ duration: 0.15, ease: 'easeOut' }}
      >
        <span aria-hidden="true">◉</span>
        <AnimatePresence>
          {step === 'tap' && (
            <motion.span
              className="v-phone-ripple"
              initial={{ opacity: 0.8, scale: 0.85 }}
              animate={{ opacity: 0, scale: 1.6 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            />
          )}
        </AnimatePresence>
      </motion.div>

      {/* shutter flash */}
      <AnimatePresence>
        {step === 'flash' && (
          <motion.div
            className="v-phone-shutter"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.85 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
