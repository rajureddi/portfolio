import { useEffect, useId, useRef, useState } from 'react'
import './ascii-portrait.css'

// Custom canvas implementation. Metadata inspiration, not imported component code:
// EZPZ Dither Portrait: https://21st.dev/@ezam0000/components/ezpz-dither-portrait
// Animated Mosaic Portrait: https://21st.dev/@serafimcloud/components/animated-mosaic-portrait

type PortraitMode = 'ascii' | 'photo'
type Glyph = { x: number; y: number; character: string; density: number; phase: number }
type PortraitControls = {
  invalidate: () => void
  rebuild: () => void
  rotate: (x: number, y: number) => void
}

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))
const CHARACTER_RAMP = ' .,:;i1tfLCG08@'

export default function AsciiPortrait() {
  const stageRef = useRef<HTMLDivElement>(null)
  const planeRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const photoRef = useRef<HTMLImageElement>(null)
  const controlsRef = useRef<PortraitControls | null>(null)
  const modeRef = useRef<PortraitMode>('ascii')
  const [mode, setMode] = useState<PortraitMode>('ascii')
  const [isPlaying, setIsPlaying] = useState(
    () =>
      typeof window === 'undefined' ||
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  const playingRef = useRef(isPlaying)
  const [imageStatus, setImageStatus] = useState<'loading' | 'ready' | 'error'>('loading')
  const [canvasSupported, setCanvasSupported] = useState(true)
  const descriptionId = useId()
  const effectiveMode = canvasSupported ? mode : 'photo'

  useEffect(() => {
    const stage = stageRef.current
    const plane = planeRef.current
    const canvas = canvasRef.current
    const photo = photoRef.current
    if (!stage || !plane || !canvas || !photo) return

    let context: CanvasRenderingContext2D | null = null
    try {
      context = canvas.getContext('2d', { alpha: true })
    } catch {
      /* The photo remains available. */
    }
    let disposed = false
    let frameId = 0
    let fallbackFrame = 0
    let inView = true
    let imageReady = false
    let width = 1
    let height = 1
    let pixelRatio = 1
    let glyphSize = 6
    let glyphs: Glyph[] = []
    let lastDraw = 0
    let lastTime = performance.now()
    let elapsed = 0
    let settleFrames = 0
    let targetX = 0
    let targetY = 0
    let currentX = 0
    let currentY = 0
    let pointerX = -1000
    let pointerY = -1000
    let pointerActive = false
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sampleCanvas = document.createElement('canvas')
    const sampleContext = sampleCanvas.getContext('2d', { willReadFrequently: true })
    if (!context || !sampleContext)
      fallbackFrame = requestAnimationFrame(() => setCanvasSupported(false))

    function schedule() {
      if (disposed || frameId || !inView || document.hidden) return
      frameId = requestAnimationFrame(render)
    }

    function invalidate() {
      settleFrames = reducedMotion.matches ? 1 : 22
      schedule()
    }

    function rebuild() {
      if (disposed) return
      width = Math.max(1, plane!.clientWidth)
      height = Math.max(1, plane!.clientHeight)
      pixelRatio = Math.min(window.devicePixelRatio || 1, width < 500 ? 1.25 : 1.5)
      canvas!.width = Math.round(width * pixelRatio)
      canvas!.height = Math.round(height * pixelRatio)
      canvas!.style.width = `${width}px`
      canvas!.style.height = `${height}px`
      if (!context || !sampleContext || !photo!.complete || !photo!.naturalWidth) {
        invalidate()
        return
      }

      // Sample the local photograph at the actual character-grid resolution.
      // Luminance and a restrained contrast curve retain the eyes and face.
      const cellWidth = width < 420 ? 4.1 : 4.65
      const cellHeight = cellWidth * 1.22
      const columns = Math.max(1, Math.floor(width / cellWidth))
      const rows = Math.max(1, Math.floor(height / cellHeight))
      const imageSize = Math.min(columns, (rows * cellHeight) / cellWidth) * 0.97
      const imageWidth = imageSize
      const imageHeight = (imageSize * cellWidth) / cellHeight
      const imageX = (columns - imageWidth) / 2
      const imageY = (rows - imageHeight) / 2
      sampleCanvas.width = columns
      sampleCanvas.height = rows
      sampleContext.fillStyle = '#ffffff'
      sampleContext.fillRect(0, 0, columns, rows)
      sampleContext.drawImage(photo!, imageX, imageY, imageWidth, imageHeight)

      try {
        const pixels = sampleContext.getImageData(0, 0, columns, rows).data
        const nextGlyphs: Glyph[] = []
        for (let row = 0; row < rows; row += 1) {
          for (let column = 0; column < columns; column += 1) {
            const offset = (row * columns + column) * 4
            const luminance =
              (pixels[offset] * 0.2126 +
                pixels[offset + 1] * 0.7152 +
                pixels[offset + 2] * 0.0722) /
              255
            const brightness = clamp((luminance - 0.5) * 1.32 + 0.59, 0, 1)
            const nx = (column - imageX) / imageWidth - 0.5
            const ny = (row - imageY) / imageHeight - 0.5
            // A soft oval removes the photograph's hard rectangular edges.
            const radius = Math.sqrt((nx / 0.54) ** 2 + (ny / 0.58) ** 2)
            const edge = clamp((1.08 - radius) / 0.2, 0, 1)
            const density = (1 - brightness) * edge
            if (density < 0.045) continue
            const rampIndex = clamp(
              Math.round(density * (CHARACTER_RAMP.length - 1)),
              1,
              CHARACTER_RAMP.length - 1,
            )
            nextGlyphs.push({
              x: (column + 0.5) * cellWidth,
              y: (row + 0.5) * cellHeight,
              character: CHARACTER_RAMP[rampIndex],
              density,
              phase: column * 0.17 + row * 0.11,
            })
          }
        }
        glyphs = nextGlyphs
        glyphSize = cellWidth * 1.34
        imageReady = true
        invalidate()
      } catch {
        imageReady = false
        setCanvasSupported(false)
      }
    }

    function render(now: number) {
      frameId = 0
      if (disposed || !inView || document.hidden) return
      const animate = playingRef.current && modeRef.current === 'ascii' && imageReady
      // Thirty frames per second is ample for the quiet glyph movement.
      if (animate && now - lastDraw < 32 && settleFrames <= 0) {
        schedule()
        return
      }
      const delta = Math.min((now - lastTime) / 1000, 0.05)
      lastTime = now
      lastDraw = now
      if (animate) elapsed += delta
      const smoothing = reducedMotion.matches ? 1 : 0.12
      currentX += (targetX - currentX) * smoothing
      currentY += (targetY - currentY) * smoothing
      plane!.style.setProperty('--portrait-rotate-x', `${-currentY * 4}deg`)
      plane!.style.setProperty('--portrait-rotate-y', `${currentX * 5}deg`)
      plane!.style.setProperty('--portrait-shift-x', `${currentX * 3}px`)
      plane!.style.setProperty('--portrait-shift-y', `${currentY * 3}px`)

      if (context && imageReady && modeRef.current === 'ascii') {
        context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
        context.clearRect(0, 0, width, height)
        context.fillStyle = '#151515'
        context.font = `500 ${glyphSize}px "DM Mono", monospace`
        context.textAlign = 'center'
        context.textBaseline = 'middle'
        for (const glyph of glyphs) {
          const depth = 0.25 + glyph.density * 0.75
          let x = glyph.x + currentX * depth * 6
          let y = glyph.y + currentY * depth * 4
          if (pointerActive && !reducedMotion.matches) {
            const dx = glyph.x - pointerX
            const dy = glyph.y - pointerY
            const distance = Math.sqrt(dx * dx + dy * dy)
            if (distance > 0 && distance < 76) {
              const displacement = (1 - distance / 76) ** 2 * 7
              x += (dx / distance) * displacement
              y += (dy / distance) * displacement
            }
          }
          y += Math.sin(glyph.phase + elapsed * 0.55) * 0.45 * depth
          context.globalAlpha = clamp(
            0.5 + glyph.density * 0.58 + Math.sin(glyph.phase + elapsed * 0.35) * 0.025,
            0,
            1,
          )
          context.fillText(glyph.character, x, y)
        }
        context.globalAlpha = 1
      }
      settleFrames -= 1
      if (animate || settleFrames > 0) schedule()
    }

    function onPointerMove(event: PointerEvent) {
      const bounds = stage!.getBoundingClientRect()
      pointerX = event.clientX - bounds.left - plane!.offsetLeft
      pointerY = event.clientY - bounds.top - plane!.offsetTop
      targetX = clamp((pointerX / width - 0.5) * 2, -1, 1)
      targetY = clamp((pointerY / height - 0.5) * 2, -1, 1)
      pointerActive = event.pointerType !== 'touch'
      invalidate()
    }

    function onPointerLeave() {
      targetX = 0
      targetY = 0
      pointerActive = false
      invalidate()
    }

    function onVisibilityChange() {
      if (document.hidden) {
        cancelAnimationFrame(frameId)
        frameId = 0
      } else {
        lastTime = performance.now()
        invalidate()
      }
    }

    function onMotionChange() {
      if (reducedMotion.matches) {
        playingRef.current = false
        setIsPlaying(false)
      }
      invalidate()
    }

    const resizeObserver = new ResizeObserver(rebuild)
    resizeObserver.observe(stage)
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting
        if (!inView) {
          cancelAnimationFrame(frameId)
          frameId = 0
        } else {
          lastTime = performance.now()
          invalidate()
        }
      },
      { rootMargin: '40px' },
    )
    intersectionObserver.observe(stage)
    stage.addEventListener('pointermove', onPointerMove, { passive: true })
    stage.addEventListener('pointerleave', onPointerLeave)
    document.addEventListener('visibilitychange', onVisibilityChange)
    reducedMotion.addEventListener('change', onMotionChange)
    controlsRef.current = {
      invalidate,
      rebuild,
      rotate(x, y) {
        targetX = clamp(targetX + x, -1, 1)
        targetY = clamp(targetY + y, -1, 1)
        pointerActive = false
        invalidate()
      },
    }
    rebuild()
    void document.fonts.ready.then(() => {
      if (!disposed) rebuild()
    })

    return () => {
      disposed = true
      controlsRef.current = null
      cancelAnimationFrame(frameId)
      cancelAnimationFrame(fallbackFrame)
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
      stage.removeEventListener('pointermove', onPointerMove)
      stage.removeEventListener('pointerleave', onPointerLeave)
      document.removeEventListener('visibilitychange', onVisibilityChange)
      reducedMotion.removeEventListener('change', onMotionChange)
      glyphs = []
      canvas.width = 0
      canvas.height = 0
    }
  }, [])

  function changeMode(nextMode: PortraitMode) {
    modeRef.current = nextMode
    setMode(nextMode)
    controlsRef.current?.invalidate()
  }

  function toggleMotion() {
    playingRef.current = !playingRef.current
    setIsPlaying(playingRef.current)
    controlsRef.current?.invalidate()
  }

  return (
    <figure className="portrait" data-mode={effectiveMode} data-image={imageStatus}>
      <div className="portrait-heading" aria-hidden="true">
        <span>THE HUMAN BEHIND THE CODE</span>
        <span>PORTRAIT / 01</span>
      </div>
      <div className="portrait-ruler-x" aria-hidden="true">
        {Array.from({ length: 41 }, (_, index) => (
          <i key={index} className={index % 5 === 0 ? 'portrait-tick-major' : ''} />
        ))}
      </div>
      <div className="portrait-ruler-y" aria-hidden="true">
        {Array.from({ length: 31 }, (_, index) => (
          <i key={index} className={index % 5 === 0 ? 'portrait-tick-major' : ''} />
        ))}
      </div>
      <div
        ref={stageRef}
        className="portrait-stage"
        role="group"
        aria-label="Interactive portrait of Raju Bandam"
        aria-describedby={descriptionId}
        tabIndex={0}
        onKeyDown={(event) => {
          const steps: Record<string, [number, number]> = {
            ArrowLeft: [-0.22, 0],
            ArrowRight: [0.22, 0],
            ArrowUp: [0, -0.22],
            ArrowDown: [0, 0.22],
          }
          const step = steps[event.key]
          if (step) {
            event.preventDefault()
            controlsRef.current?.rotate(...step)
          }
        }}
      >
        <span className="portrait-corner portrait-corner-tl" aria-hidden="true" />
        <span className="portrait-corner portrait-corner-tr" aria-hidden="true" />
        <span className="portrait-corner portrait-corner-bl" aria-hidden="true" />
        <span className="portrait-corner portrait-corner-br" aria-hidden="true" />
        <div className="portrait-depth-plane" ref={planeRef}>
          <img
            ref={photoRef}
            className="portrait-photo"
            src="/portrait.jpg"
            alt="Raju Bandam"
            width="460"
            height="460"
            decoding="async"
            fetchPriority="high"
            onLoad={() => {
              setImageStatus('ready')
              controlsRef.current?.rebuild()
            }}
            onError={() => setImageStatus('error')}
          />
          <canvas ref={canvasRef} className="portrait-canvas" aria-hidden="true" />
        </div>
        <div className="portrait-monogram" aria-hidden="true">
          <span>
            RB<span className="portrait-monogram-dot">.</span>
          </span>
          <small>RAJU BANDAM</small>
        </div>
        <div className="portrait-crosshair" aria-hidden="true">
          +
        </div>
      </div>
      <figcaption className="portrait-footer">
        <span className="portrait-hint" id={descriptionId}>
          <span aria-hidden="true">↔</span> MOVE TO EXPLORE
          <span className="portrait-sr-only">
            . Use arrow keys when the portrait is focused to change its perspective.
          </span>
        </span>
        <div className="portrait-controls" aria-label="Portrait controls">
          <div className="portrait-modes" role="group" aria-label="Portrait display mode">
            <button
              type="button"
              aria-pressed={effectiveMode === 'ascii'}
              disabled={!canvasSupported || imageStatus === 'error'}
              onClick={() => changeMode('ascii')}
            >
              ASCII
            </button>
            <button
              type="button"
              aria-pressed={effectiveMode === 'photo'}
              disabled={imageStatus === 'error'}
              onClick={() => changeMode('photo')}
            >
              Photo
            </button>
          </div>
          <button
            type="button"
            className="portrait-motion"
            aria-label={isPlaying ? 'Pause portrait animation' : 'Play portrait animation'}
            aria-pressed={isPlaying}
            disabled={!canvasSupported || imageStatus === 'error' || effectiveMode === 'photo'}
            onClick={toggleMotion}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              {isPlaying ? (
                <path d="M4 2v8M8 2v8" stroke="currentColor" strokeWidth="1.4" />
              ) : (
                <path d="m4 2 6 4-6 4V2Z" fill="currentColor" />
              )}
            </svg>
          </button>
        </div>
      </figcaption>
      <span className="portrait-caption" aria-hidden="true">
        A LITTLE HUMAN. A LOT OF POSSIBILITY.
      </span>
    </figure>
  )
}
