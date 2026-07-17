import { motion, useDragControls } from 'framer-motion'
import { useIsMobile } from '../hooks/useIsMobile'

const SHADOW_RESTING = '0 2px 16px rgba(196,98,45,0.08)'
const SHADOW_LIFTED  = '0 12px 40px rgba(196,98,45,0.18), 0 4px 12px rgba(0,0,0,0.08)'

export default function Window({ title, children }) {
  const dragControls = useDragControls()
  const isMobile = useIsMobile()

  return (
    <motion.div
      drag={isMobile ? false : true}
      dragControls={dragControls}
      dragMomentum={false}
      initial={{ opacity: 0, scale: 0.96, y: 6, boxShadow: SHADOW_RESTING }}
      animate={{ opacity: 1, scale: 1, y: 0, boxShadow: SHADOW_RESTING }}
      whileDrag={{ boxShadow: SHADOW_LIFTED, cursor: 'grabbing', rotate: 1.5 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      style={{
        borderRadius: '11px',
        overflow: 'hidden',
        border: '0.5px solid var(--border)',
        background: 'var(--glass)',
        cursor: isMobile ? 'default' : 'grab',
        userSelect: 'none',
      }}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
        padding: '7px 12px',
        background: 'var(--base-alt)',
        borderBottom: '0.5px solid var(--border)',
      }}>
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f57' }} />
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#febc2e' }} />
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#28c840' }} />
        <span style={{ marginLeft: 8, fontSize: 10, color: 'var(--text-dim)' }}>{title}</span>
      </div>
      <div style={{ padding: '13px 15px' }}>
        {children}
      </div>
    </motion.div>
  )
}