export default function Taskbar() {
  const items = ['desktop', 'about', 'projects', 'skills', 'contact']

  return (
    <div style={{
      position: 'fixed',
      bottom: 0, left: 0, right: 0,
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      padding: '7px 14px',
      background: 'var(--base-alt)',
      borderTop: '0.5px solid var(--border)',
    }}>
      {items.map((item, i) => (
        <span key={item} style={{
          fontSize: 9,
          padding: '3px 9px',
          borderRadius: 4,
          border: '0.5px solid var(--border)',
          color: i === 0 ? 'var(--accent)' : 'var(--text-dim)',
          background: i === 0 ? 'rgba(196,98,45,0.08)' : 'transparent',
          cursor: 'pointer',
        }}>
          {item}
        </span>
      ))}
      <span style={{ marginLeft: 'auto', fontSize: 9, color: 'var(--text-dim)' }}>
        {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </span>
    </div>
  )
}