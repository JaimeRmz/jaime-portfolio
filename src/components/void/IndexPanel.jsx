import { useEffect } from 'react'
import { INDEX_META } from '../../data/projects'

/**
 * Slide-in index of every project. Clicking a row scrolls to that project
 * row (matched by the `id` ProjectRow puts on its wrapper) and closes.
 * Reads the same PROJECTS array the rows render from.
 */
export default function IndexPanel({ open, onClose, projects }) {
  // Escape closes the panel while it's open.
  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  const jumpTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    onClose()
  }

  return (
    <>
      <div
        className={`v-index-scrim ${open ? 'is-open' : ''}`.trim()}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        className={`v-index-panel ${open ? 'is-open' : ''}`.trim()}
        aria-label="Project index"
        // `inert` (React 19 boolean prop) keeps the offscreen panel out of the
        // tab order and the a11y tree — aria-hidden alone would leave the
        // buttons focusable, which is an a11y violation.
        inert={!open}
      >
        <div className="v-index-head">
          <span>Index — {String(projects.length).padStart(2, '0')} works</span>
          <button type="button" onClick={onClose}>
            Close ✕
          </button>
        </div>

        <div>
          {projects.map((p) => (
            <button
              key={p.id}
              type="button"
              className="v-index-row"
              onClick={() => jumpTo(p.id)}
            >
              <span className="v-index-idx" style={{ color: p.color }}>
                {p.idx}
              </span>
              <span className="v-index-swatch" style={{ background: p.color }} />
              <span className="v-index-text">
                <span className="v-index-title">{p.title}</span>
                <span className="v-index-meta">{INDEX_META[p.id] || p.meta}</span>
              </span>
              <span className="v-index-arrow">↗</span>
            </button>
          ))}
        </div>

        <div className="v-index-foot">Click a project to jump there</div>
      </aside>
    </>
  )
}
