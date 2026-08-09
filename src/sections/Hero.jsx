import { motion } from 'framer-motion'
import GhostType from '../components/void/GhostType'
import Reveal from '../components/void/Reveal'
import { SOCIAL_LINKS } from '../data/links'

/**
 * Hero entrance: a staggered fade-up that runs on mount, not on scroll.
 * This content is above the fold, so Reveal's IntersectionObserver "rise"
 * variant would fire instantly and read as no animation at all.
 *
 * The whole sequence finishes at ~0.95s.
 *
 * The bio keeps its Reveal `brighten` treatment and is wrapped rather than
 * converted: brighten animates *colour* (--ash-dim → --ink), while this
 * animates opacity/transform, so the two compose instead of fighting over
 * the same property.
 *
 * Reduced motion: spreading an empty object means no initial/animate props,
 * so everything renders in its final state immediately — same approach as
 * MacroSetDemo.
 */
const EASE = [0.22, 1, 0.36, 1]

export default function Hero() {
  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const enter = (delay, y = 20) =>
    prefersReduced
      ? {}
      : {
          initial: { opacity: 0, y },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, delay, ease: EASE },
        }

  return (
    <section className="v-intro v-wrap">
      <GhostType>JAIME</GhostType>

      <motion.div className="v-eyebrow" {...enter(0)}>
        hi, i'm
      </motion.div>

      <motion.h1 className="v-name" {...enter(0.15, 28)}>
        Jaime <em>Ramirez.</em>
      </motion.h1>

      <motion.div className="v-subtitle" {...enter(0.25)}>
        CS student · full-stack dev · GK academy founder
      </motion.div>

      <motion.div {...enter(0.35)}>
        <Reveal as="p" variant="brighten" className="v-bio" threshold={0.35}>
          Computer Science student at <b>University of Houston Clear Lake</b>, specializing in
          full-stack development and machine learning. AWS Cloud Practitioner certified. Founder
          of <b>JRGK Performance</b> — a multi-location goalkeeper training academy operating
          across Houston, Katy, Pasadena, and the Med Center with 50+ athletes.
        </Reveal>
      </motion.div>

      <motion.div {...enter(0.45, 16)}>
        <div className="v-status">
          <span className="v-status-led" />
          open to internships
        </div>

        <div className="v-link-row">
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.label}
              className="v-pill"
              href={link.href}
              target="_blank"
              rel="noreferrer"
            >
              {link.label}
            </a>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
