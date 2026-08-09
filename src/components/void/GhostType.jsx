/**
 * Oversized outline word sitting behind a section for depth.
 * Purely decorative — hidden from assistive tech.
 */
export default function GhostType({ children, style, className = '' }) {
  return (
    <div className={`v-ghost ${className}`.trim()} style={style} aria-hidden="true">
      {children}
    </div>
  )
}
