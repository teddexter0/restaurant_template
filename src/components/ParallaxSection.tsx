'use client'

import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform } from '@/lib/motion' // ✅ import from shim

interface ParallaxSectionProps {
  children: React.ReactNode
  className?: string
  speed?: 'slow' | 'medium' | 'fast'
  direction?: 'up' | 'down'
}

export default function ParallaxSection({
  children,
  className = '',
  speed = 'medium',
  direction = 'up',
}: ParallaxSectionProps) {
  // ✅ Explicit HTMLElement ref so Framer Motion is happy
  const ref = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const speedMap = {
    slow: 50,
    medium: 100,
    fast: 150,
  }

  const moveDistance = speedMap[speed]
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    direction === 'up'
      ? [moveDistance, -moveDistance]
      : [-moveDistance, moveDistance]
  )

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0, 1, 1, 0]
  )

  useEffect(() => {
    const updateParallax = () => {
      if (!ref.current) return
      const scrolled = window.pageYOffset
      const rate = scrolled * -0.5

      ref.current.style.setProperty('--parallax-slow', `${rate * 0.3}px`)
      ref.current.style.setProperty('--parallax-medium', `${rate * 0.6}px`)
      ref.current.style.setProperty('--parallax-fast', `${rate * 1.2}px`)
    }

    window.addEventListener('scroll', updateParallax)
    return () => window.removeEventListener('scroll', updateParallax)
  }, [])

  return (
    <motion.section
      ref={ref}
      className={`relative ${className}`}
      style={{ y, opacity }}
    >
      {children}
    </motion.section>
  )
}
