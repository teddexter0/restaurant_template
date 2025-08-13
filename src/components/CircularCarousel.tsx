// FILE: src/components/CircularCarousel.tsx
'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from '@/lib/motion'
import Image from 'next/image'

interface CarouselImage {
  src: string
  alt: string
}

interface CircularCarouselProps {
  images: CarouselImage[]
  autoPlay?: boolean
  interval?: number
}

export default function CircularCarousel({ 
  images, 
  autoPlay = true, 
  interval = 4000 
}: CircularCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    if (!autoPlay || isHovered) return

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, interval)

    return () => clearInterval(timer)
  }, [autoPlay, interval, isHovered, images.length])

  const getImageStyle = (index: number) => {
    const isActive = index === currentIndex
    const totalImages = images.length
    const angle = (360 / totalImages) * index
    const radius = isActive ? 0 : 120
    
    return {
      transform: `rotate(${angle}deg) translateX(${radius}px) rotate(-${angle}deg)`,
      zIndex: isActive ? 10 : 1,
      scale: isActive ? 1.2 : 0.7,
      opacity: isActive ? 1 : 0.6
    }
  }

  return (
    <div 
      className="relative w-64 h-64 flex items-center justify-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main circular container */}
      <div className="relative w-full h-full">
        {images.map((image, index) => {
          const isActive = index === currentIndex
          const style = getImageStyle(index)
          
          return (
            <motion.div
              key={`${image.src}-${index}`}
              className="absolute top-1/2 left-1/2 cursor-pointer"
              style={{
                width: isActive ? '120px' : '80px',
                height: isActive ? '120px' : '80px',
                marginLeft: isActive ? '-60px' : '-40px',
                marginTop: isActive ? '-60px' : '-40px',
              }}
              animate={style}
              transition={{ 
                duration: 0.8, 
                ease: "easeInOut",
                type: "spring",
                stiffness: 100,
                damping: 20
              }}
              onClick={() => setCurrentIndex(index)}
              whileHover={{ scale: isActive ? 1.3 : 0.8 }}
              whileTap={{ scale: isActive ? 1.1 : 0.6 }}
            >
              {/* Portal effect wrapper */}
              <div className={`image-portal w-full h-full ${isActive ? 'border-4 border-primary-400 shadow-2xl' : 'border-2 border-white/50'}`}>
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 120px, 80px"
                />
                
                {/* Active indicator glow */}
                {isActive && (
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-primary-300"
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.5, 0.8, 0.5]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                )}
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Center play/pause button */}
      <motion.button
        className="absolute z-20 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsHovered(!isHovered)}
      >
        <motion.div
          animate={{ rotate: isHovered ? 0 : 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        >
          {isHovered ? '⏸️' : '▶️'}
        </motion.div>
      </motion.button>

      {/* Progress indicators */}
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-primary-500 scale-125' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>

      {/* Floating animation particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-primary-400/40 rounded-full"
          style={{
            left: `${30 + Math.random() * 40}%`,
            top: `${30 + Math.random() * 40}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  )
}