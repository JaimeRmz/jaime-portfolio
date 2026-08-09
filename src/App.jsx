import { useCallback, useState } from 'react'
import './styles/void.css'

import AmbientField from './components/void/AmbientField'
import HudChrome from './components/void/HudChrome'
import IndexPanel from './components/void/IndexPanel'
import TechCarousel from './components/void/TechCarousel'
import Hero from './sections/Hero'
import Work from './sections/Work'
import Contact from './sections/Contact'
import { PROJECTS } from './data/projects'

export default function App() {
  const [indexOpen, setIndexOpen] = useState(false)
  const openIndex = useCallback(() => setIndexOpen(true), [])
  const closeIndex = useCallback(() => setIndexOpen(false), [])

  return (
    <>
      <AmbientField />

      <HudChrome projectCount={PROJECTS.length} onOpenIndex={openIndex} />
      <IndexPanel open={indexOpen} onClose={closeIndex} projects={PROJECTS} />

      <main>
        <Hero />
        <TechCarousel />
        <Work />
        <Contact />
      </main>

      <footer className="v-footer">
        jaime.dev — built with React, Vite &amp; Embla
      </footer>
    </>
  )
}
