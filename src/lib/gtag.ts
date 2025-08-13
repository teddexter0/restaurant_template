// FILE: src/lib/gtag.ts
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID || '';

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag && GA_TRACKING_ID) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    })
  }
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }: {
  action: string
  category: string
  label?: string
  value?: number
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

// Restaurant-specific tracking events
export const trackReservation = (partySize: number, date: string) => {
  event({
    action: 'reservation_request',
    category: 'Restaurant',
    label: `Party of ${partySize} for ${date}`,
    value: partySize
  })
}

export const trackMenuView = (section: string) => {
  event({
    action: 'menu_view',
    category: 'Menu',
    label: section
  })
}

export const trackContactForm = (type: 'contact' | 'reservation') => {
  event({
    action: 'form_submission',
    category: 'Contact',
    label: type
  })
}

// Declare gtag function for TypeScript
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event',
      targetId: string,
      config?: Record<string, unknown>
    ) => void
  }
}