import { useState, useEffect, useRef } from 'react'
import { useIsMobile } from '../hooks/useIsMobile'

const DRIVERS = [
  { id: 'LEC', name: 'Leclerc', color: '#e8002d', r: 13, offset: 0.0  },
  { id: 'PIA', name: 'Piastri', color: '#ff8000', r: 11, offset: 0.5  },
  { id: 'SAI', name: 'Sainz',   color: '#cc0000', r: 11, offset: 1.0  },
  { id: 'NOR', name: 'Norris',  color: '#ff6600', r: 11, offset: 1.5  },
  { id: 'PER', name: 'Perez',   color: '#0067ff', r: 11, offset: 2.0  },
]

// Monaco 2024 — manually traced SVG path (viewBox 0 0 1160 487).
// TRACK_D: all 4 subpaths rendered as the visual circuit.
// MOTION_D: 4th subpath only — near-closed loop the cars animate along.
const TRACK_D = "M812.099 169.095V218.095L792.599 254.595L745.599 259.595L664.099 207.595L578.099 169.095L505.099 118.095L319.599 0.595495L207.599 74.5955L143.099 144.095M25.0991 366.095L53.5991 272.095L70.7241 246.345L87.8491 220.595L122.099 169.095L207.599 74.5955M53.5991 272.095L18.0991 393.095L0.599052 419.095L33.5991 470.095L88.5991 485.595L109.599 460.595L104.599 428.095L88.5991 387.595L122.099 321.095L154.599 313.095L241.599 192.095V169.095L260.599 129.595L305.099 102.595L334.599 96.0955L513.599 218.095L525.099 247.095L555.099 254.595L563.599 247.095L648.599 306.595L861.099 387.595L937.099 375.095L1054.6 313.095L1158.6 218.095C1158.6 213.295 1140.6 192.429 1131.6 182.595L1083.6 159.595V124.595V110.095L1059.6 102.595C1048.8 102.595 908.099 120.595 839.099 129.595L824.599 144.095L812.099 159.595M1036.1 135.095L881.599 153.595L861.099 159.595L848.599 169.095V182.595V218.095L833.099 254.595L812.099 279.595L782.099 291.095L753.599 296.095L726.599 291.095L637.099 228.595L555.099 192.095L453.099 129.595L326.099 36.0955L228.099 96.0955L143.099 192.095L74.0991 313.095L46.0991 413.595L33.5991 428.095L74.0991 449.095L66.0991 419.095V404.595V370.095C68.7657 363.762 74.0991 349.495 74.0991 343.095C74.0991 336.695 81.0991 323.095 84.5991 317.095L109.599 279.595L117.099 272.095H127.099L143.099 279.595L207.599 182.595L203.099 161.095L212.599 135.095L247.099 102.595L285.599 74.5955L326.099 60.0955H346.099L358.099 66.0955L402.099 102.595L446.599 135.095L541.599 201.595L547.599 223.095L563.599 213.095H578.099L614.599 241.095L670.599 279.595L726.599 306.595L775.599 321.095L855.599 351.095H881.599L919.099 343.095L974.599 321.095L1045.1 279.595L1110.6 224.595L1115.1 207.595L1092.1 192.095H1073.1H1059.6V223.095V247.095L1036.1 259.595L1012.1 247.095V228.595L1025.6 207.595V174.595L1036.1 153.595L1045.1 135.095"
const MOTION_D = "M1036.1 135.095L881.599 153.595L861.099 159.595L848.599 169.095V182.595V218.095L833.099 254.595L812.099 279.595L782.099 291.095L753.599 296.095L726.599 291.095L637.099 228.595L555.099 192.095L453.099 129.595L326.099 36.0955L228.099 96.0955L143.099 192.095L74.0991 313.095L46.0991 413.595L33.5991 428.095L74.0991 449.095L66.0991 419.095V404.595V370.095C68.7657 363.762 74.0991 349.495 74.0991 343.095C74.0991 336.695 81.0991 323.095 84.5991 317.095L109.599 279.595L117.099 272.095H127.099L143.099 279.595L207.599 182.595L203.099 161.095L212.599 135.095L247.099 102.595L285.599 74.5955L326.099 60.0955H346.099L358.099 66.0955L402.099 102.595L446.599 135.095L541.599 201.595L547.599 223.095L563.599 213.095H578.099L614.599 241.095L670.599 279.595L726.599 306.595L775.599 321.095L855.599 351.095H881.599L919.099 343.095L974.599 321.095L1045.1 279.595L1110.6 224.595L1115.1 207.595L1092.1 192.095H1073.1H1059.6V223.095V247.095L1036.1 259.595L1012.1 247.095V228.595L1025.6 207.595V174.595L1036.1 153.595L1045.1 135.095"

const LAP_DUR = 8 // all same — Monaco is processional

const GAPS = [
  { base: 1.8, growth: 3.4  }, // PIA
  { base: 2.5, growth: 5.9  }, // SAI
  { base: 3.1, growth: 8.1  }, // NOR
  { base: 4.6, growth: 14.1 }, // PER
]

export default function F1Demo() {
  const [lap,       setLap]       = useState(1)
  const [speed,     setSpeed]     = useState(287)
  const [drsActive, setDrsActive] = useState(false)
  const lecCircleRef = useRef(null)
  const isMobile = useIsMobile(600)
  // Shrink panel/telemetry text ~20% on mobile
  const fs = (n) => (isMobile ? +(n * 0.8).toFixed(1) : n)

  // Lap counter: fires each time LEC's animateMotion completes a lap
  useEffect(() => {
    const circle = lecCircleRef.current
    if (!circle) return
    const anim = circle.querySelector('animateMotion')
    if (!anim) return
    const onRepeat = () => setLap(l => l < 78 ? l + 1 : 1)
    anim.addEventListener('repeatEvent', onRepeat)
    return () => anim.removeEventListener('repeatEvent', onRepeat)
  }, [])

  useEffect(() => {
    const id = setInterval(() => setSpeed(282 + Math.floor(Math.random() * 18)), 1400)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const timeouts = []
    const id = setInterval(() => {
      setDrsActive(true)
      timeouts.push(setTimeout(() => setDrsActive(false), 700))
    }, 3800)
    return () => { clearInterval(id); timeouts.forEach(clearTimeout) }
  }, [])

  const prog      = Math.min((lap - 1) / 77, 1)
  const lecProb   = Math.round(45 + prog * 44)
  const piaProb   = Math.round(35 - prog * 7)
  const perProb   = Math.max(4, Math.round(20 - prog * 16))
  const tire      = lap <= 35 ? 'M' : 'H'
  const tireColor = tire === 'M' ? '#ffd700' : '#e8e8e8'
  const gap2nd    = (1.8 + prog * 3.4).toFixed(1)

  return (
    <div className="f1-demo" style={{
      display:       'flex',
      flexDirection: 'column',
      background:    '#1C1510',
      borderRadius:  7,
      overflow:      'hidden',
      position:      'relative',
      width:         '100%',
      maxWidth:      '100%',
      fontFamily:    '"JetBrains Mono","Fira Code",monospace',
    }}>
      {/* CRT scanline */}
      <div style={{
        position:        'absolute',
        inset:           0,
        backgroundImage: 'repeating-linear-gradient(0deg,rgba(0,0,0,0.04) 0px,rgba(0,0,0,0.04) 1px,transparent 1px,transparent 3px)',
        pointerEvents:   'none',
        zIndex:          10,
      }} />

      {/* Track + leaderboard row */}
      <div className="f1-track-row">

        {/* Monaco SVG — viewBox matches manually traced path coordinate space */}
        <svg
          viewBox="0 0 1160 487"
          preserveAspectRatio="xMidYMid meet"
          width="100%"
          height="auto"
          style={{ flex: '1 1 auto', display: 'block', width: '100%', maxWidth: '100%', minWidth: 0, minHeight: 180 }}
        >
          <defs>
            <path id="monaco-motion" d={MOTION_D} />
            <filter id="car-glow" x="-120%" y="-120%" width="340%" height="340%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <filter id="lec-glow" x="-150%" y="-150%" width="400%" height="400%">
              <feGaussianBlur stdDeviation="9" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <filter id="track-glow" x="-15%" y="-15%" width="130%" height="130%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feFlood floodColor="rgb(196,98,45)" floodOpacity="0.55" result="color" />
              <feComposite in="color" in2="blur" operator="in" result="glow" />
              <feMerge><feMergeNode in="glow" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* Track: warm glow halo → glowing white main line → amber accent dashes */}
          <path d={MOTION_D} fill="none" stroke="rgba(196,98,45,0.14)" strokeWidth="28" strokeLinejoin="round" strokeLinecap="round" />
          <path d={MOTION_D} fill="none" stroke="rgba(255,255,255,0.82)" strokeWidth="5.5" strokeLinejoin="round" strokeLinecap="round" filter="url(#track-glow)" />
          <path d={MOTION_D} fill="none" stroke="rgba(196,98,45,0.44)"  strokeWidth="2"   strokeLinejoin="round" strokeLinecap="round" strokeDasharray="22 88" />

          {/* Finish line — checkered stripe at MOTION_D start/end (Monaco pit straight) */}
          <line x1="1026" y1="137" x2="1056" y2="151" stroke="rgba(240,235,225,0.95)" strokeWidth="7" strokeLinecap="square" />
          <line x1="1026" y1="137" x2="1056" y2="151" stroke="#1C1510" strokeWidth="7" strokeLinecap="square" strokeDasharray="5 5" strokeDashoffset="5" />
          <text x="1062" y="148" fontSize="9" fill="rgba(255,255,255,0.58)" fontFamily="monospace">S/F</text>

          {/* Corner labels */}
          <text x="840"  y="200" fontSize="10" fill="rgba(196,98,45,0.52)" fontFamily="monospace">S.D.</text>
          <text x="280"  y="22"  fontSize="10" fill="rgba(196,98,45,0.52)" fontFamily="monospace">CASINO</text>
          <text x="10"   y="436" fontSize="10" fill="rgba(196,98,45,0.52)" fontFamily="monospace">LOEWS</text>
          <text x="38"   y="372" fontSize="10" fill="rgba(196,98,45,0.52)" fontFamily="monospace">TUNNEL</text>
          <text x="718"  y="325" fontSize="10" fill="rgba(196,98,45,0.52)" fontFamily="monospace">PISCINE</text>

          {/* Circuit label */}
          <text x="580" y="478" fontSize="12" fill="rgba(196,98,45,0.38)" textAnchor="middle" letterSpacing="4" fontFamily="monospace">MONACO 2024</text>

          {/* Non-LEC cars (lower z-order) */}
          {DRIVERS.slice(1).reverse().map(d => (
            <circle key={d.id} r={d.r} fill={d.color} filter="url(#car-glow)">
              <animateMotion dur={`${LAP_DUR}s`} begin={`-${d.offset}s`} repeatCount="indefinite">
                <mpath href="#monaco-motion" />
              </animateMotion>
            </circle>
          ))}
          {/* LEC rendered last (on top) — ref drives the lap counter via repeatEvent */}
          <circle ref={lecCircleRef} r={DRIVERS[0].r} fill={DRIVERS[0].color} filter="url(#lec-glow)">
            <animateMotion dur={`${LAP_DUR}s`} begin="0s" repeatCount="indefinite">
              <mpath href="#monaco-motion" />
            </animateMotion>
          </circle>
        </svg>

        {/* Right panel */}
        <div className="f1-stats-panel" style={{
          padding:       '8px 8px 6px',
          display:       'flex',
          flexDirection: 'column',
          gap:           3,
          zIndex:        2,
          color:         '#c8b89a',
          fontSize:      fs(8),
        }}>
          {/* Header */}
          <div style={{ color: '#C4622D', fontSize: fs(7.5), fontWeight: 700, letterSpacing: 1.5, lineHeight: 1 }}>
            MONACO GP 2024
          </div>

          {/* Lap counter */}
          <div style={{ lineHeight: 1, marginBottom: 1 }}>
            <span style={{ fontSize: fs(11), fontWeight: 700, color: '#e8c89a' }}>LAP </span>
            <span style={{ fontSize: fs(11), fontWeight: 700, color: '#C4622D' }}>{String(lap).padStart(2, '0')}</span>
            <span style={{ fontSize: fs(7), color: 'rgba(196,98,45,0.4)' }}>/78</span>
          </div>

          {/* Standings */}
          <div style={{ color: 'rgba(196,98,45,0.32)', fontSize: fs(6), letterSpacing: 1, marginBottom: 1 }}>── STANDINGS ──</div>
          {DRIVERS.map((d, i) => (
            <div key={d.id} style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <span style={{ color: 'rgba(196,98,45,0.38)', width: 8, textAlign: 'right', flexShrink: 0 }}>{i + 1}</span>
              <div style={{
                width: i === 0 ? 7 : 5, height: i === 0 ? 7 : 5, borderRadius: '50%',
                background: d.color, boxShadow: `0 0 ${i === 0 ? 7 : 4}px ${d.color}`,
                flexShrink: 0,
              }} />
              <span style={{ fontSize: fs(7.5), flex: 1 }}>{d.id}</span>
              {i === 0
                ? <span style={{ fontSize: fs(6), color: '#C4622D', background: 'rgba(196,98,45,0.15)', padding: '1px 3px', borderRadius: 2 }}>P1</span>
                : <span style={{ fontSize: fs(6), color: 'rgba(196,98,45,0.42)' }}>+{(GAPS[i-1].base + prog * GAPS[i-1].growth).toFixed(1)}s</span>
              }
            </div>
          ))}

          {/* Win probability bars */}
          <div style={{ borderTop: '1px solid rgba(196,98,45,0.1)', paddingTop: 4, marginTop: 2 }}>
            <div style={{ color: 'rgba(196,98,45,0.32)', fontSize: fs(6), letterSpacing: 1, marginBottom: 3 }}>WIN PROB</div>
            {[
              { id: 'LEC', color: '#e8002d', prob: lecProb  },
              { id: 'PIA', color: '#ff8000', prob: piaProb  },
              { id: 'PER', color: '#0067ff', prob: perProb  },
            ].map(({ id, color, prob }) => (
              <div key={id} style={{ marginBottom: 3 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                  <span style={{ fontSize: fs(6.5) }}>{id}</span>
                  <span style={{ fontSize: fs(6.5), color }}>{prob}%</span>
                </div>
                <div style={{ height: 3, background: 'rgba(255,255,255,0.06)', borderRadius: 2, overflow: 'hidden' }}>
                  <div style={{
                    height: '100%', width: `${prob}%`, background: color,
                    borderRadius: 2, transition: 'width 1.6s ease',
                    boxShadow: `0 0 4px ${color}55`,
                  }} />
                </div>
              </div>
            ))}
          </div>

          {/* Model accuracy */}
          <div style={{ borderTop: '1px solid rgba(196,98,45,0.1)', paddingTop: 4, marginTop: 1 }}>
            <div style={{ color: 'rgba(196,98,45,0.32)', fontSize: fs(6), letterSpacing: 1, marginBottom: 3 }}>MODEL PREDICTED</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 3, marginBottom: 2 }}>
              <span style={{ color: '#00c96b', fontSize: fs(10), lineHeight: 1 }}>✓</span>
              <span style={{ color: '#00c96b', fontSize: fs(7.5) }}>LEC WIN</span>
            </div>
            <div style={{ color: '#C4622D', fontSize: fs(8), fontWeight: 700, marginBottom: 1 }}>94.2% confidence</div>
            <div style={{ color: 'rgba(196,98,45,0.32)', fontSize: fs(6) }}>Pre-race prediction</div>
          </div>
        </div>
      </div>

      {/* Telemetry bar */}
      <div style={{
        display:    'flex',
        alignItems: 'center',
        flexWrap:   'wrap',
        gap:        8,
        padding:    '4px 10px',
        borderTop:  '1px solid rgba(196,98,45,0.12)',
        background: '#160f0b',
        fontSize:   fs(7.5),
        color:      '#c8b89a',
        zIndex:     2,
      }}>
        <span><span style={{ color: 'rgba(196,98,45,0.42)', marginRight: 3 }}>LEAD</span><span style={{ color: '#e8002d', fontWeight: 700 }}>LEC</span></span>
        <span style={{ color: 'rgba(196,98,45,0.2)' }}>│</span>
        <span><span style={{ color: 'rgba(196,98,45,0.42)', marginRight: 3 }}>KM/H</span>{speed}</span>
        <span style={{ color: 'rgba(196,98,45,0.2)' }}>│</span>
        <span><span style={{ color: 'rgba(196,98,45,0.42)', marginRight: 3 }}>GAP</span>+{gap2nd}s</span>
        <span style={{ color: 'rgba(196,98,45,0.2)' }}>│</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: tireColor, boxShadow: `0 0 4px ${tireColor}`, display: 'inline-block' }} />
          <span style={{ color: 'rgba(196,98,45,0.42)' }}>{tire}</span>
        </span>
        <span style={{ color: 'rgba(196,98,45,0.2)' }}>│</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <span style={{
            width: 5, height: 5, borderRadius: '50%', display: 'inline-block',
            background:  drsActive ? '#00ff88' : 'rgba(0,255,136,0.18)',
            boxShadow:   drsActive ? '0 0 6px #00ff88' : 'none',
            transition:  'all 0.2s',
          }} />
          <span style={{ color: drsActive ? '#00ff88' : 'rgba(196,98,45,0.38)', transition: 'color 0.2s' }}>DRS</span>
        </span>
        <span style={{ marginLeft: 'auto', color: 'rgba(196,98,45,0.22)', fontSize: fs(6.5) }}>● LIVE SIM</span>
      </div>
    </div>
  )
}
