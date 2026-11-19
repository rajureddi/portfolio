import { useEffect, useId, useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDownRight, ArrowUpRight, GraduationCap } from 'lucide-react'
import { education } from '../data/portfolio'
import './education-journey.css'

const stages = [
  { key: 'university', label: 'University', chapter: 'The deeper dive' },
  { key: 'college', label: 'College', chapter: 'Finding the direction' },
  { key: 'school', label: 'School', chapter: 'Where it started' },
] as const

export default function EducationJourney() {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const reducedMotion = useReducedMotion()
  const [horizontalTimeline, setHorizontalTimeline] = useState(
    () => window.matchMedia('(max-width: 760px)').matches,
  )
  const instanceId = useId()
  const selectedStage = stages[selectedIndex]
  const selectedRecord = education[selectedIndex]

  useEffect(() => {
    const media = window.matchMedia('(max-width: 760px)')
    const updateOrientation = () => setHorizontalTimeline(media.matches)
    media.addEventListener('change', updateOrientation)
    return () => media.removeEventListener('change', updateOrientation)
  }, [])

  function selectWithKeyboard(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let nextIndex = index
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight')
      nextIndex = (index + 1) % education.length
    else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft')
      nextIndex = (index - 1 + education.length) % education.length
    else if (event.key === 'Home') nextIndex = 0
    else if (event.key === 'End') nextIndex = education.length - 1
    else return

    event.preventDefault()
    setSelectedIndex(nextIndex)
    tabRefs.current[nextIndex]?.focus()
  }

  return (
    <section
      className="edu-journey"
      aria-labelledby={`${instanceId}-heading`}
      data-testid="education-journey"
    >
      <div className="edu-section-topline">
        <span className="edu-kicker">THE FOUNDATION</span>
        <span className="edu-range">LEARNING JOURNEY / 2020—2026</span>
      </div>

      <div className="edu-layout">
        <div className="edu-timeline-column">
          <h3 id={`${instanceId}-heading`} className="edu-heading">
            Learning,
            <br />
            layer by layer<span>.</span>
          </h3>
          <p className="edu-intro">
            A few chapters that shaped
            <br />
            the way I think and build.
          </p>

          <div
            className="edu-timeline"
            role="tablist"
            aria-label="Academic journey"
            aria-orientation={horizontalTimeline ? 'horizontal' : 'vertical'}
          >
            {education.map((item, index) => {
              const stage = stages[index]
              const isSelected = index === selectedIndex

              return (
                <button
                  className={`edu-stage ${isSelected ? 'edu-stage-selected' : ''}`}
                  key={stage.key}
                  ref={(element) => {
                    tabRefs.current[index] = element
                  }}
                  type="button"
                  id={`${instanceId}-tab-${stage.key}`}
                  role="tab"
                  aria-selected={isSelected}
                  aria-controls={`${instanceId}-record-${stage.key}`}
                  tabIndex={isSelected ? 0 : -1}
                  onClick={() => setSelectedIndex(index)}
                  onKeyDown={(event) => selectWithKeyboard(event, index)}
                  data-testid={`edu-stage-${stage.key}`}
                >
                  <span className="edu-stage-number" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="edu-stage-copy">
                    <span className="edu-stage-name">{stage.label}</span>
                    <span className="edu-stage-period">{item.period}</span>
                  </span>
                  <ArrowUpRight
                    className="edu-stage-arrow"
                    size={17}
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </button>
              )
            })}
          </div>

          <div className="edu-timeline-caption">
            <span className="edu-caption-cross" aria-hidden="true">
              +
            </span>
            <span>
              DIFFERENT CHAPTERS.
              <br />
              THE SAME CURIOSITY.
            </span>
          </div>
        </div>

        <div className="edu-record-column">
          <div className="edu-paper-stack" data-selected={selectedStage.key}>
            {[2, 1].map((depth) => {
              const recordIndex = (selectedIndex + depth) % education.length
              const stage = stages[recordIndex]
              return (
                <motion.div
                  key={depth}
                  className={`edu-back-sheet edu-back-sheet-${depth}`}
                  aria-hidden="true"
                  animate={
                    reducedMotion
                      ? undefined
                      : {
                          rotate: depth === 1 ? 3 : -4,
                          x: depth === 1 ? 13 : -7,
                          y: depth === 1 ? 16 : 28,
                        }
                  }
                  transition={{ type: 'spring', stiffness: 190, damping: 26 }}
                >
                  <span className="edu-sheet-caption">
                    ACADEMIC RECORD / {String(recordIndex + 1).padStart(2, '0')}
                  </span>
                  <span className="edu-sheet-edge">
                    {stage.label.toUpperCase()} — {education[recordIndex].period}
                  </span>
                </motion.div>
              )
            })}

            {education.map((item, index) => {
              const stage = stages[index]
              const isSelected = index === selectedIndex
              const isCgpa = item.result.startsWith('CGPA')

              return (
                <div
                  className="edu-panel"
                  key={stage.key}
                  id={`${instanceId}-record-${stage.key}`}
                  role="tabpanel"
                  aria-labelledby={`${instanceId}-tab-${stage.key}`}
                  tabIndex={0}
                  hidden={!isSelected}
                  data-testid={`edu-record-${stage.key}`}
                >
                  {isSelected && (
                    <motion.article
                      className={`edu-paper edu-paper-${stage.key}`}
                      initial={reducedMotion ? false : { opacity: 0, y: 12, rotate: -1.2 }}
                      animate={{ opacity: 1, y: 0, rotate: 0 }}
                      transition={{ duration: reducedMotion ? 0 : 0.38, ease: [0.22, 1, 0.36, 1] }}
                      data-testid="edu-active-record"
                    >
                      <div className="edu-paper-topline">
                        <span className="edu-paper-icon" aria-hidden="true">
                          <GraduationCap size={18} strokeWidth={1.4} />
                        </span>
                        <span>ACADEMIC RECORD</span>
                        <span className="edu-paper-reference">
                          RB / {String(index + 1).padStart(2, '0')}
                        </span>
                      </div>

                      <div className="edu-paper-main">
                        <span className="edu-paper-number" aria-hidden="true">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <span className="edu-paper-stage">
                          {stage.label} / {stage.chapter}
                        </span>
                        <h4 className="edu-degree">{item.qualification}</h4>
                        <p className="edu-institution">{item.institution}</p>
                      </div>

                      <div className="edu-paper-bottom">
                        <div className="edu-period">
                          <span>THE CHAPTER</span>
                          <strong>{item.period}</strong>
                          <span className="edu-period-rule" aria-hidden="true">
                            <i />
                            <i />
                          </span>
                        </div>
                        <div
                          className="edu-score-stamp"
                          role="img"
                          aria-label={`Academic result: ${item.result}`}
                        >
                          <span aria-hidden="true">{isCgpa ? 'CGPA' : 'SCORE'}</span>
                          <strong aria-hidden="true">{item.result.replace('CGPA ', '')}</strong>
                          <span aria-hidden="true">ACADEMIC RESULT</span>
                        </div>
                      </div>
                      <div className="edu-paper-footline">
                        <span>RAJU BANDAM</span>
                        <span>KEEP LEARNING. KEEP BUILDING.</span>
                      </div>
                    </motion.article>
                  )}
                </div>
              )
            })}
          </div>

          <div className="edu-stack-footer">
            <span className="edu-record-count">
              <strong>{String(selectedIndex + 1).padStart(2, '0')}</strong>
              <span>/ {String(education.length).padStart(2, '0')}</span>
            </span>
            <span className="edu-stack-hint">
              <ArrowDownRight size={14} strokeWidth={1.5} aria-hidden="true" /> SELECT A CHAPTER TO
              EXPLORE
            </span>
          </div>
          <span className="edu-selection-announcement" role="status">
            {selectedStage.label}: {selectedRecord.qualification}, {selectedRecord.period}.
          </span>
        </div>
      </div>
    </section>
  )
}
