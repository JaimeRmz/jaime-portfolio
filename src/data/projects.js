import MacroSetDemo from '../components/void/MacroSetDemo'
import F1Demo from '../components/void/F1Demo'

// Single source of truth for the work section.
// ProjectRow renders these in order; IndexPanel lists the same array.
// Adding an entry here adds it to both — no other file needs touching.
//
// media.type drives which branch of ProjectMedia renders:
//   'custom'       → media.component  (animated demo component)
//   'live-preview' → media.url        (Microlink screenshot of the live site)
//   'image'        → media.src        (static asset from src/assets/projects/)

export const PROJECTS = [
  {
    id: 'p-macroset',
    idx: '01',
    title: 'MacroSet',
    kicker: 'Flagship build — 2026',
    meta: 'React · Vite · Express · Supabase · Tailwind',
    description:
      'AI-powered food logging + lifting tracker in one daily log. Meal photos parse into macros through a vision pipeline; lifts log sets, reps, and PRs against the same day.',
    tags: ['React', 'Vite', 'Express', 'Supabase', 'AI Vision'],
    statChip: 'Live in production',
    href: 'https://macroset.vercel.app',
    color: 'var(--accent)',
    media: {
      type: 'custom',
      component: MacroSetDemo,
      alt: 'MacroSet photo-to-macros flow',
    },
  },
  {
    id: 'p-f1',
    idx: '02',
    title: 'Formula 1 Race Predictor',
    kicker: 'ML pipeline — 2026',
    meta: 'XGBoost · FastAPI · React · Vite · Python',
    description:
      'Three-model XGBoost pipeline forecasting qualifying, wins, and podiums. Winner classifier hit ROC-AUC 0.960, podium classifier 0.942, with a live Monaco GP standings visualization.',
    tags: ['XGBoost', 'FastAPI', 'React', 'Python', 'ML'],
    statChip: 'ROC-AUC 0.960',
    href: 'https://f1predictor.app',
    color: 'var(--violet)',
    media: {
      type: 'custom',
      // The original Monaco track simulation, reused from v1 unmodified.
      component: F1Demo,
      alt: 'Monaco GP live race simulation with win probabilities',
    },
  },
  {
    id: 'p-recruit',
    idx: '03',
    title: 'NCAA Recruiting Fit Engine',
    kicker: 'Claude Corps Fellowship — 2026',
    meta: 'Python · FastAPI · React · XGBoost · OpenCV',
    description:
      "Closing the recruiting gap for underserved youth soccer athletes — a nearest-neighbor Fit-Match comparator across 43 schools' NCAA roster data, plus a CV-powered Moment-Finder pipeline surfacing standout plays from highlight footage.",
    tags: ['Python', 'FastAPI', 'React', 'XGBoost', 'OpenCV'],
    statChip: 'In development',
    href: 'https://recruiting-fit-engine.vercel.app',
    color: 'var(--magenta)',
    media: {
      type: 'live-preview',
      url: 'https://recruiting-fit-engine.vercel.app',
      alt: 'NCAA recruiting fit engine — school fit-match comparator',
      label: 'Recruiting engine preview',
    },
  },
  {
    id: 'p-jrgk',
    idx: '04',
    title: 'JRGK GK Platform',
    kicker: 'Operations platform — 2025',
    meta: 'React · Square API · Vite',
    description:
      'Full-stack operations platform for JRGK Performance — manages athlete rosters, session scheduling, and recurring payments via Square API across four Houston-area locations.',
    tags: ['React', 'Square API', 'Vite', 'Full-stack'],
    statChip: '50+ athletes',
    href: 'https://jrgkp.com',
    color: 'var(--blue)',
    media: {
      type: 'live-preview',
      url: 'https://jrgkp.com',
      alt: 'JRGK Performance platform — roster and scheduling dashboard',
      label: 'JRGK platform preview',
    },
  },
]

// Short meta line shown in the index panel (kept tighter than the row meta).
export const INDEX_META = {
  'p-macroset': 'React · Supabase',
  'p-f1': 'XGBoost · FastAPI',
  'p-recruit': 'Python · OpenCV',
  'p-jrgk': 'React · Square API',
}
