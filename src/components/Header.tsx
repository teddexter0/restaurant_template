// FILE: src/components/Header.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { motion, AnimatePresence } from '@/lib/motion'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { UtensilsIcon } from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      
      // Update active section based on scroll position
      const sections = ['hero', 'about', 'menu', 'testimonials', 'contact']
      const currentSection = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      
      if (currentSection) {
        setActiveSection(currentSection)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Menu', href: '/menu' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Contact', href: '/contact' },
    { name: 'Admin', href: '/admin' },
  ]

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <>
      <motion.header 
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-xl border-b border-warm-200' 
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <nav className="container-custom">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                href="/" 
                className="flex items-center space-x-3 group"
              >
                <div className={`p-2 rounded-full transition-all duration-300 ${
                  isScrolled 
                    ? 'bg-primary-500 text-white' 
                    : 'bg-white/20 backdrop-blur-sm text-white'
                }`}>
                  <UtensilsIcon className="w-6 h-6" />
                </div>
                <div>
                  <h1 className={`script-font text-3xl font-bold transition-colors duration-300 ${
                    isScrolled ? 'text-primary-600' : 'text-white'
                  }`}>
                    Savoro
                  </h1>
                  <p className={`text-xs uppercase tracking-wider transition-colors duration-300 ${
                    isScrolled ? 'text-secondary-500' : 'text-white/80'
                  }`}>
                    Restaurant
                  </p>
                </div>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navigation.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    className={`relative font-medium text-lg transition-all duration-300 group ${
                      pathname === item.href
                        ? isScrolled 
                          ? 'text-primary-600' 
                          : 'text-white'
                        : isScrolled 
                          ? 'text-secondary-700 hover:text-primary-600' 
                          : 'text-white/80 hover:text-white'
                    }`}
                  >
                    {item.name}
                    
                    {/* Animated underline */}
                    <motion.span
                      className={`absolute -bottom-1 left-0 h-0.5 rounded-full transition-colors duration-300 ${
                        isScrolled ? 'bg-primary-500' : 'bg-white'
                      }`}
                      initial={{ width: 0 }}
                      animate={{ 
                        width: pathname === item.href ? '100%' : '0%' 
                      }}
                      whileHover={{ width: '100%' }}
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <motion.div 
              className="hidden lg:block"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <Link 
                href="/reservations" 
                className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                  isScrolled
                    ? 'bg-primary-500 text-white hover:bg-primary-600 shadow-lg hover:shadow-xl'
                    : 'bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30'
                }`}
              >
                Book Table
              </Link>
            </motion.div>

            {/* Mobile Menu Button */}
            <motion.button
              type="button"
              onClick={toggleMenu}
              className={`lg:hidden p-2 rounded-lg transition-colors duration-300 ${
                isScrolled 
                  ? 'text-secondary-700 hover:bg-warm-100' 
                  : 'text-white hover:bg-white/20'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isMenuOpen ? 'close' : 'menu'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isMenuOpen ? (
                    <XMarkIcon className="h-6 w-6" />
                  ) : (
                    <Bars3Icon className="h-6 w-6" />
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleMenu}
            />
            
            {/* Mobile Menu */}
            <motion.div
              className="fixed top-0 right-0 z-50 w-80 h-full bg-white shadow-2xl lg:hidden overflow-y-auto"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              <div className="p-6">
                {/* Mobile Header */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-primary-500 text-white rounded-full">
                      <UtensilsIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="script-font text-2xl font-bold text-primary-600">Savoro</h2>
                      <p className="text-xs uppercase tracking-wider text-secondary-500">Restaurant</p>
                    </div>
                  </div>
                  <button
                    onClick={toggleMenu}
                    className="p-2 text-secondary-500 hover:bg-warm-100 rounded-lg transition-colors"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                {/* Mobile Navigation */}
                <nav className="space-y-2">
                  {navigation.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Link
                        href={item.href}
                        onClick={toggleMenu}
                        className={`block px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                          pathname === item.href
                            ? 'bg-primary-500 text-white shadow-lg'
                            : 'text-secondary-700 hover:bg-primary-50 hover:text-primary-600'
                        }`}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                {/* Mobile CTA */}
                <motion.div 
                  className="mt-8 pt-6 border-t border-warm-200"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <Link
                    href="/reservations"
                    onClick={toggleMenu}
                    className="block w-full text-center bg-primary-500 text-white font-semibold py-3 px-6 rounded-full hover:bg-primary-600 transition-colors duration-300 shadow-lg"
                  >
                    Book Your Table
                  </Link>
                </motion.div>

                {/* Contact Info */}
                <motion.div 
                  className="mt-6 pt-6 border-t border-warm-200 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  <p className="text-sm text-secondary-600">Call us today</p>
                  <p className="text-lg font-bold text-primary-600">+1 (555) 123-4567</p>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}