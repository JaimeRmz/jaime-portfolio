import { useEffect, useRef, useState } from 'react'

/**
 * Fires once when the element first scrolls into view, then stops observing.
 * Used for every scroll reveal on the page — the row fade/scale and the
 * dim→bright text. Deliberately IntersectionObserver + CSS only, no
 * animation library and no scroll listener.
 *
 * @param {{threshold?: number, rootMargin?: string}} options
 * @returns {[React.RefObject<HTMLElement>, boolean]} ref to attach, and whether it has entered
 */
export default function useInViewOnce({ threshold = 0.3, rootMargin = '0px 0px -8% 0px' } = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // No IO (or reduced motion): show the final state immediately.
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (typeof IntersectionObserver === 'undefined' || prefersReduced) {
      setInView(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, rootMargin])

  return [ref, inView]
}
