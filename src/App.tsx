import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  ArrowDown,
  ArrowDownLeft,
  ArrowDownRight,
  ArrowUp,
  ArrowUpRight,
  Check,
  ChevronDown,
  Code2,
  Copy,
  Download,
  Github,
  Menu,
  Plus,
  X,
} from 'lucide-react'
import { profile, projects } from './data/portfolio'
import type { Project } from './data/portfolio'
import { ProjectArtwork } from './components/ProjectArtwork'
import { Tilt } from './components/ui/tilt'
import EducationJourney from './components/EducationJourney'
import StackExplorer from './components/StackExplorer'
import { Magnetic } from './components/ui/magnetic'

const AsciiPortrait = lazy(() => import('./components/AsciiPortrait'))
const categories = ['All work', 'On-device AI', 'Computer vision', 'Applications'] as const
type Category = (typeof categories)[number]

const focusAreas = [
  {
    title: 'AI & machine learning',
    label: 'INTELLIGENCE',
    symbol: '✳',
    copy: 'Teaching machines to see, understand, and assist. From computer vision and language models to practical, intelligent products.',
    tools: ['Python', 'PyTorch', 'TensorFlow', 'OpenCV'],
  },
  {
    title: 'Full-stack development',
    label: 'EXPERIENCES',
    symbol: '{ }',
    copy: 'Connecting considered interfaces to the systems behind them. Building web applications with React, Next.js, Node.js, and Flask.',
    tools: ['React', 'Next.js', 'Node.js', 'Flask'],
  },
  {
    title: 'Mobile & systems',
    label: 'EVERYDAY TOOLS',
    symbol: '⌘',
    copy: 'Taking ideas beyond a browser tab. Creating Android applications and connecting software to the real-world problems it can solve.',
    tools: ['Android', 'Kotlin', 'Java', 'Git'],
  },
]

function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  const reduced = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

function Mark({ small = false }: { small?: boolean }) {
  return (
    <span className={`brand-mark ${small ? 'brand-mark-small' : ''}`} aria-hidden="true">
      <span />
      <span />
      <span />
    </span>
  )
}

function IndiaTime() {
  const [time, setTime] = useState('')
  useEffect(() => {
    const update = () =>
      setTime(
        new Intl.DateTimeFormat('en-GB', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }).format(new Date()),
      )
    update()
    const interval = window.setInterval(update, 30_000)
    return () => window.clearInterval(interval)
  }, [])
  return (
    <span>
      {time || 'India'} <span className="time-zone">IST</span>
    </span>
  )
}

function App() {
  const reducedMotion = useReducedMotion()
  const [menuOpen, setMenuOpen] = useState(false)
  const [category, setCategory] = useState<Category>('All work')
  const [expanded, setExpanded] = useState(
    window.location.pathname.replace(/\/$/, '') === '/projects',
  )
  const [selected, setSelected] = useState<Project | null>(null)
  const [resumeOpen, setResumeOpen] = useState(
    window.location.pathname.replace(/\/$/, '') === '/resume',
  )
  const [copied, setCopied] = useState(false)
  const [copyFailed, setCopyFailed] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [focusArea, setFocusArea] = useState(0)
  const modalRef = useRef<HTMLDialogElement>(null)
  const resumeRef = useRef<HTMLDialogElement>(null)
  const mobileNavRef = useRef<HTMLElement>(null)
  const copyTimer = useRef<number | undefined>(undefined)

  useEffect(() => {
    const sections = document.querySelectorAll('main section[id]')
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActiveSection(entry.target.id)
      },
      { rootMargin: '-20% 0px -55% 0px' },
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const dialog = modalRef.current
    if (!dialog) return
    if (selected && !dialog.open) dialog.showModal()
    else if (!selected && dialog.open) dialog.close()
  }, [selected])

  useEffect(() => {
    const dialog = resumeRef.current
    if (!dialog) return
    if (resumeOpen && !dialog.open) dialog.showModal()
    else if (!resumeOpen && dialog.open) dialog.close()
  }, [resumeOpen])

  useEffect(() => {
    document.body.style.overflow = selected || resumeOpen || menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [selected, resumeOpen, menuOpen])

  useEffect(() => () => window.clearTimeout(copyTimer.current), [])

  useEffect(() => {
    if (!menuOpen) return
    const toggle = document.querySelector<HTMLButtonElement>('.menu-toggle')
    const links = Array.from(mobileNavRef.current?.querySelectorAll<HTMLAnchorElement>('a') ?? [])
    const focusables = toggle ? [toggle, ...links] : links
    const focusFrame = requestAnimationFrame(() => links[0]?.focus({ preventScroll: true }))
    function handleKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault()
        setMenuOpen(false)
      }
      if (event.key !== 'Tab') return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (!focusables.includes(document.activeElement as HTMLButtonElement & HTMLAnchorElement)) {
        event.preventDefault()
        first?.focus()
      } else if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last?.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first?.focus()
      }
    }
    const desktop = window.matchMedia('(min-width: 621px)')
    const closeOnDesktop = () => {
      if (desktop.matches) setMenuOpen(false)
    }
    document.addEventListener('keydown', handleKey)
    desktop.addEventListener('change', closeOnDesktop)
    return () => {
      cancelAnimationFrame(focusFrame)
      document.removeEventListener('keydown', handleKey)
      desktop.removeEventListener('change', closeOnDesktop)
      toggle?.focus({ preventScroll: true })
    }
  }, [menuOpen])

  useEffect(() => {
    if (window.location.pathname.replace(/\/$/, '') === '/projects')
      document.getElementById('work')?.scrollIntoView()
  }, [])

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setCopyFailed(false)
      window.clearTimeout(copyTimer.current)
      copyTimer.current = window.setTimeout(() => setCopied(false), 2400)
    } catch {
      setCopyFailed(true)
    }
  }

  const shown = projects.filter(
    (project) =>
      (category === 'All work' || project.category === category) && (expanded || project.featured),
  )
  const featured = shown.filter((project) => project.artwork)
  const other = shown.filter((project) => !project.artwork)

  function navigate() {
    setMenuOpen(false)
  }

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <div className="nav-shell">
          <a className="brand" href="#home" aria-label="Raju Bandam home" onClick={navigate}>
            <Mark />
            <span>
              raju<span className="brand-period">.</span>
            </span>
          </a>
          <nav className="desktop-nav" aria-label="Main navigation">
            <a href="#work" className={activeSection === 'work' ? 'is-active' : ''}>
              Work <span>01</span>
            </a>
            <a href="#about" className={activeSection === 'about' ? 'is-active' : ''}>
              About <span>02</span>
            </a>
            <a href="#toolkit" className={activeSection === 'toolkit' ? 'is-active' : ''}>
              Toolkit <span>03</span>
            </a>
          </nav>
          <div className="nav-right">
            <span className="availability">
              <i /> Open to opportunities
            </span>
            <a className="nav-contact" href="#contact">
              Let’s talk <ArrowUpRight size={16} />
            </a>
            <button
              className="menu-toggle icon-button"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
            >
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            ref={mobileNavRef}
            id="mobile-nav"
            className="mobile-nav"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {[
              ['Work', 'work'],
              ['About', 'about'],
              ['Toolkit', 'toolkit'],
              ['Contact', 'contact'],
            ].map(([label, id], index) => (
              <a href={`#${id}`} onClick={navigate} key={id}>
                <span className="mono">0{index + 1}</span>
                {label}
                <ArrowUpRight />
              </a>
            ))}
            <span className="mono mobile-note">AI ENGINEER / FULL-STACK DEVELOPER</span>
          </motion.nav>
        )}
      </AnimatePresence>

      <main id="main" inert={menuOpen}>
        <section className="hero container" id="home" aria-labelledby="hero-heading">
          <div className="hero-topline mono">
            <span>
              <span className="status-dot" /> AI ENGINEERING MEETS FULL-STACK DEVELOPMENT
            </span>
            <span className="hero-location">
              INDIA <span className="location-cross">↗</span> <IndiaTime />
            </span>
          </div>
          <div className="hero-layout">
            <div className="hero-copy">
              <Reveal>
                <div className="eyebrow">
                  <span className="mini-rule" /> RAJU BANDAM / ENGINEER & BUILDER
                </div>
              </Reveal>
              <Reveal delay={0.05}>
                <h1 id="hero-heading">
                  AI engineer.
                  <br />
                  Full-stack
                  <br />
                  <span>builder.</span>
                </h1>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="hero-description">
                  From intelligent models to thoughtful interfaces.
                  <br />I turn ideas into software, across the stack.
                </p>
              </Reveal>
              <Reveal className="hero-actions" delay={0.18}>
                <Magnetic>
                  <a className="button button-lime" href="#work">
                    Explore my work <ArrowDownRight size={19} />
                  </a>
                </Magnetic>
                <button className="text-link" onClick={() => setResumeOpen(true)}>
                  My résumé <ArrowUpRight size={16} />
                </button>
              </Reveal>
              <Reveal className="hero-footnote" delay={0.25}>
                <span className="hero-footnote-icon">
                  <Code2 size={17} />
                </span>
                <span>
                  INTELLIGENCE × INTERFACES × SYSTEMS
                  <br />
                  <span>ONE CURIOUS MIND. MANY WAYS TO BUILD.</span>
                </span>
              </Reveal>
            </div>
            <div className="hero-visual">
              <Suspense
                fallback={
                  <div className="portrait-loading">
                    <span className="loading-orbit" />
                    <span className="mono">A PORTRAIT, WRITTEN IN CODE.</span>
                  </div>
                }
              >
                <AsciiPortrait />
              </Suspense>
            </div>
          </div>
          <div className="hero-baseline mono">
            <span>LESS TALK. MORE THOUGHTFULLY BUILT THINGS.</span>
            <a href="#work">
              SCROLL TO EXPLORE <ArrowDown size={13} />
            </a>
          </div>
        </section>

        <div className="discipline-strip" aria-label="Specialties">
          <div className="container discipline-inner">
            {[
              'AI & MACHINE LEARNING',
              'FULL-STACK DEVELOPMENT',
              'COMPUTER VISION',
              'MOBILE & SYSTEMS',
            ].map((item) => (
              <span key={item}>
                <Plus size={14} strokeWidth={1} />
                {item}
              </span>
            ))}
          </div>
        </div>

        <section
          className="work-section container section-space"
          id="work"
          aria-labelledby="work-heading"
        >
          <Reveal className="section-heading">
            <div>
              <div className="section-label mono">
                <span>01</span> SELECTED WORK
              </div>
              <h2 id="work-heading">
                Built with intent<span className="lime">.</span>
              </h2>
            </div>
            <p>
              Real problems. A little curiosity.
              <br />
              And a lot of building.
            </p>
          </Reveal>
          <div className="work-toolbar">
            <div className="filter-tabs" aria-label="Filter projects">
              {categories.map((item) => (
                <button
                  aria-pressed={category === item}
                  className={category === item ? 'filter-active' : ''}
                  key={item}
                  onClick={() => {
                    setCategory(item)
                    if (item !== 'All work') setExpanded(true)
                  }}
                >
                  {item}
                  {item === 'All work' && (
                    <span>{projects.length.toString().padStart(2, '0')}</span>
                  )}
                </button>
              ))}
            </div>
            <span className="work-year mono">PERSONAL & EXPLORATORY PROJECTS</span>
          </div>
          <div className="projects-grid">
            {featured.map((project, index) => (
              <Reveal key={project.id} delay={(index % 2) * 0.07} className="project-reveal">
                <article className={`project-card project-${project.artwork}`}>
                  <Tilt className="project-art-tilt">
                    <button
                      className="project-art-button"
                      aria-label={`Explore ${project.title}`}
                      onClick={() => setSelected(project)}
                    >
                      <ProjectArtwork kind={project.artwork!} />
                      <span className="project-open">
                        <ArrowUpRight size={24} />
                      </span>
                    </button>
                  </Tilt>
                  <button className="project-info" onClick={() => setSelected(project)}>
                    <div>
                      <h3>{project.title}</h3>
                      <p>{project.summary}</p>
                    </div>
                    <ArrowUpRight size={23} strokeWidth={1.4} />
                  </button>
                  <div className="project-tags mono">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
          {expanded && other.length > 0 && (
            <div className="project-index">
              <div className="index-label mono">
                MORE FROM THE WORKBENCH{' '}
                <span>{String(other.length).padStart(2, '0')} PROJECTS</span>
              </div>
              {other.map((project, index) => (
                <button
                  className="project-row"
                  key={project.id}
                  onClick={() => setSelected(project)}
                >
                  <span className="project-row-number mono">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="project-row-copy">
                    <strong>{project.title}</strong>
                    <span>{project.summary}</span>
                  </span>
                  <span className="project-row-category mono">{project.category}</span>
                  <ArrowUpRight size={21} />
                </button>
              ))}
            </div>
          )}
          {shown.length === 0 && (
            <p className="empty-projects">More work is on the way. Explore another category.</p>
          )}
          <div className="work-bottom">
            <span className="mono">ALWAYS EXPLORING. ALWAYS ITERATING.</span>
            <button
              className="button button-outline"
              onClick={() => {
                setExpanded(!expanded)
                if (expanded) setCategory('All work')
              }}
              aria-expanded={expanded}
            >
              {expanded ? 'Show selected work' : `Explore all ${projects.length} projects`}
              <ChevronDown size={16} className={expanded ? 'rotate-arrow' : ''} />
            </button>
          </div>
        </section>

        <section className="about-section" id="about" aria-labelledby="about-heading">
          <div className="container section-space">
            <Reveal className="section-label mono">
              <span>02</span> MORE THAN A JOB TITLE
            </Reveal>
            <div className="about-layout">
              <Reveal className="about-heading">
                <h2 id="about-heading">
                  A builder,
                  <br />
                  across disciplines.
                </h2>
                <Tilt className="identity-card" rotationFactor={7}>
                  <div className="identity-top mono">
                    <span>THE HUMAN BEHIND THE CODE</span>
                    <ArrowUpRight size={16} />
                  </div>
                  <div className="identity-body">
                    <img
                      src="/portrait.jpg"
                      alt="Raju Bandam"
                      width="128"
                      height="146"
                      loading="lazy"
                    />
                    <div>
                      <span className="identity-name">
                        Raju
                        <br />
                        Bandam<span>↗</span>
                      </span>
                      <span className="mono">
                        AI ENGINEER
                        <br />
                        FULL-STACK DEVELOPER
                      </span>
                    </div>
                  </div>
                  <div className="identity-bottom">
                    <span className="identity-barcode" aria-hidden="true" />
                    <span className="mono">
                      BUILT ON CURIOSITY.
                      <br />
                      POWERED BY COFFEE & CODE.
                    </span>
                  </div>
                </Tilt>
              </Reveal>
              <Reveal className="about-copy" delay={0.1}>
                <p className="about-lead">
                  A model. An interface. A whole system.
                  <br className="desktop-break" />I like connecting the dots.
                </p>
                <p>
                  I’m Raju, a computer science and AI/ML engineer who enjoys the whole process:
                  understanding a problem, exploring the technology, and building something people
                  can use.
                </p>
                <p>
                  My work crosses machine learning, full-stack applications, computer vision, and
                  Android. The common thread is curiosity—and the patience to turn an idea into a
                  working product.
                </p>
                <div className="focus-tabs" aria-label="Explore my disciplines">
                  {focusAreas.map((area, index) => (
                    <button
                      key={area.label}
                      aria-pressed={focusArea === index}
                      onClick={() => setFocusArea(index)}
                    >
                      <span className="mono">0{index + 1}</span>
                      {area.label}
                      <span>{area.symbol}</span>
                    </button>
                  ))}
                </div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={focusArea}
                    className="focus-detail"
                    initial={reducedMotion ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reducedMotion ? { opacity: 1 } : { opacity: 0, y: -5 }}
                    transition={{ duration: reducedMotion ? 0 : 0.2 }}
                  >
                    <h3>{focusAreas[focusArea].title}</h3>
                    <p>{focusAreas[focusArea].copy}</p>
                    <div className="focus-tools mono">
                      {focusAreas[focusArea].tools.map((tool) => (
                        <span key={tool}>{tool}</span>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
                <a
                  className="underlined-link"
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                >
                  See what I’m building
                  <ArrowUpRight size={16} />
                </a>
              </Reveal>
            </div>
            <Reveal>
              <EducationJourney />
            </Reveal>
          </div>
        </section>

        <section
          className="toolkit-section container section-space"
          id="toolkit"
          aria-labelledby="toolkit-heading"
        >
          <Reveal className="section-heading">
            <div>
              <div className="section-label mono">
                <span>03</span> TOOLS OF THE TRADE
              </div>
              <h2 id="toolkit-heading">
                Different tools.
                <br />
                <span className="muted-heading">One engineering mindset.</span>
              </h2>
            </div>
            <p>
              A growing toolkit, shaped by
              <br />
              the things I’m curious enough to build.
            </p>
          </Reveal>
          <Reveal>
            <StackExplorer />
          </Reveal>
        </section>

        <section className="contact-section" id="contact" aria-labelledby="contact-heading">
          <div className="container">
            <Reveal className="contact-top">
              <span className="section-label mono">
                <span>04</span> YOUR NEXT GOOD IDEA
              </span>
              <span className="availability">
                <i /> OPEN TO WHAT’S NEXT
              </span>
            </Reveal>
            <Reveal className="contact-main">
              <h2 id="contact-heading">
                Good things
                <br />
                <span>start with a hello.</span>
              </h2>
              <Magnetic className="contact-magnet">
                <a
                  className="contact-arrow"
                  href={`mailto:${profile.email}`}
                  aria-label="Email Raju Bandam"
                >
                  <ArrowUpRight strokeWidth={1.1} />
                </a>
              </Magnetic>
            </Reveal>
            <Reveal className="contact-bottom">
              <div className="email-group">
                <a href={`mailto:${profile.email}`} className="email-link">
                  {profile.email}
                </a>
                <button
                  className="copy-email icon-button"
                  onClick={copyEmail}
                  aria-label={copied ? 'Email copied' : 'Copy email address'}
                >
                  {copied ? <Check size={18} /> : <Copy size={17} />}
                </button>
                <span className="copy-status mono" role="status">
                  {copied ? 'COPIED!' : copyFailed ? 'USE THE EMAIL LINK' : ''}
                </span>
              </div>
              <p>
                Have a project, an opportunity,
                <br />
                or a good question? I’m listening.
              </p>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="site-footer container" inert={menuOpen}>
        <div className="footer-top">
          <a className="brand" href="#home" aria-label="Back to top">
            <Mark small />
            <span>raju.</span>
          </a>
          <div className="footer-socials">
            <a href={profile.github} target="_blank" rel="noreferrer">
              GitHub <ArrowUpRight size={13} />
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer">
              LinkedIn <ArrowUpRight size={13} />
            </a>
            <button onClick={() => setResumeOpen(true)}>
              Résumé <ArrowUpRight size={13} />
            </button>
          </div>
          <a href="#home" className="back-top mono">
            BACK TO TOP <ArrowUp size={14} />
          </a>
        </div>
        <div className="footer-bottom mono">
          <span>© {new Date().getFullYear()} RAJU BANDAM</span>
          <span>THOUGHTFULLY BUILT. CONSTANTLY EVOLVING.</span>
          <span>
            INDIA / <IndiaTime />
          </span>
        </div>
      </footer>

      <dialog
        ref={modalRef}
        className="project-dialog"
        onCancel={() => setSelected(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) setSelected(null)
        }}
        aria-labelledby="project-dialog-title"
        onClose={() => setSelected(null)}
      >
        {selected && (
          <div className="dialog-inner">
            <div className="dialog-topline">
              <span className="mono">PROJECT NOTES / {selected.category.toUpperCase()}</span>
              <button
                className="dialog-close icon-button"
                onClick={() => setSelected(null)}
                aria-label="Close project details"
              >
                <X size={21} />
              </button>
            </div>
            {selected.artwork && (
              <div className="dialog-art">
                <ProjectArtwork kind={selected.artwork} />
              </div>
            )}
            <div className="dialog-copy">
              <h2 id="project-dialog-title">{selected.title}</h2>
              <p>{selected.description}</p>
              <div className="project-tags mono">
                {selected.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              {selected.artwork && (
                <p className="illustration-note mono">PROJECT CONCEPT ILLUSTRATION</p>
              )}
              <a
                className="button button-lime"
                href={selected.repo}
                target="_blank"
                rel="noreferrer"
              >
                Explore the source <Github size={17} />
                <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        )}
      </dialog>

      <dialog
        ref={resumeRef}
        className="resume-dialog"
        onCancel={() => setResumeOpen(false)}
        onClick={(event) => {
          if (event.target === event.currentTarget) setResumeOpen(false)
        }}
        aria-labelledby="resume-dialog-title"
        onClose={() => setResumeOpen(false)}
      >
        <div className="dialog-inner">
          <div className="dialog-topline">
            <span className="mono">A LITTLE MORE ABOUT ME</span>
            <button
              className="dialog-close icon-button"
              onClick={() => setResumeOpen(false)}
              aria-label="Close résumé"
            >
              <X size={21} />
            </button>
          </div>
          <div className="dialog-copy">
            <Mark />
            <h2 id="resume-dialog-title">Raju Bandam</h2>
            <p className="resume-role">AI Engineer · Full-stack Developer</p>
            <p>Explore my background, education, and technical experience in the full résumé.</p>
            <div className="resume-facts">
              <span>Computer science & AI/ML</span>
              <span>Malla Reddy University</span>
              <span>2022 – 2026</span>
            </div>
            <a
              className="button button-lime"
              href={profile.resume}
              download="Raju-Bandam-Resume.pdf"
            >
              Download résumé <Download size={17} />
            </a>
            <a
              className="underlined-link resume-view"
              href={profile.resume}
              target="_blank"
              rel="noreferrer"
            >
              Open PDF in a new tab <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </dialog>
      <div className="ambient-corner" aria-hidden="true">
        <ArrowDownLeft size={13} />
        <span>RB / PORTFOLIO</span>
      </div>
    </>
  )
}

export default App
