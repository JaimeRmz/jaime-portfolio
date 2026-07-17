import { useState } from 'react'
import F1Demo from './F1Demo'

const TAG = {
  fontSize: 8, padding: '1px 6px', borderRadius: 3,
  border: '0.5px solid rgba(196,98,45,0.3)',
  color: 'var(--accent)', background: 'rgba(196,98,45,0.07)',
}

const TAG_DIM = {
  ...TAG,
  border: '0.5px solid rgba(196,98,45,0.15)',
  color: 'var(--text-dim)', background: 'rgba(196,98,45,0.04)',
}

const DESC = {
  fontSize: 9,
  color: 'var(--text-mid)',
  lineHeight: 1.65,
  marginBottom: 6,
}

const LAUNCH = {
  fontSize: 9, padding: '2px 8px', borderRadius: 4,
  border: '0.5px solid rgba(196,98,45,0.35)',
  color: 'var(--accent)', background: 'transparent', cursor: 'pointer',
  flexShrink: 0,
}

const DOT = { width: 10, height: 10, borderRadius: '50%' }

// Each project card framed as an OS window with a macOS title bar
function ProjectWindow({ title, dim, children }) {
  return (
    <div style={{
      borderRadius: 11,
      overflow: 'hidden',
      border: dim ? '0.5px solid rgba(196,98,45,0.12)' : '0.5px solid var(--border)',
      background: 'var(--glass)',
      opacity: dim ? 0.78 : 1,
      boxShadow: '0 2px 16px rgba(196,98,45,0.08)',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 5,
        padding: '7px 12px',
        background: 'var(--base-alt)',
        borderBottom: '0.5px solid var(--border)',
      }}>
        <div style={{ ...DOT, background: '#ff5f57' }} />
        <div style={{ ...DOT, background: '#febc2e' }} />
        <div style={{ ...DOT, background: '#28c840' }} />
        <span style={{ marginLeft: 8, fontSize: 10, color: 'var(--text-dim)' }}>{title}</span>
      </div>
      <div style={{ padding: '13px 15px' }}>
        {children}
      </div>
    </div>
  )
}

// Browser-window mockup framing a project screenshot / placeholder
function BrowserMock({ url, screen, children }) {
  return (
    <div style={{
      borderRadius: 6,
      border: '0.5px solid var(--border)',
      overflow: 'hidden',
      marginBottom: 8,
      boxShadow: '0 2px 10px rgba(196,98,45,0.1)',
    }}>
      <div style={{
        height: 20,
        display: 'flex',
        alignItems: 'center',
        gap: 4,
        padding: '0 8px',
        background: 'var(--base-alt)',
        borderBottom: '0.5px solid var(--border)',
      }}>
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#ff5f57' }} />
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#febc2e' }} />
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#28c840' }} />
        <span style={{ marginLeft: 6, fontSize: 8, color: 'var(--text-dim)' }}>{url}</span>
      </div>
      <div style={{
        height: 180,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...screen,
      }}>
        {children}
      </div>
    </div>
  )
}

// Live website screenshot (Microlink) with a pulsing skeleton until it loads
function LivePreview({ src }) {
  const [loaded, setLoaded] = useState(false)
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <style>{`
        @keyframes preview-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        .preview-skeleton { animation: preview-pulse 1.4s ease-in-out infinite; }
      `}</style>
      {!loaded && (
        <div className="preview-skeleton" style={{
          position: 'absolute',
          inset: 0,
          background: 'var(--base-alt)',
          borderRadius: '0 0 6px 6px',
        }} />
      )}
      <img
        src={src}
        alt="Project preview"
        onLoad={() => setLoaded(true)}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'top',
          borderRadius: '0 0 6px 6px',
          display: 'block',
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.4s ease',
        }}
      />
    </div>
  )
}

export default function Projects() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

      {/* 1 — F1 Race Predictor: live animation preserved */}
      <ProjectWindow title="f1-race.exe">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text)' }}>
            Formula 1 Race Predictor
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0, marginLeft: 8 }}>
            <span style={{ fontSize: 9, color: 'var(--accent)' }}>ROC-AUC 0.960</span>
            <button
              style={LAUNCH}
              onClick={() => window.open('https://f1predictor.app', '_blank')}
            >
              launch ↗
            </button>
          </div>
        </div>
        <div style={{ fontSize: 9, color: 'var(--text-dim)', marginBottom: 5 }}>
          XGBoost · FastAPI · React · Vite · Python
        </div>
        <div style={DESC}>
          Three-model XGBoost pipeline predicting Formula 1 race outcomes — qualifying
          position regressor, race winner classifier, and podium classifier. Features a
          live Monaco GP 2024 visualization with real-time standings and win probability
          bars. Winner classifier achieved ROC-AUC 0.960, podium classifier ROC-AUC 0.942.
        </div>
        <div style={{ display: 'flex', gap: 3, marginBottom: 8 }}>
          {['XGBoost', 'FastAPI', 'React', 'Python', 'ML'].map(t => (
            <span key={t} style={TAG}>{t}</span>
          ))}
        </div>
        <F1Demo />
      </ProjectWindow>

      {/* 2 — AI Recruiting Platform: coming soon */}
      <ProjectWindow title="ai-recruiting.exe" dim>
        <BrowserMock url="recruiting-fit-engine.vercel.app" screen={{ padding: 0 }}>
          <LivePreview src="https://api.microlink.io/?url=https://recruiting-fit-engine.vercel.app&screenshot=true&meta=false&embed=screenshot.url" />
        </BrowserMock>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text)' }}>
            AI Recruiting Platform
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0, marginLeft: 8 }}>
            <span style={{
              fontSize: 8, padding: '1px 6px', borderRadius: 3,
              border: '0.5px solid rgba(196,98,45,0.2)',
              color: 'var(--text-dim)', background: 'rgba(196,98,45,0.06)',
            }}>
              In Development
            </span>
            <button
              style={LAUNCH}
              onClick={() => window.open('https://recruiting-fit-engine.vercel.app/', '_blank')}
            >
              launch ↗
            </button>
          </div>
        </div>
        <div style={{ ...DESC, marginBottom: 7 }}>
          Machine learning platform built to close the recruiting gap for underserved youth
          soccer athletes. Features a nearest-neighbor Fit-Match comparator across real NCAA
          roster data from 43 schools, and a CV-powered Moment-Finder pipeline that identifies
          standout plays from highlight footage using PySceneDetect and OpenCV.
        </div>
        <div style={{ display: 'flex', gap: 3 }}>
          {['Python', 'FastAPI', 'React', 'XGBoost', 'OpenCV', 'ML'].map(t => (
            <span key={t} style={TAG_DIM}>{t}</span>
          ))}
        </div>
      </ProjectWindow>

      {/* 3 — JRGK GK Platform */}
      <ProjectWindow title="jrgk.exe">
        <BrowserMock url="jrgkp.com" screen={{ padding: 0 }}>
          <LivePreview src="https://api.microlink.io/?url=https://jrgkp.com&screenshot=true&meta=false&embed=screenshot.url" />
        </BrowserMock>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text)' }}>
            JRGK GK Platform
          </div>
          <button
            style={LAUNCH}
            onClick={() => window.open('https://jrgkp.com', '_blank')}
          >
            launch ↗
          </button>
        </div>
        <div style={{ fontSize: 9, color: 'var(--text-dim)', marginBottom: 5 }}>
          React · Square API · Vite
        </div>
        <div style={DESC}>
          Full-stack operations platform for JRGK Performance, a multi-location goalkeeper
          training academy with 50+ athletes across Houston, Katy, Pasadena, and the Med
          Center. Manages athlete rosters, session scheduling, and recurring payments via
          Square API across four locations.
        </div>
        <div style={{ display: 'flex', gap: 3 }}>
          {['React', 'Square API', 'Vite', 'Full-stack'].map(t => (
            <span key={t} style={TAG}>{t}</span>
          ))}
        </div>
      </ProjectWindow>

    </div>
  )
}
