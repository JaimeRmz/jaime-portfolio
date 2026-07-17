export default function About() {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
        <div style={{
          width: 40, height: 40, borderRadius: '50%',
          background: 'var(--base)', border: '0.5px solid var(--border)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 13, fontWeight: 600, color: 'var(--accent)',
        }}>JR</div>
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text)' }}>Jaime Ramirez</div>
          <div style={{ fontSize: 9, color: 'var(--text-dim)', marginTop: 1 }}>CS @ University of Houston Clear Lake</div>
        </div>
      </div>

      <div style={{ fontSize: 10, color: 'var(--text-mid)', lineHeight: 1.75, marginBottom: 8 }}>
        Hi I'm Jaime Ramirez, a Computer Science student at the University of Houston
        Clear Lake with a focus on full-stack development and machine learning. I build
        with React, Python, Java, JavaScript, and CSS, I enjoy and have hands-on
        experience training and deploying ML models.
      </div>

      <div style={{ fontSize: 10, color: 'var(--text-mid)', lineHeight: 1.75, marginBottom: 8 }}>
        AWS Cloud Practitioner certified and comfortable across the full stack from
        REST APIs to animated frontends.
      </div>

      <div style={{ fontSize: 10, color: 'var(--text-mid)', lineHeight: 1.75, marginBottom: 9 }}>
        Also founder of JRGK Performance, a multi-location goalkeeper training academy
        operating across Houston, Katy, and Pasadena, with over 50+ athletes. My
        background as a former athlete gave me a unique perspective on the barriers
        underserved players face in gaining recruiting exposure, and it's what drives
        my work/projects in building software that creates real opportunities for
        deserving athletes at every level.
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
        <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--accent)', display: 'inline-block' }} />
        <span style={{ fontSize: 9, color: 'var(--accent)' }}>open to internships</span>
      </div>
    </div>
  )
}
