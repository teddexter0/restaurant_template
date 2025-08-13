// FILE: src/components/Footer.tsx
'use client'
import { motion, AnimatePresence } from '@/lib/motion'
import Link from 'next/link'
import { MapPinIcon, PhoneIcon, EnvelopeIcon, ClockIcon } from '@heroicons/react/24/outline'
import { UtensilsIcon, FacebookIcon, InstagramIcon, TwitterIcon } from 'lucide-react'

export default function Footer() {
  const quickLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Menu', href: '/menu' },
    { name: 'Reservations', href: '/reservations' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Contact', href: '/contact' },
    { name: 'Careers', href: '/careers' },
  ]

  const menuCategories = [
    { name: 'Appetizers', href: '/menu#appetizers' },
    { name: 'Main Courses', href: '/menu#mains' },
    { name: 'Desserts', href: '/menu#desserts' },
    { name: 'Beverages', href: '/menu#beverages' },
    { name: 'Wine List', href: '/menu#wines' },
    { name: 'Chef Special', href: '/menu#specials' },
  ]

  const socialLinks = [
    {
      name: 'Facebook',
      href: 'https://facebook.com/savoro',
      icon: <FacebookIcon className="w-5 h-5" />,
    },
    {
      name: 'Instagram', 
      href: 'https://instagram.com/savoro',
      icon: <InstagramIcon className="w-5 h-5" />,
    },
    {
      name: 'Twitter',
      href: 'https://twitter.com/savoro', 
      icon: <TwitterIcon className="w-5 h-5" />,
    },
  ]

  const contactInfo = [
    {
      icon: <MapPinIcon className="w-5 h-5" />,
      label: 'Address',
      value: '123 Culinary Street, Gourmet District, City 12345'
    },
    {
      icon: <PhoneIcon className="w-5 h-5" />,
      label: 'Phone',
      value: '+1 (555) 123-4567'
    },
    {
      icon: <EnvelopeIcon className="w-5 h-5" />,
      label: 'Email',
      value: 'hello@savoro.restaurant'
    },
    {
      icon: <ClockIcon className="w-5 h-5" />,
      label: 'Hours',
      value: 'Mon-Sun: 11:00 AM - 11:00 PM'
    }
  ]

  return (
    <footer className="bg-gradient-to-br from-secondary-900 via-secondary-800 to-secondary-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M20 20c0 11.046-8.954 20-20 20s-20-8.954-20-20 8.954-20 20-20 20 8.954 20 20zm-20-8a8 8 0 100 16 8 8 0 000-16z'/%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Floating elements */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary-400/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="container-custom section-padding relative z-10">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">
          {/* Restaurant Info */}
          <motion.div 
            className="lg:col-span-1 space-y-6"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-primary-500 rounded-full">
                <UtensilsIcon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="script-font text-3xl font-bold text-primary-300">Savoro</h3>
                <p className="text-sm uppercase tracking-wider text-warm-300">Restaurant</p>
              </div>
            </div>
            
            <p className="text-warm-200 leading-relaxed">
              Experience culinary excellence in the heart of the city. Where every dish tells a story 
              and every meal becomes a cherished memory.
            </p>

            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-primary-500 transition-all duration-300 group"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="group-hover:text-white transition-colors">
                    {social.icon}
                  </div>
                  <span className="sr-only">{social.name}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-xl font-bold text-primary-300 mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="text-warm-200 hover:text-primary-300 transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-2 h-2 bg-primary-400 rounded-full mr-3 group-hover:scale-125 transition-transform duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Menu Categories */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h4 className="text-xl font-bold text-primary-300 mb-4">Our Menu</h4>
            <ul className="space-y-3">
              {menuCategories.map((category) => (
                <li key={category.name}>
                  <Link 
                    href={category.href} 
                    className="text-warm-200 hover:text-primary-300 transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-2 h-2 bg-accent-400 rounded-full mr-3 group-hover:scale-125 transition-transform duration-300" />
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <h4 className="text-xl font-bold text-primary-300 mb-4">Contact Info</h4>
            <div className="space-y-4">
              {contactInfo.map((info) => (
                <div key={info.label} className="flex items-start space-x-3">
                  <div className="text-primary-400 mt-1 flex-shrink-0">
                    {info.icon}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-primary-300">{info.label}</p>
                    <p className="text-warm-200">{info.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Newsletter Signup */}
            <div className="mt-8 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
              <h5 className="text-primary-300 font-semibold mb-3">Stay Updated</h5>
              <p className="text-sm text-warm-200 mb-4">Get the latest news and special offers</p>
              <div className="flex space-x-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-warm-300 focus:outline-none focus:border-primary-400 text-sm"
                />
                <button className="bg-primary-500 hover:bg-primary-600 px-4 py-2 rounded-lg text-white font-medium transition-colors duration-300 text-sm">
                  Subscribe
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer Bottom */}
        <motion.div 
          className="border-t border-white/10 mt-16 pt-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-sm text-warm-300">
              <p>© {new Date().getFullYear()} Savoro Restaurant. All rights reserved.</p>
              <div className="flex items-center space-x-4">
                <Link href="/privacy" className="hover:text-primary-300 transition-colors duration-300">
                  Privacy Policy
                </Link>
                <span>|</span>
                <Link href="/terms" className="hover:text-primary-300 transition-colors duration-300">
                  Terms of Service
                </Link>
                <span>|</span>
                <Link href="/accessibility" className="hover:text-primary-300 transition-colors duration-300">
                  Accessibility
                </Link>
              </div>
            </div>
            
            <div className="text-sm text-warm-300">
              Made with <span className="text-red-400">♥</span> for food lovers
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}