import Reveal from './Reveal'
import TerminalPanel from './TerminalPanel'
import ProjectMedia from './ProjectMedia'

/**
 * One zigzag project row: media on one side, glass terminal panel on the
 * other, overlapping the media edge. `flip` swaps which side the media sits
 * on. Presentational — it reads a single project object and nothing else.
 */
export default function ProjectRow({ project, flip = false }) {
  const { id, idx, title, kicker, meta, description, tags, statChip, href, color, media } = project

  return (
    <Reveal
      id={id}
      variant="rise"
      className={`v-proj ${flip ? 'v-proj--flip' : ''}`.trim()}
      threshold={0.15}
      style={{ '--pc': color }}
    >
      <div className="v-proj-visual">
        <div className="v-proj-badge">{idx}</div>
        <ProjectMedia media={media} accent={color} />
      </div>

      <TerminalPanel className="v-proj-panel">
        <div className="v-proj-tag">{kicker}</div>
        <h3 className="v-proj-title">{title}</h3>
        <div className="v-proj-meta">{meta}</div>

        <Reveal as="p" variant="brighten" className="v-proj-desc">
          {description}
        </Reveal>

        <div className="v-proj-tags">
          {tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>

        <div className="v-proj-actions">
          <a className="v-launch" href={href} target="_blank" rel="noreferrer">
            Launch ↗
          </a>
          <span className="v-stat-chip">{statChip}</span>
        </div>
      </TerminalPanel>
    </Reveal>
  )
}
