import { useId, useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowDownRight, ArrowUpRight, Braces, Cpu, Layers3, Pause, Play } from 'lucide-react'
import { skillGroups } from '../data/portfolio'
import './stack-explorer.css'

// Original implementation, inspired by catalog metadata (no source retrieved):
// https://21st.dev/@olovajs/components/orbiting-skills
// https://21st.dev/@themeocean/components/interactive-tech-stack-bento-grid-with-hover-effects
const groupDetails = [
  {
    eyebrow: 'MODELS & PERCEPTION',
    heading: ['Make the machine', 'understand.'],
    description: 'From language to images, the tools behind useful AI.',
    center: 'AI',
    centerLabel: 'INTELLIGENCE',
    icon: Cpu,
  },
  {
    eyebrow: 'INTERFACES & SYSTEMS',
    heading: ['Bring the whole', 'product together.'],
    description: 'Web, backend, and Android. Connected from end to end.',
    center: '</>',
    centerLabel: 'ENGINEERING',
    icon: Braces,
  },
  {
    eyebrow: 'RUNTIMES & DELIVERY',
    heading: ['Built to run', 'in the real world.'],
    description: 'Version, deploy, and bring intelligence onto the device.',
    center: '↗',
    centerLabel: 'DELIVERY',
    icon: Layers3,
  },
]

const technologyDetails: Record<string, { mark: string; purpose: string }> = {
  Python: { mark: 'Py', purpose: 'Data, model development, and the services around them.' },
  TensorFlow: { mark: 'Tf', purpose: 'Building and training deep learning models.' },
  PyTorch: { mark: 'Pt', purpose: 'Experimenting with neural networks and deep learning.' },
  OpenCV: { mark: 'Cv', purpose: 'Working with images, video, and visual information.' },
  YOLO: { mark: 'Y', purpose: 'Recognizing objects in real-time camera feeds.' },
  BERT: { mark: 'B', purpose: 'Understanding context and extracting meaning from text.' },
  'Computer vision': {
    mark: '◉',
    purpose: 'Turning pixels into perception and practical assistance.',
  },
  NLP: { mark: 'Aa', purpose: 'Connecting human language with intelligent systems.' },
  Java: { mark: 'J', purpose: 'Building application logic and Android experiences.' },
  JavaScript: { mark: 'Js', purpose: 'Bringing interaction to the web, from client to server.' },
  React: { mark: 'Re', purpose: 'Composing responsive interfaces from reusable parts.' },
  'Next.js': {
    mark: 'N',
    purpose: 'Connecting React interfaces with full-stack web applications.',
  },
  Flask: {
    mark: 'Fl',
    purpose: 'Making Python services and AI capabilities available through APIs.',
  },
  'Node.js': { mark: 'No', purpose: 'Writing the server-side services that connect a product.' },
  Kotlin: { mark: 'K', purpose: 'Creating native Android applications and mobile experiences.' },
  Android: { mark: 'An', purpose: 'Putting useful software and on-device AI in your hands.' },
  Git: { mark: 'Git', purpose: 'Keeping a clear, collaborative history of how a product evolves.' },
  AWS: { mark: 'aws', purpose: 'Infrastructure and cloud services for application delivery.' },
  MNN: { mark: 'M', purpose: 'Running neural network inference directly on mobile hardware.' },
  MediaPipe: { mark: 'Mp', purpose: 'Bringing multimodal AI pipelines onto the device.' },
}

function CoreGeometry({ category, reducedMotion }: { category: number; reducedMotion: boolean }) {
  const details = groupDetails[category]
  return (
    <motion.div
      className={`stack-core stack-core-${category}`}
      animate={{ rotate: reducedMotion ? 0 : category === 1 ? -5 : category === 2 ? 5 : 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 18 }}
    >
      <svg className="stack-core-svg" viewBox="0 0 220 240" fill="none" aria-hidden="true">
        <defs>
          <linearGradient
            id={`stack-core-top-${category}`}
            x1="27"
            y1="60"
            x2="183"
            y2="141"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#434343" />
            <stop offset="1" stopColor="#171717" />
          </linearGradient>
          <linearGradient
            id={`stack-core-front-${category}`}
            x1="22"
            y1="101"
            x2="110"
            y2="216"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#181818" />
            <stop offset="1" stopColor="#030303" />
          </linearGradient>
        </defs>
        <ellipse cx="110" cy="211" rx="72" ry="15" fill="#111" fillOpacity=".1" />
        <path d="m25 73 85-48 85 48v104l-85 49-85-49Z" fill="#111" />
        <path d="m25 73 85 49v104l-85-49Z" fill={`url(#stack-core-front-${category})`} />
        <path d="m110 122 85-49v104l-85 49Z" fill="#242424" />
        <path d="m25 73 85-48 85 48-85 49Z" fill={`url(#stack-core-top-${category})`} />
        <path
          d="m25 73 85 49 85-49M110 122v104"
          stroke="#666"
          strokeOpacity=".55"
          strokeWidth=".7"
        />
        <path d="m35 74 75-42 75 42-75 42Z" stroke="#888" strokeOpacity=".3" strokeWidth=".65" />
        <path d="m35 89 65 38v81l-65-37Z" stroke="#555" strokeOpacity=".3" strokeWidth=".5" />
        <path d="m122 129 61-35v76l-61 36Z" stroke="#999" strokeOpacity=".22" strokeWidth=".5" />
        <g stroke="#888" strokeOpacity=".4" strokeWidth="1">
          <path d="m38 158 19 11m-19-5 19 11m-19-5 19 11m68-18 44-25m-44 32 44-25m-44 32 44-25" />
        </g>
        <path d="m57 74 53-30 53 30-53 30Z" fill="#EBEBE7" />
        <path d="m57 74 53 30v3L57 77Zm106 0-53 30v3l53-30Z" fill="#A5A5A1" />
        <text
          x="110"
          y="82"
          textAnchor="middle"
          fill="#171717"
          fontSize={category === 1 ? 26 : 30}
          fontWeight="600"
          letterSpacing="-2"
          className="stack-svg-type"
        >
          {details.center}
        </text>
        <circle cx="172" cy="165" r="2.5" fill="#D9D9D3" />
      </svg>
      <span className="stack-core-caption">{details.centerLabel}</span>
    </motion.div>
  )
}

export default function StackExplorer() {
  const id = useId().replace(/:/g, '')
  const [category, setCategory] = useState(0)
  const [selectedTechnology, setSelectedTechnology] = useState(skillGroups[0].items[0])
  const [paused, setPaused] = useState(false)
  const prefersReducedMotion = Boolean(useReducedMotion())
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])
  const group = skillGroups[category]
  const details = groupDetails[category]
  const Icon = details.icon
  const selectedDetails = technologyDetails[selectedTechnology]

  const selectCategory = (next: number) => {
    setCategory(next)
    setSelectedTechnology(skillGroups[next].items[0])
  }

  const handleTabKey = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next = index
    if (event.key === 'ArrowRight') next = (index + 1) % skillGroups.length
    else if (event.key === 'ArrowLeft') next = (index - 1 + skillGroups.length) % skillGroups.length
    else if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = skillGroups.length - 1
    else return
    event.preventDefault()
    selectCategory(next)
    tabRefs.current[next]?.focus()
  }

  return (
    <div className="stack-explorer">
      <div className="stack-navigation" role="tablist" aria-label="Explore my toolkit">
        {skillGroups.map((item, index) => (
          <button
            key={item.title}
            ref={(element) => {
              tabRefs.current[index] = element
            }}
            className={`stack-tab ${category === index ? 'stack-tab-active' : ''}`}
            type="button"
            role="tab"
            id={`${id}-tab-${index}`}
            aria-selected={category === index}
            aria-controls={`${id}-panel`}
            tabIndex={category === index ? 0 : -1}
            onClick={() => selectCategory(index)}
            onKeyDown={(event) => handleTabKey(event, index)}
          >
            <span className="stack-tab-number">0{index + 1}</span>
            {item.title}
            <ArrowUpRight size={15} aria-hidden="true" />
          </button>
        ))}
      </div>

      <div
        className="stack-bento"
        role="tabpanel"
        id={`${id}-panel`}
        aria-labelledby={`${id}-tab-${category}`}
      >
        <div
          className={`stack-visual ${paused || prefersReducedMotion ? 'stack-motion-paused' : ''}`}
        >
          <div className="stack-visual-top">
            <span>
              <span className="stack-status-dot" />
              THE WORKING SET
            </span>
            {prefersReducedMotion ? (
              <span className="stack-static-label">STATIC VIEW</span>
            ) : (
              <button
                className="stack-motion-control"
                onClick={() => setPaused(!paused)}
                type="button"
                aria-label={paused ? 'Play technology orbit' : 'Pause technology orbit'}
                aria-pressed={paused}
              >
                {paused ? (
                  <Play size={12} aria-hidden="true" />
                ) : (
                  <Pause size={12} aria-hidden="true" />
                )}
                <span>{paused ? 'PLAY' : 'PAUSE'}</span>
              </button>
            )}
          </div>

          <div className="stack-orbit-scene" aria-hidden="true">
            <div className="stack-orbit-field">
              <div className="stack-orbit-ring stack-orbit-ring-one" />
              <div className="stack-orbit-ring stack-orbit-ring-two" />
              <div className="stack-orbit-ring stack-orbit-ring-three" />
              <div className="stack-orbit-crosshair stack-crosshair-x" />
              <div className="stack-orbit-crosshair stack-crosshair-y" />
              <div className="stack-orbit-path">
                {group.items.map((technology, index) => {
                  const angle = (((index / group.items.length) * 360 - 90) * Math.PI) / 180
                  return (
                    <div
                      className={`stack-orbit-node ${selectedTechnology === technology ? 'stack-orbit-node-active' : ''}`}
                      key={technology}
                      style={{
                        left: `${50 + Math.cos(angle) * 48}%`,
                        top: `${50 + Math.sin(angle) * 48}%`,
                      }}
                    >
                      <span className="stack-node-label">
                        <span className="stack-node-symbol">
                          {technologyDetails[technology]?.mark ?? technology.slice(0, 2)}
                        </span>
                        <span>{technology}</span>
                      </span>
                    </div>
                  )
                })}
              </div>
              <CoreGeometry category={category} reducedMotion={prefersReducedMotion} />
            </div>
          </div>

          <div className="stack-visual-bottom">
            <span>
              0{category + 1} / {details.eyebrow}
            </span>
            <span className="stack-coordinates">
              <span /> EXPLORE THE CONNECTIONS
            </span>
          </div>
        </div>

        <div className="stack-content">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              className="stack-category-copy"
              key={category}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -6 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.18 }}
            >
              <div className="stack-category-eyebrow">
                <Icon size={15} strokeWidth={1.4} aria-hidden="true" />
                <span>{details.eyebrow}</span>
              </div>
              <h3>
                {details.heading[0]}
                <br />
                <span>{details.heading[1]}</span>
              </h3>
              <p>{details.description}</p>
            </motion.div>
          </AnimatePresence>

          <div className="stack-tech-group" role="group" aria-label={`${group.title} technologies`}>
            {group.items.map((technology, index) => (
              <motion.button
                className={`stack-tech ${selectedTechnology === technology ? 'stack-tech-active' : ''}`}
                key={technology}
                type="button"
                aria-pressed={selectedTechnology === technology}
                onClick={() => setSelectedTechnology(technology)}
                onFocus={() => setSelectedTechnology(technology)}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 7 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.2,
                  delay: prefersReducedMotion ? 0 : index * 0.025,
                }}
              >
                <span className="stack-tech-mark">
                  {technologyDetails[technology]?.mark ?? technology.slice(0, 2)}
                </span>
                <span>{technology}</span>
                <span className="stack-tech-indicator" aria-hidden="true" />
              </motion.button>
            ))}
          </div>

          <div className="stack-featured" aria-live="polite" aria-atomic="true">
            <div className="stack-featured-top">
              <span>A CLOSER LOOK</span>
              <ArrowDownRight size={15} strokeWidth={1.5} aria-hidden="true" />
            </div>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={selectedTechnology}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.12 }}
              >
                <strong>{selectedTechnology}</strong>
                <p>{selectedDetails?.purpose}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
      <div className="stack-explorer-foot">
        <span>THE RIGHT TOOL. THE RIGHT PROBLEM.</span>
        <span>
          SELECT A TECHNOLOGY TO EXPLORE <ArrowUpRight size={12} aria-hidden="true" />
        </span>
      </div>
    </div>
  )
}
