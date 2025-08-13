// FILE: src/lib/utils.ts
import { clsx, type ClassValue } from "clsx"

// Simple utility without external dependencies
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

export function formatPhoneNumber(phoneNumber: string) {
  const cleaned = phoneNumber.replace(/\D/g, '')
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`
  }
  return phoneNumber
}

export function formatDate(date: string | Date) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount)
}