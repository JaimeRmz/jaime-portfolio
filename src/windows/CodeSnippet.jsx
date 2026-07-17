import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const SNIPPETS = [
  {
    filename: 'f1_predictor.py',
    label: 'Python · XGBoost',
    code: `# Returns predicted finish position for a driver
def predict_race_result(driver_params, track_params, model):
    """
    driver_params: dict of driver stats (avg_quali, wet_skill, ...)
    track_params:  dict of circuit features (corners, drs_zones, ...)
    """
    features = {
        **driver_params,
        **track_params,
        'form_index': driver_params['recent_pts'] / 26,
        'track_fit':  driver_params['track_hist'].get(
                          track_params['circuit_id'], 0.5
                      ),
    }
    X = pd.DataFrame([features])[model.feature_names_in_]
    pos = model.predict(X)[0]
    return round(float(pos), 2)`,
  },
  {
    filename: 'Window.jsx',
    label: 'React · Framer Motion',
    code: `const SHADOW_RESTING = '0 2px 16px rgba(196,98,45,0.08)'
const SHADOW_LIFTED  = '0 12px 40px rgba(196,98,45,0.18), ' +
                       '0 4px 12px rgba(0,0,0,0.08)'

export default function Window({ title, children }) {
  const dragControls = useDragControls()

  return (
    <motion.div
      drag
      dragControls={dragControls}
      dragMomentum={false}
      animate={{ boxShadow: SHADOW_RESTING }}
      whileDrag={{
        boxShadow: SHADOW_LIFTED,
        rotate: 1.5,
        cursor: 'grabbing',
      }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
    >
      {children}
    </motion.div>
  )
}`,
  },
  {
    filename: 'radar.js',
    label: 'D3.js · SVG',
    code: `// Draw and animate the radar polygon
const dataPoints = AXES.map(({ value }, i) =>
  spoke(i, RADIUS * value)
)
const dataPoly = svg.append('polygon')
  .attr('points', dataPoints.map(p => p.join(',')).join(' '))
  .attr('fill', 'rgba(196,98,45,0.1)')
  .attr('stroke', '#C4622D')
  .attr('stroke-width', 1.5)

// Measure perimeter for stroke-dasharray animation
const len = dataPoly.node().getTotalLength()

dataPoly
  .attr('stroke-dasharray', \`\${len} \${len}\`)
  .attr('stroke-dashoffset', len)
  .transition()
    .duration(1200)
    .ease(d3.easeCubicOut)
    .attr('stroke-dashoffset', 0)`,
  },
]

// Tokenise a line into spans with colour roles
function tokenise(line) {
  const tokens = []
  let rest = line

  const rules = [
    { re: /^(#.*)$/,                         cls: 'comment' },
    { re: /^("""[\s\S]*?"""|'[^']*'|"[^"]*"|`[^`]*`)/, cls: 'string' },
    { re: /^(\b(?:def|return|import|from|export|default|const|let|function|class|if|else|for|of|in|return|new)\b)/, cls: 'keyword' },
    { re: /^(\b\d+\.?\d*\b)/,                cls: 'number' },
    { re: /^([A-Za-z_$][\w$]*)/,             cls: null },
    { re: /^([^\w\s$`'"#]+)/,                cls: null },
    { re: /^(\s+)/,                           cls: null },
  ]

  let key = 0
  while (rest.length) {
    let matched = false
    for (const { re, cls } of rules) {
      const m = rest.match(re)
      if (m) {
        tokens.push({ text: m[1], cls, key: key++ })
        rest = rest.slice(m[1].length)
        matched = true
        break
      }
    }
    if (!matched) {
      tokens.push({ text: rest[0], cls: null, key: key++ })
      rest = rest.slice(1)
    }
  }
  return tokens
}

const TOKEN_COLORS = {
  comment: '#6b5a4a',
  string:  '#C4622D',
  keyword: '#a09080',
  number:  '#c0a888',
}

function CodeLine({ line, number }) {
  const tokens = tokenise(line)
  return (
    <div style={{ display: 'flex', minHeight: '1.5em' }}>
      <span style={{
        minWidth: 28,
        paddingRight: 12,
        color: 'var(--text-dim)',
        textAlign: 'right',
        opacity: 0.4,
        userSelect: 'none',
        flexShrink: 0,
      }}>
        {number}
      </span>
      <span>
        {tokens.map(({ text, cls, key }) => (
          <span key={key} style={{ color: cls ? TOKEN_COLORS[cls] : '#c8b89a' }}>
            {text}
          </span>
        ))}
      </span>
    </div>
  )
}

export default function CodeSnippet() {
  const [index, setIndex]     = useState(0)
  const [copied, setCopied]   = useState(false)
  const snippet = SNIPPETS[index]

  useEffect(() => {
    const id = setInterval(() => setIndex(i => (i + 1) % SNIPPETS.length), 4000)
    return () => clearInterval(id)
  }, [])

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(snippet.code).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    })
  }, [snippet.code])

  return (
    <div style={{
      background:   '#1C1510',
      borderRadius: 7,
      overflow:     'hidden',
      fontFamily:   '"JetBrains Mono", "Fira Code", "Cascadia Code", monospace',
      fontSize:     10.5,
      lineHeight:   '1.5em',
    }}>
      {/* Editor tab bar */}
      <div style={{
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'space-between',
        padding:        '5px 10px',
        borderBottom:   '1px solid rgba(196,98,45,0.12)',
        background:     '#160f0b',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            padding:      '2px 10px',
            borderRadius: '4px 4px 0 0',
            background:   '#1C1510',
            color:        '#c8b89a',
            fontSize:     10,
            border:       '1px solid rgba(196,98,45,0.2)',
            borderBottom: '1px solid #1C1510',
            marginBottom: -6,
          }}>
            <AnimatePresence mode="wait">
              <motion.span
                key={snippet.filename}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                {snippet.filename}
              </motion.span>
            </AnimatePresence>
          </div>
          <span style={{ color: '#6b5a4a', fontSize: 9, marginLeft: 4 }}>
            {snippet.label}
          </span>
        </div>
        <button
          onClick={handleCopy}
          style={{
            background:   'rgba(196,98,45,0.12)',
            border:       '1px solid rgba(196,98,45,0.22)',
            borderRadius: 4,
            color:        copied ? '#c0a888' : '#8a7060',
            fontSize:     9,
            padding:      '2px 8px',
            cursor:       'pointer',
            transition:   'color 0.2s',
          }}
        >
          {copied ? 'copied!' : 'copy'}
        </button>
      </div>

      {/* Code body */}
      <div style={{ padding: '10px 8px', minHeight: 220 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.3 }}
          >
            {snippet.code.split('\n').map((line, i) => (
              <CodeLine key={i} line={line} number={i + 1} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dot indicators */}
      <div style={{
        display:        'flex',
        justifyContent: 'center',
        gap:            6,
        padding:        '6px 0 8px',
      }}>
        {SNIPPETS.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            style={{
              width:        i === index ? 16 : 6,
              height:       6,
              borderRadius: 3,
              background:   i === index ? '#C4622D' : 'rgba(196,98,45,0.25)',
              border:       'none',
              cursor:       'pointer',
              padding:      0,
              transition:   'width 0.3s, background 0.3s',
            }}
          />
        ))}
      </div>
    </div>
  )
}
