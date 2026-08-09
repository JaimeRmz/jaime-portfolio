import SectionLabel from '../components/void/SectionLabel'
import ProjectRow from '../components/void/ProjectRow'
import { PROJECTS } from '../data/projects'

export default function Work() {
  return (
    <section className="v-wrap" id="work">
      <SectionLabel n="02" title="My Work" ghost="WORK" />

      <div className="v-projects">
        {PROJECTS.map((project, i) => (
          // zigzag: every other row puts the media on the opposite side
          <ProjectRow key={project.id} project={project} flip={i % 2 === 1} />
        ))}
      </div>
    </section>
  )
}
