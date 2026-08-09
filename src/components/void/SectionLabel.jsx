import GhostType from './GhostType'

/** Numbered section heading with a trailing rule and optional ghost word. */
export default function SectionLabel({ n, title, ghost, style }) {
  return (
    <div className="v-section-label" style={style}>
      {ghost && <GhostType>{ghost}</GhostType>}
      <span className="v-n">{n}</span>
      <h2>{title}</h2>
      <div className="v-section-rule" />
    </div>
  )
}
