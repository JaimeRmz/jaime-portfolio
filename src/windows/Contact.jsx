const LINES = [
  { cmd: '$ echo $EMAIL',     val: 'jaime@jrgkperformance.com', color: 'var(--text)' },
  { cmd: '$ git remote -v',   val: 'github.com/JaimeRmz',       color: 'var(--accent)' },
  { cmd: '$ open --location', val: 'Houston, TX',               color: 'var(--text-mid)' },
]

export default function Contact() {
  return (
    <div>
      {LINES.map(l => (
        <div key={l.cmd} style={{ marginBottom: 10 }}>
          <div style={{ fontSize: 9, color: 'var(--text-dim)', marginBottom: 2 }}>{l.cmd}</div>
          <div style={{ fontSize: 11, color: l.color }}>{l.val}</div>
        </div>
      ))}
      <div style={{ height: '0.5px', background: 'var(--border)', margin: '8px 0' }} />
      <div style={{ fontSize: 9, color: 'var(--text-dim)', marginBottom: 6 }}>$ open --socials</div>
      <div style={{ display: 'flex', gap: 5 }}>
        {['LinkedIn', 'GitHub', 'Resume'].map(s => (
          <span key={s} style={{
            fontSize: 8, padding: '3px 8px', borderRadius: 4,
            border: '0.5px solid var(--border)',
            color: 'var(--text-mid)', cursor: 'pointer',
          }}>{s}</span>
        ))}
      </div>
    </div>
  )
}