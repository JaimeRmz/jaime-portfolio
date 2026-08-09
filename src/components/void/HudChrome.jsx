import { useEffect, useState } from 'react'

const TICKER_TEXT = 'Full-stack developer ✦ Houston, TX ✦ Open to internships ✦ Scroll to explore ✦'

/**
 * Fixed HUD chrome that frames the page:
 *   - mark + subtitle top-left
 *   - work count + Index button top-right
 *   - coordinate readout bottom-left, drifting with scroll progress
 *   - ticker strip pinned to the very bottom
 *
 * The Index button is wired here but the panel itself lives in IndexPanel,
 * so App owns the open state.
 */
export default function HudChrome({ projectCount, onOpenIndex }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let frame = null

    const read = () => {
      frame = null
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? window.scrollY / max : 0)
    }

    const onScroll = () => {
      if (frame === null) frame = requestAnimationFrame(read)
    }

    read()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame !== null) cancelAnimationFrame(frame)
    }
  }, [])

  const lat = (29.76 + progress * 0.9).toFixed(3)
  const lng = Math.abs(-95.37 - progress * 0.6)
    .toFixed(3)
    .padStart(7, '0')

  return (
    <>
      <header className="v-topbar">
        <div>
          <div className="v-mark">
            <span className="v-mark-dot" />
            JR.DEV
          </div>
          <div className="v-mark-sub">FULL-STACK PORTFOLIO — VOL.01</div>
        </div>

        <div className="v-topbar-right">
          <div className="v-count">
            {String(projectCount).padStart(2, '0')} WORKS — OPEN TO INTERNSHIPS
          </div>
          <button type="button" className="v-index-btn" onClick={onOpenIndex}>
            Index ☰
          </button>
        </div>
      </header>

      <div className="v-coord" aria-hidden="true">
        <div>
          <span style={{ color: 'var(--accent)' }}>◈</span> <b>{lat}</b>°N / <b>{lng}</b>°W
        </div>
        <div className="v-coord-loc">HOUSTON, TX — OPEN TO INTERNSHIPS</div>
      </div>

      <div className="v-ticker" aria-hidden="true">
        <div className="v-ticker-track">
          {/* duplicated once so the -50% translate loops seamlessly */}
          {Array.from({ length: 8 }, (_, i) => (
            <span key={i}>{TICKER_TEXT}</span>
          ))}
        </div>
      </div>
    </>
  )
}
