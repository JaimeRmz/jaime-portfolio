import { useEffect, useState } from 'react'

/**
 * Media slot for a project row. Five shapes, picked by `media.type`:
 *
 *   'custom'       — renders the component passed as media.component
 *                    (MacroSetDemo, F1Demo). Sizes itself; no forced ratio.
 *   'live-preview' — Microlink screenshot of a live site, with a pulsing
 *                    skeleton that cross-fades out on load.
 *   'carousel'     — auto-advancing cross-fade through media.slides, each
 *                    { src } for a local asset or { url } for a Microlink shot.
 *   'image'        — a static asset from src/assets/projects/.
 *   undefined/null — labelled placeholder.
 *
 * Falls back to the placeholder if a remote screenshot errors, so a
 * Microlink outage degrades to a label instead of a broken image icon.
 */

/** Build the Microlink screenshot endpoint for a site URL. */
function microlinkUrl(siteUrl) {
  return `https://api.microlink.io/?url=${siteUrl}&screenshot=true&meta=false&embed=screenshot.url`
}

function LivePreview({ url, alt, label }) {
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)

  if (failed) return <Placeholder label={label} />

  return (
    <>
      {!loaded && <div className="v-media-skeleton" aria-hidden="true" />}
      <img
        className={`v-media-shot ${loaded ? 'is-loaded' : ''}`.trim()}
        src={microlinkUrl(url)}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
      />
    </>
  )
}

function Carousel({ slides, interval = 4000, alt, label }) {
  const [active, setActive] = useState(0)
  const [failed, setFailed] = useState(() => new Set())

  // A slide whose image errors (e.g. Microlink outage) is dropped from the loop.
  const visible = slides.map((slide, i) => ({ slide, i })).filter(({ i }) => !failed.has(i))

  useEffect(() => {
    if (visible.length < 2) return undefined
    const id = setInterval(() => setActive((a) => a + 1), interval)
    return () => clearInterval(id)
  }, [visible.length, interval])

  if (visible.length === 0) return <Placeholder label={label} />

  const current = active % visible.length

  return (
    <>
      {visible.map(({ slide, i }, pos) => (
        <img
          key={i}
          className={`v-media-slide ${pos === current ? 'is-active' : ''}`.trim()}
          src={slide.src || microlinkUrl(slide.url)}
          alt={pos === current ? alt : ''}
          aria-hidden={pos === current ? undefined : true}
          decoding="async"
          onError={() => setFailed((prev) => new Set(prev).add(i))}
        />
      ))}
    </>
  )
}

function Placeholder({ label }) {
  return (
    <div className="v-media-placeholder">
      <span className="v-media-icon" aria-hidden="true">
        ▣
      </span>
      <span className="v-media-label">{label || 'Screenshot pending'}</span>
      <span className="v-media-hint">set media.src or media.url in data/projects.js</span>
    </div>
  )
}

export default function ProjectMedia({ media, accent }) {
  const [imgFailed, setImgFailed] = useState(false)
  const type = media?.type

  const style = accent ? { '--pc': accent } : undefined

  if (type === 'custom' && media.component) {
    const Component = media.component
    return (
      <div className="v-media v-media--custom" style={style}>
        <Component />
      </div>
    )
  }

  if (type === 'live-preview' && media.url) {
    return (
      <div className="v-media v-media--live" style={style}>
        <LivePreview url={media.url} alt={media.alt} label={media.label} />
      </div>
    )
  }

  if (type === 'carousel' && media.slides?.length) {
    return (
      <div className="v-media v-media--carousel" style={style}>
        <Carousel slides={media.slides} interval={media.interval} alt={media.alt} label={media.label} />
      </div>
    )
  }

  if (type === 'image' && media.src && !imgFailed) {
    return (
      <div className="v-media" style={style}>
        <img
          src={media.src}
          alt={media.alt}
          loading="lazy"
          decoding="async"
          onError={() => setImgFailed(true)}
        />
      </div>
    )
  }

  return (
    <div className="v-media" style={style}>
      <Placeholder label={media?.label} />
    </div>
  )
}
