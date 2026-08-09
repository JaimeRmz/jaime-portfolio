import { useState } from 'react'

/**
 * Media slot for a project row. Four shapes, picked by `media.type`:
 *
 *   'custom'       — renders the component passed as media.component
 *                    (MacroSetDemo, F1Demo). Sizes itself; no forced ratio.
 *   'live-preview' — Microlink screenshot of a live site, with a pulsing
 *                    skeleton that cross-fades out on load.
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
