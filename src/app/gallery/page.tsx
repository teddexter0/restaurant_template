// FILE: src/app/gallery/page.tsx
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { XMarkIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [activeCategory, setActiveCategory] = useState('all')

  const galleryItems = [
    { id: 1, src: '/images/gallery/gallery-1.jpg', alt: 'Signature Pasta Dish', category: 'food' },
    { id: 2, src: '/images/gallery/gallery-2.jpg', alt: 'Restaurant Interior', category: 'interior' },
    { id: 3, src: '/images/gallery/gallery-3.jpg', alt: 'Grilled Salmon', category: 'food' },
    { id: 4, src: '/images/gallery/gallery-4.jpg', alt: 'Private Dining Room', category: 'interior' },
    { id: 5, src: '/images/gallery/gallery-5.jpg', alt: 'Dessert Special', category: 'food' },
    { id: 6, src: '/images/gallery/gallery-6.jpg', alt: 'Main Dining Area', category: 'interior' },
    { src: '/images/hero/dish-1.jpg', alt: 'Chef Special', category: 'food' },
    { src: '/images/hero/dish-2.jpg', alt: 'Premium Steak', category: 'food' },
    { src: '/images/restaurant-interior.jpg', alt: 'Elegant Ambiance', category: 'interior' },
  ]

  const categories = [
    { id: 'all', name: 'All', count: galleryItems.length },
    { id: 'food', name: 'Food', count: galleryItems.filter(item => item.category === 'food').length },
    { id: 'interior', name: 'Interior', count: galleryItems.filter(item => item.category === 'interior').length },
  ]

  const filteredImages = activeCategory === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeCategory)

  const openLightbox = (index: number) => {
    setSelectedImage(index)
  }

  const closeLightbox = () => {
    setSelectedImage(null)
  }

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % filteredImages.length)
    }
  }

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? filteredImages.length - 1 : selectedImage - 1)
    }
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-primary-50 via-warm-50 to-accent-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-gradient mb-6">Gallery</h1>
            <p className="text-xl md:text-2xl text-secondary-600 max-w-4xl mx-auto leading-relaxed">
              Take a visual journey through Savoro&apos;s culinary artistry and elegant atmosphere. 
              From our signature dishes to our beautifully designed spaces.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div 
            className="flex justify-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex bg-warm-100 rounded-full p-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                    activeCategory === category.id
                      ? 'bg-primary-500 text-white shadow-lg'
                      : 'text-secondary-600 hover:text-primary-600'
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
          </motion.div>

          {/* Gallery Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            layout
          >
            <AnimatePresence>
              {filteredImages.map((item, index) => (
                <motion.div
                  key={item.src}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5 }}
                  className="group cursor-pointer"
                  onClick={() => openLightbox(index)}
                >
                  <div className="aspect-square relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:scale-105">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <h3 className="font-bold text-lg">{item.alt}</h3>
                      <p className="text-sm text-white/80 capitalize">{item.category}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <motion.div
              className="relative max-w-4xl max-h-full"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-auto max-h-[80vh] rounded-lg overflow-hidden">
                <Image
                  src={filteredImages[selectedImage].src}
                  alt={filteredImages[selectedImage].alt}
                  width={800}
                  height={600}
                  className="object-contain max-h-[80vh]"
                />
              </div>
              
              <div className="absolute bottom-4 left-4 right-4 text-white text-center">
                <h3 className="text-xl font-bold">{filteredImages[selectedImage].alt}</h3>
                <p className="text-white/80 capitalize">{filteredImages[selectedImage].category}</p>
              </div>

              {/* Navigation Buttons */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm rounded-full p-3 text-white hover:bg-white/30 transition-colors"
              >
                <ChevronLeftIcon className="w-6 h-6" />
              </button>
              
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm rounded-full p-3 text-white hover:bg-white/30 transition-colors"
              >
                <ChevronRightIcon className="w-6 h-6" />
              </button>

              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-3 text-white hover:bg-white/30 transition-colors"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}