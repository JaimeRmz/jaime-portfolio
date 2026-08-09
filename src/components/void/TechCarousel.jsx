import { useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import AutoScroll from 'embla-carousel-auto-scroll'
import { TECH } from '../../data/tech'

/**
 * Logo with a graceful fallback: if the CDN image fails, it degrades to the
 * small colour chip rather than a broken-image icon.
 * alt="" is deliberate — the tech name sits right beside it as real text, so
 * captioning the image would make screen readers announce it twice.
 */
function TechLogo({ logo, name }) {
  const [failed, setFailed] = useState(false)

  if (!logo || failed) return <i aria-hidden="true" />

  return (
    <img
      className="v-tech-logo"
      src={logo}
      alt=""
      width="34"
      height="34"
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      title={name}
    />
  )
}

/**
 * Tech stack strip built on Embla (embla-carousel-react) with the official
 * auto-scroll plugin, replacing the mockup's CSS marquee. Draggable, loops,
 * and pauses on hover. Auto-scroll is skipped under reduced motion — the
 * carousel stays fully drag/keyboard navigable.
 */
export default function TechCarousel() {
  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const [emblaRef] = useEmblaCarousel(
    { loop: true, dragFree: true, align: 'start', containScroll: false },
    prefersReduced
      ? []
      : [
          AutoScroll({
            speed: 0.9,
            startDelay: 0,
            stopOnInteraction: false,
            stopOnMouseEnter: true,
          }),
        ]
  )

  return (
    <section className="v-tech" aria-label="Tech stack">
      <div className="v-tech-viewport" ref={emblaRef}>
        <div className="v-tech-container">
          {/* listed twice so the slides always overflow the viewport — Embla
              silently disables `loop` when the content is narrower than the
              container, which would strand the strip on wide screens */}
          {[...TECH, ...TECH].map((t, i) => (
            <div className="v-tech-slide" key={`${t.name}-${i}`} style={{ '--tc': t.color }}>
              <TechLogo logo={t.logo} name={t.name} />
              {t.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
