// Tech stack shown in the Embla carousel under the hero.
//
// Logos are served from the devicon CDN (jsDelivr), carried over from the v1
// marquee. `color` drives the per-slide hover glow. If you'd rather drop the
// third-party requests, save these SVGs into src/assets/tech/ and swap the
// `logo` values for imports — nothing else needs to change.
const DEVICON = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons'

export const TECH = [
  { name: 'React', color: '#61dafb', logo: `${DEVICON}/react/react-original.svg` },
  { name: 'Python', color: '#ffd166', logo: `${DEVICON}/python/python-original.svg` },
  { name: 'FastAPI', color: '#3ee6d0', logo: `${DEVICON}/fastapi/fastapi-original.svg` },
  { name: 'JavaScript', color: '#f0db4f', logo: `${DEVICON}/javascript/javascript-original.svg` },
  { name: 'Java', color: '#ff8a70', logo: `${DEVICON}/java/java-original.svg` },
  { name: 'SQL', color: '#6ea3ff', logo: `${DEVICON}/mysql/mysql-original.svg` },
  { name: 'D3.js', color: '#ff8a3d', logo: `${DEVICON}/d3js/d3js-original.svg` },
  // XGBoost's only public mark is a dark wordmark that vanishes on --void and
  // just repeats the label beside it. Left without a logo so TechLogo falls
  // back to the colour chip. Swap in a light-on-dark asset here if you get one.
  { name: 'XGBoost', color: '#8b5cf6', logo: null },
  // `plain-wordmark`, not `original-wordmark`: the original draws "aws" in
  // #252f3e, which is invisible against the void background.
  { name: 'AWS', color: '#ff9f43', logo: `${DEVICON}/amazonwebservices/amazonwebservices-plain-wordmark.svg` },
  { name: 'Tailwind', color: '#3ee6d0', logo: `${DEVICON}/tailwindcss/tailwindcss-original.svg` },
  { name: 'Supabase', color: '#3ecf8e', logo: `${DEVICON}/supabase/supabase-original.svg` },
  { name: 'Vite', color: '#a970ff', logo: `${DEVICON}/vitejs/vitejs-original.svg` },
]
