import { useEffect, useRef } from 'react'

const TRAIL_LENGTH = 10
const DOT_SIZE     = 5
const isTouch = typeof window !== 'undefined' &&
  ('ontouchstart' in window || window.matchMedia('(pointer: coarse)').matches)

export default function CursorTrail() {
  const dotsRef     = useRef([])
  const positions   = useRef(Array.from({ length: TRAIL_LENGTH }, () => ({ x: -100, y: -100 })))
  const mousePos    = useRef({ x: -100, y: -100 })
  const rafId       = useRef(null)

  useEffect(() => {
    if (isTouch) return  // no mousemove on touch screens
    const onMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY }
    }

    const tick = () => {
      // Shift each position toward the one ahead of it
      const pos = positions.current
      pos[0].x += (mousePos.current.x - pos[0].x) * 0.35
      pos[0].y += (mousePos.current.y - pos[0].y) * 0.35

      for (let i = 1; i < TRAIL_LENGTH; i++) {
        pos[i].x += (pos[i - 1].x - pos[i].x) * 0.35
        pos[i].y += (pos[i - 1].y - pos[i].y) * 0.35
      }

      // Apply to DOM nodes directly — no React re-render
      dotsRef.current.forEach((el, i) => {
        if (!el) return
        const half = DOT_SIZE / 2
        el.style.transform = `translate(${pos[i].x - half}px, ${pos[i].y - half}px)`
      })

      rafId.current = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMouseMove)
    rafId.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(rafId.current)
    }
  }, [])

  if (isTouch) return null

  return (
    <>
      {Array.from({ length: TRAIL_LENGTH }, (_, i) => {
        // Head dot is fully opaque, tail fades to near-transparent
        const opacity = 1 - i / TRAIL_LENGTH
        const size    = DOT_SIZE - i * 0.25

        return (
          <div
            key={i}
            ref={el => { dotsRef.current[i] = el }}
            style={{
              position:      'fixed',
              top:           0,
              left:          0,
              width:         size,
              height:        size,
              borderRadius:  '50%',
              background:    `rgba(196,98,45,${(opacity * 0.4).toFixed(3)})`,
              pointerEvents: 'none',
              zIndex:        9999,
              willChange:    'transform',
            }}
          />
        )
      })}
    </>
  )
}
