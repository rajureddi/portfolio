import { useRef } from 'react'
import type { PointerEvent, ReactNode } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'

// Original spring implementation, informed by 21st.dev Magnetic Button catalog references.
export function Magnetic({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const x = useMotionValue(0),
    y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 180, damping: 16 }),
    sy = useSpring(y, { stiffness: 180, damping: 16 })
  function move(event: PointerEvent<HTMLDivElement>) {
    if (reduced || event.pointerType !== 'mouse' || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    x.set((event.clientX - r.left - r.width / 2) * 0.15)
    y.set((event.clientY - r.top - r.height / 2) * 0.15)
  }
  return (
    <motion.div
      ref={ref}
      className={`magnetic ${className}`}
      style={{ x: reduced ? 0 : sx, y: reduced ? 0 : sy }}
      onPointerMove={move}
      onPointerLeave={() => {
        x.set(0)
        y.set(0)
      }}
    >
      {children}
    </motion.div>
  )
}
