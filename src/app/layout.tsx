// FILE: src/app/layout.tsx
import './globals.css'
import type { Metadata } from 'next'
import { Inter, Playfair_Display, Dancing_Script } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Script from 'next/script'
import { GA_TRACKING_ID } from '@/lib/gtag'

// Fonts
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const playfair = Playfair_Display({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-playfair'
})
const dancingScript = Dancing_Script({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-script'
})

// Metadata
export const metadata: Metadata = {
  metadataBase: new URL(process.env.VERCEL_URL 
    ? `https://${process.env.VERCEL_URL}` 
    : 'http://localhost:3000'),
  title: 'Savoro Restaurant - Exquisite Dining Experience',
  description: 'Experience culinary excellence at Savoro Restaurant. Fresh ingredients, innovative dishes, and exceptional service in an elegant atmosphere.',
  keywords: 'restaurant, fine dining, culinary, gourmet, food, dining experience',
  authors: [{ name: 'Savoro Restaurant' }],
  openGraph: {
    title: 'Savoro Restaurant - Exquisite Dining Experience',
    description: 'Experience culinary excellence at Savoro Restaurant. Fresh ingredients, innovative dishes, and exceptional service.',
    type: 'website',
    locale: 'en_US',
    images: ['/images/hero/og-image.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Savoro Restaurant - Exquisite Dining Experience',
    description: 'Experience culinary excellence at Savoro Restaurant.',
    images: ['/images/hero/og-image.jpg'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${dancingScript.variable}`}>
      <head>
        {/* Google Analytics */}
        {GA_TRACKING_ID && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
            />
            <Script
              id="gtag-init"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html:
                  "window.dataLayer=window.dataLayer||[];" +
                  "function gtag(){dataLayer.push(arguments);}" +
                  "gtag('js', new Date());" +
                  `gtag('config', '${GA_TRACKING_ID}', {page_path: window.location.pathname});`
              }}
            />
          </>
        )}
      </head>
      <body className={`${inter.className} bg-warm-50 min-h-screen overflow-x-hidden`}>
        <Header />
        <main className="relative">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
