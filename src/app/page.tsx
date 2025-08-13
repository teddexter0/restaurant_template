// FILE: src/app/page.tsx - REPLACE ENTIRE FILE
'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useInView } from '@/lib/motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRightIcon, StarIcon, ClockIcon, MapPinIcon, PhoneIcon } from '@heroicons/react/24/outline'
import { ChefHatIcon, UtensilsIcon, HeartIcon } from 'lucide-react'
import CircularCarousel from '@/components/CircularCarousel'
import ParallaxSection from '@/components/ParallaxSection'
import ProgressSection from '@/components/ProgressSection'

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  // Define all data arrays
  const heroImages = [
    { src: '/images/hero/dish-1.jpg', alt: 'Signature Pasta' },
    { src: '/images/hero/dish-2.jpg', alt: 'Grilled Salmon' },
    { src: '/images/hero/dish-3.jpg', alt: 'Artisan Pizza' },
    { src: '/images/hero/dish-4.jpg', alt: 'Premium Steak' },
    { src: '/images/hero/dish-5.jpg', alt: 'Dessert Special' },
  ]

  const stats = [
    { number: '1000+', label: 'Happy Customers', icon: '😊' },
    { number: '50+', label: 'Signature Dishes', icon: '🍽️' },
    { number: '15', label: 'Years Experience', icon: '⭐' },
    { number: '24/7', label: 'Service', icon: '🕐' },
  ]

  const services = [
    {
      title: "Sale",
      description: "We offer affordable sale of beautiful wedding accessories and gowns with unmatched quality and style.",
      icon: "💍"
    },
    {
      title: "Make Up",
      description: "Professional portable makeup services available before, during, or just before your wedding ceremony.",
      icon: "💄"
    },
    {
      title: "Hire",
      description: "Affordable rental of premium quality gowns with strict adherence to deadlines and excellent service.",
      icon: "👗"
    }
  ]

  const features = [
    {
      icon: <ChefHatIcon className="w-8 h-8" />,
      title: 'Expert Chefs',
      description: 'Our world-class chefs bring decades of culinary expertise to every dish.'
    },
    {
      icon: <UtensilsIcon className="w-8 h-8" />,
      title: 'Premium Ingredients',
      description: 'We source only the finest, freshest ingredients from local farms and suppliers.'
    },
    {
      icon: <HeartIcon className="w-8 h-8" />,
      title: 'Made with Love',
      description: 'Every meal is prepared with passion and attention to detail.'
    }
  ]

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Food Critic',
      content: 'Absolutely extraordinary! The flavors are perfectly balanced and the presentation is art.',
      rating: 5,
      image: '/images/testimonials/sarah.jpg'
    },
    {
      name: 'Michael Chen',
      role: 'Regular Customer',
      content: 'Best dining experience in the city. The ambiance and service are unmatched.',
      rating: 5,
      image: '/images/testimonials/michael.jpg'
    },
    {
      name: 'Emma Rodriguez',
      role: 'Chef',
      content: 'As a fellow chef, I can appreciate the skill and creativity in every dish.',
      rating: 5,
      image: '/images/testimonials/emma.jpg'
    }
  ]

  useEffect(() => {
    setIsLoaded(true)
    
    // Auto-rotate testimonials
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [testimonials.length])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div ref={containerRef} className="relative min-h-screen">
      {/* Hero Section with Parallax */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 hero-pattern">
          <motion.div 
            className="absolute inset-0 mesh-gradient"
            animate={{ 
              background: [
                'linear-gradient(45deg, rgba(234, 124, 42, 0.1) 0%, rgba(20, 184, 166, 0.1) 100%)',
                'linear-gradient(45deg, rgba(20, 184, 166, 0.1) 0%, rgba(234, 124, 42, 0.1) 100%)',
                'linear-gradient(45deg, rgba(234, 124, 42, 0.1) 0%, rgba(20, 184, 166, 0.1) 100%)'
              ]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        {/* Floating Elements */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-20 h-20 bg-primary-400/20 rounded-full blur-xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 15, -15, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5
            }}
          />
        ))}

        {/* Hero Content */}
        <motion.div 
          className="relative z-10 text-center px-4 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 50 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <motion.h1 
            className="text-6xl md:text-8xl font-playfair font-bold mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.8 }}
          >
            <span className="text-gradient">Savoro</span>
            <br />
            <span className="text-secondary-800">Restaurant</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-secondary-700 mb-8 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            Where culinary artistry meets exceptional dining. Experience flavors that tell stories and moments that become memories.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            <Link href="#menu" className="btn-primary group">
              View Menu 
              <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="#reservations" className="btn-outline">
              Make Reservation
            </Link>
          </motion.div>
        </motion.div>

        {/* Circular Carousel */}
        <motion.div 
          className="absolute bottom-20 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 2 }}
        >
          <CircularCarousel images={heroImages} />
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-primary-500 rounded-full relative">
            <motion.div 
              className="w-1 h-2 bg-primary-500 rounded-full absolute top-2 left-1/2 transform -translate-x-1/2"
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* Stats Section with Progress Animation */}
      <ProgressSection stats={stats} />

      {/* Features Section with Parallax */}
      <ParallaxSection className="section-padding bg-white">
        <div className="container-custom">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-gradient mb-6">Why Choose Savoro?</h2>
            <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
              We&apos;re passionate about creating exceptional dining experiences through quality, innovation, and service.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="card text-center group hover:scale-105 transition-all duration-300"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <div className="text-primary-500 mb-4 group-hover:text-accent-500 transition-colors duration-300 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 text-secondary-800">{feature.title}</h3>
                <div className="text-secondary-600 leading-relaxed">{feature.description}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </ParallaxSection>

      {/* Menu Preview Section */}
      <section className="section-padding bg-gradient-to-br from-warm-50 to-primary-50">
        <div className="container-custom">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-gradient mb-6">Our Signature Dishes</h2>
            <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
              Crafted with passion, served with pride. Discover our chef&apos;s masterpieces.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Truffle Risotto', price: '$28', image: '/images/menu/risotto.jpg', description: 'Creamy arborio rice with black truffle and parmesan' },
              { name: 'Wagyu Steak', price: '$45', image: '/images/menu/steak.jpg', description: 'Premium wagyu beef with seasonal vegetables' },
              { name: 'Chocolate Soufflé', price: '$12', image: '/images/menu/souffle.jpg', description: 'Decadent chocolate soufflé with vanilla ice cream' },
            ].map((dish, index) => (
              <motion.div
                key={dish.name}
                className="menu-item card group cursor-pointer"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="aspect-square relative mb-6 rounded-xl overflow-hidden">
                  <Image
                    src={dish.image}
                    alt={dish.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 right-4">
                    <span className="menu-price text-2xl font-bold text-white bg-primary-500 px-3 py-1 rounded-full">
                      {dish.price}
                    </span>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2 text-secondary-800">{dish.name}</h3>
                <p className="text-secondary-600">{dish.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <Link href="/menu" className="btn-primary">
              View Full Menu
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding bg-secondary-900 text-white relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-primary-400/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 5
              }}
            />
          ))}
        </div>

        <div className="container-custom relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-white mb-6">What Our Guests Say</h2>
            <p className="text-xl text-warm-200 max-w-3xl mx-auto">
              Don&apos;t just take our word for it. Hear from our satisfied customers.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <div className="glass-card p-8 mb-8">
                  <div className="flex justify-center mb-4">
                    {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                      <StarIcon key={i} className="w-6 h-6 text-primary-400 fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-xl md:text-2xl italic mb-6 text-warm-100">
                    &ldquo;{testimonials[activeTestimonial].content}&rdquo;
                  </blockquote>
                  <div className="flex items-center justify-center space-x-4">
                    <div className="w-12 h-12 relative rounded-full overflow-hidden">
                      <Image
                        src={testimonials[activeTestimonial].image}
                        alt={testimonials[activeTestimonial].name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-bold text-white">{testimonials[activeTestimonial].name}</p>
                      <p className="text-primary-300">{testimonials[activeTestimonial].role}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Testimonial Navigation */}
            <div className="flex justify-center space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeTestimonial 
                      ? 'bg-primary-400 scale-125' 
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact/Location Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-gradient mb-6">Visit Us Today</h2>
              <p className="text-xl text-secondary-600 mb-8">
                Experience exceptional dining in the heart of the city. We&apos;re open daily and ready to serve you.
              </p>

              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-primary-100 p-3 rounded-full">
                    <MapPinIcon className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-secondary-800">Address</h4>
                    <p className="text-secondary-600">123 Culinary Street, Gourmet District</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="bg-primary-100 p-3 rounded-full">
                    <PhoneIcon className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-secondary-800">Phone</h4>
                    <p className="text-secondary-600">+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="bg-primary-100 p-3 rounded-full">
                    <ClockIcon className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-secondary-800">Hours</h4>
                    <p className="text-secondary-600">Mon-Sun: 11:00 AM - 11:00 PM</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Link href="/contact" className="btn-primary">
                  Contact Us
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/restaurant-interior.jpg"
                  alt="Restaurant Interior"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              </div>
              
              {/* Floating reservation card */}
              <motion.div 
                className="absolute -bottom-6 -left-6 glass-card p-6 text-white"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <h3 className="script-font text-2xl text-primary-300 mb-2">Book Your Table</h3>
                <p className="text-warm-200 mb-4">Reserve your perfect dining experience</p>
                <Link href="/reservations" className="btn-secondary text-sm">
                  Make Reservation
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}