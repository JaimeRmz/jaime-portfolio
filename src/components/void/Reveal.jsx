import useInViewOnce from '../../hooks/useInViewOnce'

/**
 * Scroll reveal wrapper. Adds `is-visible` once, the CSS does the rest.
 *
 *   variant="rise"     — fade + lift + slight scale (project rows, panels)
 *   variant="brighten" — text goes --ash-dim → --ink (bio, descriptions)
 *
 * Renders as any element via `as` so it doesn't add wrapper divs to text.
 */
export default function Reveal({
  as: Tag = 'div',
  variant = 'rise',
  threshold,
  rootMargin,
  delay = 0,
  className = '',
  style,
  children,
  ...rest
}) {
  const [ref, inView] = useInViewOnce({ threshold, rootMargin })

  const classes = [
    `v-reveal--${variant}`,
    inView ? 'is-visible' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <Tag
      ref={ref}
      className={classes}
      style={delay ? { ...style, transitionDelay: `${delay}ms` } : style}
      {...rest}
    >
      {children}
    </Tag>
  )
}
