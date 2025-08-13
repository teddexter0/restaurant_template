// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
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
        },
        accent: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0f766e',
          700: '#115e59',
          800: '#134e4a',
          900: '#042f2e'
        },
        warm: {
          50: '#fdf8f3',
          100: '#fbeed8',
          200: '#f6d9ab',
          300: '#f0bf73',
          400: '#ea9a39',
          500: '#e67e22',
          600: '#d4611a',
          700: '#b04918',
          800: '#8e3a1a',
          900: '#743219'
        }
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'sans-serif'],
        playfair: ['var(--font-playfair)', 'Playfair Display', 'serif'],
        script: ['var(--font-script)', 'Dancing Script', 'cursive'],
      },
    },
  },
  plugins: [],
}