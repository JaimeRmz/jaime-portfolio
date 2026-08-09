/**
 * Translucent blurred-glass panel with a hairline border.
 * Shared by the project rows and the contact terminal block.
 */
export default function TerminalPanel({ as: Tag = 'div', className = '', children, ...rest }) {
  return (
    <Tag className={`v-panel ${className}`.trim()} {...rest}>
      {children}
    </Tag>
  )
}
