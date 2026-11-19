// Adapted from ibelick's Tilt on 21st.dev / Motion Primitives.
// https://21st.dev/@ibelick/components/tilt
import { useRef } from 'react'
import type { PointerEvent, ReactNode } from 'react'
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion'

export function Tilt({
  children,
  className,
  rotationFactor = 5,
}: {
  children: ReactNode
  className?: string
  rotationFactor?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 160, damping: 24 })
  const sy = useSpring(y, { stiffness: 160, damping: 24 })
  const rx = useTransform(sy, [-0.5, 0.5], [rotationFactor, -rotationFactor])
  const ry = useTransform(sx, [-0.5, 0.5], [-rotationFactor, rotationFactor])
  const transform = useMotionTemplate`perspective(1200px) rotateX(${rx}deg) rotateY(${ry}deg)`
  function move(event: PointerEvent<HTMLDivElement>) {
    if (reduceMotion || event.pointerType !== 'mouse' || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    x.set((event.clientX - rect.left) / rect.width - 0.5)
    y.set((event.clientY - rect.top) / rect.height - 0.5)
  }
  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ transform: reduceMotion ? 'none' : transform, transformStyle: 'preserve-3d' }}
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
