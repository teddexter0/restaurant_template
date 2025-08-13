// FILE: src/lib/constants.ts

// Restaurant Information
export const RESTAURANT_INFO = {
  name: 'Savoro Restaurant',
  tagline: 'Where culinary artistry meets exceptional dining',
  description: 'Experience flavors that tell stories and moments that become memories.',
  
  // Contact Information
  contact: {
    phone: '+1 (555) 123-4567',
    email: 'hello@savoro.restaurant',
    address: {
      street: '123 Culinary Street',
      city: 'Gourmet District',
      state: 'CA',
      zip: '90210',
      country: 'USA'
    }
  },
  
  // Business Hours
  hours: {
    monday: { open: '11:00', close: '23:00', closed: false },
    tuesday: { open: '11:00', close: '23:00', closed: false },
    wednesday: { open: '11:00', close: '23:00', closed: false },
    thursday: { open: '11:00', close: '23:00', closed: false },
    friday: { open: '11:00', close: '23:00', closed: false },
    saturday: { open: '11:00', close: '23:00', closed: false },
    sunday: { open: '11:00', close: '23:00', closed: false }
  },
  
  // Social Media
  social: {
    facebook: 'https://facebook.com/savoro',
    instagram: 'https://instagram.com/savoro',
    twitter: 'https://twitter.com/savoro',
    youtube: 'https://youtube.com/savoro'
  }
}

// Menu Categories
export const MENU_CATEGORIES = [
  { id: 'appetizers', name: 'Appetizers', icon: '🥗' },
  { id: 'mains', name: 'Main Courses', icon: '🍽️' },
  { id: 'desserts', name: 'Desserts', icon: '🍰' },
  { id: 'beverages', name: 'Beverages', icon: '🥂' },
  { id: 'wines', name: 'Wine Selection', icon: '🍷' },
  { id: 'specials', name: 'Chef Specials', icon: '⭐' }
] as const

// Navigation Links
export const NAVIGATION_LINKS = [
  { name: 'Home', href: '/', external: false },
  { name: 'About', href: '/about', external: false },
  { name: 'Menu', href: '/menu', external: false },
  { name: 'Gallery', href: '/gallery', external: false },
  { name: 'Contact', href: '/contact', external: false },
  { name: 'Reservations', href: '/reservations', external: false }
] as const

// Feature Highlights
export const FEATURES = [
  {
    icon: '👨‍🍳',
    title: 'Expert Chefs',
    description: 'World-class culinary expertise in every dish'
  },
  {
    icon: '🌿',
    title: 'Fresh Ingredients',
    description: 'Locally sourced, premium quality ingredients'
  },
  {
    icon: '❤️',
    title: 'Made with Love',
    description: 'Every meal prepared with passion and care'
  },
  {
    icon: '🏆',
    title: 'Award Winning',
    description: 'Recognized for culinary excellence'
  },
  {
    icon: '🍷',
    title: 'Wine Selection',
    description: 'Curated wines from around the world'
  },
  {
    icon: '🎵',
    title: 'Live Music',
    description: 'Enjoy live performances while you dine'
  }
] as const

// Statistics
export const STATS = [
  { number: '1000+', label: 'Happy Customers', icon: '😊' },
  { number: '50+', label: 'Signature Dishes', icon: '🍽️' },
  { number: '15', label: 'Years Experience', icon: '⭐' },
  { number: '24/7', label: 'Service', icon: '🕐' }
] as const

// Sample Menu Items (for demo)
export const SAMPLE_MENU_ITEMS = [
  {
    id: 1,
    name: 'Truffle Risotto',
    description: 'Creamy arborio rice with black truffle and aged parmesan',
    price: 28,
    category: 'mains',
    image: '/images/menu/risotto.jpg',
    dietary: ['vegetarian'],
    popular: true
  },
  {
    id: 2,
    name: 'Wagyu Steak',
    description: 'Premium wagyu beef with seasonal vegetables and red wine jus',
    price: 45,
    category: 'mains',
    image: '/images/menu/steak.jpg',
    dietary: ['gluten-free'],
    popular: true
  },
  {
    id: 3,
    name: 'Chocolate Soufflé',
    description: 'Decadent chocolate soufflé with vanilla bean ice cream',
    price: 12,
    category: 'desserts',
    image: '/images/menu/souffle.jpg',
    dietary: ['vegetarian'],
    popular: false
  }
] as const

// Gallery Categories
export const GALLERY_CATEGORIES = [
  { id: 'all', name: 'All' },
  { id: 'food', name: 'Food' },
  { id: 'interior', name: 'Interior' },
  { id: 'events', name: 'Events' }
] as const

// Testimonials
export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Food Critic',
    content: 'Absolutely extraordinary! The flavors are perfectly balanced and the presentation is art.',
    rating: 5,
    image: '/images/testimonials/sarah.jpg',
    verified: true
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Regular Customer',
    content: 'Best dining experience in the city. The ambiance and service are unmatched.',
    rating: 5,
    image: '/images/testimonials/michael.jpg',
    verified: true
  },
  {
    id: 3,
    name: 'Emma Rodriguez',
    role: 'Chef',
    content: 'As a fellow chef, I can appreciate the skill and creativity in every dish.',
    rating: 5,
    image: '/images/testimonials/emma.jpg',
    verified: true
  }
] as const

// SEO and Meta Information
export const SEO_CONFIG = {
  defaultTitle: 'Savoro Restaurant - Exquisite Dining Experience',
  titleTemplate: '%s | Savoro Restaurant',
  defaultDescription: 'Experience culinary excellence at Savoro Restaurant. Fresh ingredients, innovative dishes, and exceptional service in an elegant atmosphere.',
  siteUrl: 'https://savoro.restaurant',
  defaultImage: '/images/og-image.jpg',
  twitterHandle: '@savororestaurant'
}

// Contact Form Configuration
export const CONTACT_SUBJECTS = [
  'General Inquiry',
  'Dinner Reservation',
  'Lunch Reservation',
  'Private Events',
  'Catering Services',
  'Special Occasions',
  'Dietary Requirements',
  'Feedback',
  'Careers',
  'Other'
] as const

// Animation Configuration
export const ANIMATION_CONFIG = {
  duration: {
    fast: 0.2,
    normal: 0.3,
    slow: 0.5,
    verySlow: 0.8
  },
  easing: {
    default: [0.4, 0, 0.2, 1],
    bounce: [0.68, -0.55, 0.265, 1.55],
    sharp: [0.4, 0, 1, 1]
  }
}

// Theme Colors (for dynamic theming)
export const THEME_COLORS = {
  primary: {
    50: '#fef7ee',
    100: '#fdecd3',
    200: '#fbd5a5',
    300: '#f7b96c',
    400: '#f39331',
    500: '#ea7c2a',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f'
  },
  secondary: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a'
  }
}

// API Configuration
export const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || '',
  timeout: 10000,
  retries: 3
}

// Error Messages
export const ERROR_MESSAGES = {
  generic: 'Something went wrong. Please try again.',
  network: 'Network error. Please check your connection.',
  validation: 'Please check your input and try again.',
  notFound: 'The requested resource was not found.',
  unauthorized: 'You are not authorized to perform this action.',
  serverError: 'Server error. Please try again later.'
} as const