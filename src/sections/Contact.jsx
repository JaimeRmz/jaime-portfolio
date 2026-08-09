import GhostType from '../components/void/GhostType'
import SectionLabel from '../components/void/SectionLabel'
import TerminalPanel from '../components/void/TerminalPanel'
import Reveal from '../components/void/Reveal'
import { EMAIL, GITHUB_HANDLE, LOCATION, SOCIAL_LINKS } from '../data/links'

function TermLine({ cmd, value }) {
  return (
    <div className="v-cmd">
      {cmd} → <span className="v-val">{value}</span>
    </div>
  )
}

export default function Contact() {
  return (
    <section className="v-wrap v-contact" id="contact">
      <GhostType>CONTACT</GhostType>

      <SectionLabel n="03" title="Get in Touch" style={{ marginBottom: 26 }} />
      <div className="v-contact-lead">Let's build something.</div>

      <div className="v-contact-grid">
        <div>
          <Reveal as="p" variant="brighten">
            CS student open to internships, research opportunities, and interesting problems in ML
            and full-stack development.
          </Reveal>

          <TerminalPanel className="v-terminal">
            <TermLine cmd="$ echo $EMAIL" value={EMAIL} />
            <TermLine cmd="$ git remote -v" value={GITHUB_HANDLE} />
            <TermLine cmd="$ open --location" value={LOCATION} />
          </TerminalPanel>

          <div className="v-link-row">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.label}
                className="v-pill"
                href={link.href}
                target="_blank"
                rel="noreferrer"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* TODO(form): no submit handler wired yet — hook up Formspree/Resend
            or swap for a mailto: link before shipping. */}
        <form className="v-form" onSubmit={(e) => e.preventDefault()}>
          <input type="text" name="name" placeholder="Name" aria-label="Name" />
          <input type="email" name="email" placeholder="Email" aria-label="Email" />
          <textarea name="message" placeholder="Message" aria-label="Message" />
          <button className="v-send" type="submit">
            Send
          </button>
        </form>
      </div>
    </section>
  )
}
