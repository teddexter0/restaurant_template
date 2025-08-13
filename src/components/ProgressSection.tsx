// FILE: src/components/ProgressSection.tsx
'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface Stat {
  number: string
  label: string
  icon: string
}

interface ProgressSectionProps {
  stats: Stat[]
}

export default function ProgressSection({ stats }: ProgressSectionProps) {
  const [progress, setProgress] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-100px" })

  useEffect(() => {
    if (!inView) return

    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer)
          return 100
        }
        return prev + 2
      })
    }, 50)

    return () => clearInterval(timer)
  }, [inView])

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return
      
      const element = ref.current
      const rect = element.getBoundingClientRect()
      const windowHeight = window.innerHeight
      
      // Calculate scroll progress based on element position
      const elementTop = rect.top
      const elementHeight = rect.height
      
      let scrollProgress = 0
      if (elementTop < windowHeight && elementTop + elementHeight > 0) {
        scrollProgress = Math.max(0, Math.min(100, 
          ((windowHeight - elementTop) / (windowHeight + elementHeight)) * 100
        ))
      }
      
      setProgress(scrollProgress)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section ref={ref} className="section-padding bg-gradient-to-r from-primary-500 to-accent-500 text-white relative overflow-hidden">
      {/* Progress bar at top */}
      <div className="absolute top-0 left-0 w-full h-1 bg-white/20">
        <motion.div 
          className="progress-bar h-full"
          style={{ width: `${progress}%` }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      </div>

      {/* Floating background elements */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 bg-white/10 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 20, -20, 0],
              opacity: [0.3, 0.7, 0.3],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="container-custom relative z-10">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Our Success Story
          </h2>
          <div className="w-24 h-1 bg-white mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.2,
                type: "spring",
                stiffness: 100
              }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              {/* Icon with progress circle */}
              <div className="relative mb-4 flex justify-center">
                <motion.div
                  className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-2xl backdrop-blur-sm"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                >
                  {stat.icon}
                </motion.div>
                
                {/* Progress circle */}
                <svg className="absolute inset-0 w-16 h-16 -rotate-90">
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth="2"
                    fill="none"
                  />
                  <motion.circle
                    cx="32"
                    cy="32"
                    r="28"
                    stroke="rgba(255,255,255,0.8)"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: inView ? 1 : 0 }}
                    transition={{ 
                      duration: 2, 
                      delay: index * 0.3,
                      ease: "easeInOut"
                    }}
                    style={{
                      strokeDasharray: "175.93", // 2π * 28
                    }}
                  />
                </svg>
              </div>

              {/* Number with counting animation */}
              <motion.div 
                className="text-3xl md:text-4xl font-bold mb-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 + 0.5 }}
                viewport={{ once: true }}
              >
                <CountingNumber target={stat.number} delay={index * 200} />
              </motion.div>

              {/* Label */}
              <motion.p 
                className="text-lg text-white/90 font-medium"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 + 0.7 }}
                viewport={{ once: true }}
              >
                {stat.label}
              </motion.p>

              {/* Progress indicator specific to this stat */}
              <div className="mt-3 w-full h-1 bg-white/20 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-white rounded-full"
                  initial={{ width: "0%" }}
                  whileInView={{ width: "100%" }}
                  transition={{ 
                    duration: 2, 
                    delay: index * 0.3 + 1,
                    ease: "easeOut"
                  }}
                  viewport={{ once: true }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Counting animation component
function CountingNumber({ target, delay = 0 }: { target: string; delay?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref)

  useEffect(() => {
    if (!inView) return

    const numericTarget = parseInt(target.replace(/\D/g, '')) || 0
    let startTime: number | null = null
    
    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime - delay
      const elapsed = currentTime - startTime
      const duration = 2000 // 2 seconds
      
      if (elapsed < duration) {
        const progress = elapsed / duration
        const easeOutProgress = 1 - Math.pow(1 - progress, 3) // ease-out cubic
        setCount(Math.floor(easeOutProgress * numericTarget))
        requestAnimationFrame(animate)
      } else {
        setCount(numericTarget)
      }
    }

    const timeoutId = setTimeout(() => {
      requestAnimationFrame(animate)
    }, delay)

    return () => clearTimeout(timeoutId)
  }, [target, delay, inView])

  const suffix = target.replace(/\d/g, '')
  
  return <span ref={ref}>{count}{suffix}</span>
}