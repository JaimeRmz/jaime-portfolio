import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

const AXES = [
  { label: 'React',          value: 0.90 },
  { label: 'Python',         value: 0.80 },
  { label: 'ML/AI',          value: 0.75 },
  { label: 'SQL',            value: 0.65 },
  { label: 'Algorithms',     value: 0.72 },
  { label: 'CS Fundamentals',value: 0.88 },
]

const SIZE   = 280
const CENTER = SIZE / 2
const RADIUS = 100
const LEVELS = 4

const STROKE = '#C4622D'
const FILL   = 'rgba(196,98,45,0.1)'
const GRID   = 'rgba(196,98,45,0.15)'
const LABEL  = '#c0a888'

function angleOf(i, total) {
  return (Math.PI * 2 * i) / total - Math.PI / 2
}

function spoke(i, r) {
  const a = angleOf(i, AXES.length)
  return [CENTER + r * Math.cos(a), CENTER + r * Math.sin(a)]
}

export default function Skills() {
  const svgRef = useRef(null)

  useEffect(() => {
    const svg = d3.select(svgRef.current)
    svg.selectAll('*').remove()

    // grid rings
    for (let lvl = 1; lvl <= LEVELS; lvl++) {
      const r = (RADIUS / LEVELS) * lvl
      const pts = AXES.map((_, i) => spoke(i, r).join(',')).join(' ')
      svg.append('polygon')
        .attr('points', pts)
        .attr('fill', 'none')
        .attr('stroke', GRID)
        .attr('stroke-width', 1)
    }

    // spoke lines
    AXES.forEach((_, i) => {
      const [x, y] = spoke(i, RADIUS)
      svg.append('line')
        .attr('x1', CENTER).attr('y1', CENTER)
        .attr('x2', x).attr('y2', y)
        .attr('stroke', GRID)
        .attr('stroke-width', 1)
    })

    // labels
    AXES.forEach(({ label }, i) => {
      const [x, y] = spoke(i, RADIUS + 22)
      svg.append('text')
        .attr('x', x)
        .attr('y', y)
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'middle')
        .attr('fill', LABEL)
        .attr('font-size', 9)
        .attr('font-family', 'inherit')
        .text(label)
    })

    // data polygon — animate via stroke-dasharray
    const dataPoints = AXES.map(({ value }, i) => spoke(i, RADIUS * value))
    const polyPoints  = dataPoints.map(p => p.join(',')).join(' ')

    const dataPoly = svg.append('polygon')
      .attr('points', polyPoints)
      .attr('fill', FILL)
      .attr('stroke', STROKE)
      .attr('stroke-width', 1.5)
      .attr('stroke-linejoin', 'round')

    // measure perimeter for dash animation
    const node = dataPoly.node()
    const len  = node.getTotalLength()

    dataPoly
      .attr('stroke-dasharray', `${len} ${len}`)
      .attr('stroke-dashoffset', len)
      .transition()
        .duration(1200)
        .ease(d3.easeCubicOut)
        .attr('stroke-dashoffset', 0)

    // dot on each vertex, fade in after line draws
    dataPoints.forEach(([x, y]) => {
      svg.append('circle')
        .attr('cx', x).attr('cy', y)
        .attr('r', 3)
        .attr('fill', STROKE)
        .attr('opacity', 0)
        .transition()
          .delay(1100)
          .duration(300)
          .attr('opacity', 1)
    })
  }, [])

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '8px 0' }}>
      <svg ref={svgRef} width={SIZE} height={SIZE} style={{ overflow: 'visible', background: 'transparent' }} />
    </div>
  )
}
