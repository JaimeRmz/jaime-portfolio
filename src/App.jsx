import { useState, useRef, useEffect } from 'react'
import CursorTrail from './components/CursorTrail'
import Skills from './windows/Skills'
import Projects from './windows/Projects'
import pfp1 from './assets/pfp1.jpeg'
import pfp2 from './assets/pfp2.jpeg'

const TECH = [
  { name: 'React', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'Python', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'FastAPI', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg' },
  { name: 'JavaScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { name: 'Java', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
  { name: 'SQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
  { name: 'D3.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/d3js/d3js-original.svg' },
  { name: 'XGBoost', logo: 'https://upload.wikimedia.org/wikipedia/commons/6/69/XGBoost_logo.png' },
  { name: 'AWS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg' },
  { name: 'Tailwind', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
  { name: 'Framer Motion', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/framermotion/framermotion-original.svg' },
  { name: 'Vite', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg' },
]

// Infinite auto-scrolling tech stack strip (now in the page flow)
function TechMarquee() {
  return (
    <div className="tech-marquee" style={{
      position: 'relative',
      width: '100%',
      height: 80,
      overflow: 'hidden',
      background: 'transparent',
    }}>
      <div className="tech-marquee-track" style={{
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        width: 'max-content',
      }}>
        {[...TECH, ...TECH].map((t, i) => (
          <span key={i} className="tech-marquee-item" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            fontFamily: "'JetBrains Mono', monospace",
            color: 'var(--text-dim)',
            padding: '0 16px',
            transition: 'color 0.2s ease',
          }}>
            <img src={t.logo} alt={t.name} style={{ width: 48, height: 48, objectFit: 'contain' }} />
            <span>{t.name}</span>
          </span>
        ))}
      </div>
    </div>
  )
}

function Pill({ href, children }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="pill" style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      fontSize: 11,
      padding: '6px 13px',
      borderRadius: 999,
      border: '0.5px solid var(--border)',
      color: 'var(--text-dim)',
      textDecoration: 'none',
      transition: 'color 0.2s ease, border-color 0.2s ease',
    }}>
      {children}
    </a>
  )
}

function SectionHeader({ kicker, title }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{
        fontSize: 11,
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        color: 'var(--text-dim)',
      }}>
        {kicker}
      </div>
      <div style={{
        fontSize: 32,
        fontWeight: 500,
        color: 'var(--text)',
        marginTop: 4,
      }}>
        {title}
      </div>
    </div>
  )
}

const SOCIALS = (
  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
    <Pill href="https://github.com/JaimeRmz">GitHub</Pill>
    <Pill href="https://www.linkedin.com/in/jaimenramirez/">LinkedIn</Pill>
    <Pill href="mailto:jaimenramirez04@gmail.com">Email</Pill>
  </div>
)

const INPUT = {
  background: 'var(--base-alt)',
  border: '0.5px solid var(--border)',
  borderRadius: 6,
  padding: '10px 14px',
  fontFamily: "'JetBrains Mono', monospace",
  fontSize: 12,
  color: 'var(--text)',
  width: '100%',
  outline: 'none',
}

function TermLine({ cmd, out }) {
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'baseline' }}>
      <span style={{ color: 'var(--text-dim)' }}>{cmd}</span>
      <span style={{ color: 'var(--accent)' }}>→</span>
      <span style={{ color: 'var(--text)' }}>{out}</span>
    </div>
  )
}

export default function App() {
  const [pfp, setPfp] = useState(pfp1)
  const dotGridRef = useRef(null)

  useEffect(() => {
    const timer = setTimeout(() => setPfp(pfp2), 4000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const pending = { x: 0, y: 0 }
    let rafId = null

    const handleMouseMove = (e) => {
      const cx = window.innerWidth / 2
      const cy = window.innerHeight / 2
      pending.x = ((e.clientX - cx) / cx) * 18 * 0.02 * 100
      pending.y = ((e.clientY - cy) / cy) * 18 * 0.02 * 100

      if (rafId) return
      rafId = requestAnimationFrame(() => {
        if (dotGridRef.current) {
          dotGridRef.current.style.backgroundPosition = `${pending.x}px ${pending.y}px`
        }
        rafId = null
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div style={{
      background: 'var(--base)',
      minHeight: '100vh',
      position: 'relative',
      overflowX: 'hidden',
      overflowY: 'auto',
      WebkitOverflowScrolling: 'touch',
      touchAction: 'pan-y',
    }}>
      <CursorTrail />
      <div
        ref={dotGridRef}
        style={{
          position: 'absolute',
          inset: '-40px',
          backgroundImage: 'radial-gradient(circle, rgba(196,98,45,0.18) 1px, transparent 1px)',
          backgroundSize: '18px 18px',
          pointerEvents: 'none',
        }}
      />
      <style>{`
        html { scroll-behavior: smooth; }
        @keyframes tech-marquee-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .tech-marquee-track { animation: tech-marquee-scroll 30s linear infinite; }
        .tech-marquee:hover .tech-marquee-track { animation-play-state: paused; }
        .tech-marquee-item { font-size: 13px; }
        .tech-marquee-item:hover { color: var(--accent); }
        .pill:hover { color: var(--accent); border-color: var(--accent); }
        .page { max-width: 1200px; margin: 0 auto; padding: 0 60px; }
        .hero-grid, .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          align-items: center;
        }
        .hero-name { font-size: 56px; }
        .section-hero { padding: 96px 0 20px; }
        .section-marquee { margin: 60px 0; }
        .section-contact { margin-top: 90px; }
        .send-btn:hover { opacity: 0.9; }
        @media (max-width: 768px) {
          .page { padding: 0 16px; }
          .hero-grid, .contact-grid { grid-template-columns: 1fr; gap: 32px; }
          .hero-name { font-size: 36px; }
          .tech-marquee-item { font-size: 11px; }
          .section-hero { padding: 48px 0 8px; }
          .section-marquee { margin: 40px 0; }
          .section-contact { margin-top: 48px; }
        }
      `}</style>

      <div style={{ position: 'relative', zIndex: 1 }}>
            <div className="page">

              {/* SECTION 1 — HERO */}
              <section className="hero-grid section-hero">
                <div>
                  <div style={{ position: 'relative', width: 80, height: 80, marginBottom: 16 }}>
                    <div style={{
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      overflow: 'hidden',
                      border: '2px solid rgba(196,98,45,0.3)',
                    }}>
                      <img
                        src={pfp}
                        alt="Jaime Ramirez"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          objectPosition: pfp === pfp2 ? '38% 18%' : 'center top',
                          transform: pfp === pfp2 ? 'scale(1.5)' : 'none',
                        }}
                      />
                    </div>
                    <span style={{
                      position: 'absolute',
                      bottom: 2,
                      right: 2,
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      background: '#22c55e',
                      border: '2px solid var(--base)',
                    }} />
                  </div>
                  <div style={{ fontSize: 14, color: 'var(--text-dim)' }}>hi, i'm</div>
                  <h1 className="hero-name" style={{
                    fontWeight: 500,
                    letterSpacing: '-1px',
                    color: 'var(--text)',
                    lineHeight: 1.05,
                    marginTop: 4,
                  }}>
                    Jaime Ramirez
                  </h1>
                  <div style={{ fontSize: 14, color: 'var(--accent)', marginTop: 8 }}>
                    CS student · full-stack dev · GK academy founder
                  </div>
                  <p style={{
                    fontSize: 13,
                    color: 'var(--text-mid)',
                    lineHeight: 1.8,
                    marginTop: 16,
                    maxWidth: 420,
                  }}>
                    Computer Science student at University of Houston Clear Lake specializing
                    in full-stack development and machine learning. AWS Cloud Practitioner
                    certified. Founder of JRGK Performance — a multi-location goalkeeper
                    training academy operating across Houston, Katy, Pasadena, and the Med
                    Center with 50+ athletes.
                  </p>
                  <div style={{ marginTop: 24 }}>{SOCIALS}</div>
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 7,
                    fontSize: 11,
                    color: 'var(--accent)',
                    marginTop: 16,
                  }}>
                    <span style={{
                      width: 7, height: 7, borderRadius: '50%',
                      background: '#28c840',
                      boxShadow: '0 0 6px rgba(40,200,64,0.6)',
                    }} />
                    open to internships
                  </div>
                </div>

                <div style={{
                  border: '0.5px solid var(--border)',
                  borderRadius: 12,
                  padding: 24,
                  background: 'var(--glass)',
                }}>
                  <Skills />
                </div>
              </section>

              {/* SECTION 2 — TECH MARQUEE */}
              <div className="section-marquee">
                <TechMarquee />
              </div>

              {/* SECTION 3 — PROJECTS */}
              <section>
                <SectionHeader kicker="projects" title="My Work" />
                <div style={{ maxWidth: 800, margin: '0 auto' }}>
                  <Projects />
                </div>
              </section>

              {/* SECTION 4 — CONTACT */}
              <section className="section-contact">
                <SectionHeader kicker="contact" title="Get in Touch" />
                <div className="contact-grid" style={{ alignItems: 'start' }}>
                  <div>
                    <div style={{ fontSize: 28, color: 'var(--text)', fontWeight: 500 }}>
                      Let's build something.
                    </div>
                    <p style={{ fontSize: 13, color: 'var(--text-mid)', marginTop: 10, lineHeight: 1.7 }}>
                      CS student open to internships, research opportunities, and interesting
                      problems in ML and full-stack development.
                    </p>
                    <div style={{
                      marginTop: 20,
                      background: 'var(--base-alt)',
                      border: '0.5px solid var(--border)',
                      borderRadius: 6,
                      padding: 14,
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 12,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 8,
                    }}>
                      <TermLine cmd="$ echo $EMAIL" out="jaimenramirez04@gmail.com" />
                      <TermLine cmd="$ git remote -v" out="github.com/JaimeRmz" />
                      <TermLine cmd="$ open --location" out="Houston, TX" />
                    </div>
                    <div style={{ marginTop: 20 }}>{SOCIALS}</div>
                  </div>

                  <form
                    onSubmit={(e) => e.preventDefault()}
                    style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
                  >
                    <input type="text" placeholder="Name" style={INPUT} />
                    <input type="email" placeholder="Email" style={INPUT} />
                    <textarea placeholder="Message" rows={5} style={{ ...INPUT, resize: 'vertical' }} />
                    <button type="submit" className="send-btn" style={{
                      background: 'var(--accent)',
                      color: '#fff',
                      border: 'none',
                      padding: '10px 20px',
                      borderRadius: 6,
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 12,
                      cursor: 'pointer',
                      alignSelf: 'flex-start',
                      transition: 'opacity 0.2s ease',
                    }}>
                      Send
                    </button>
                  </form>
                </div>
              </section>

              {/* FOOTER */}
              <footer style={{ textAlign: 'center', padding: '40px 0' }}>
                <div style={{
                  fontSize: 11,
                  color: 'var(--text-dim)',
                  fontFamily: "'JetBrains Mono', monospace",
                }}>
                  jaime.dev
                </div>
                <div style={{
                  fontSize: 10,
                  color: 'var(--text-dim)',
                  marginTop: 6,
                  fontFamily: "'JetBrains Mono', monospace",
                }}>
                  built with React, Vite, Framer Motion & D3.js
                </div>
              </footer>

            </div>
          </div>
    </div>
  )
}
