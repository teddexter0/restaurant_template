// FILE: src/components/ui/Modal.tsx
'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { cn } from '@/lib/utils'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  title?: string
  description?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  closeOnOverlay?: boolean
  showCloseButton?: boolean
  className?: string
}

const Modal = ({
  isOpen,
  onClose,
  children,
  title,
  description,
  size = 'md',
  closeOnOverlay = true,
  showCloseButton = true,
  className
}: ModalProps) => {
  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden' // Prevent background scroll
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-[95vw] max-h-[95vh]'
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeOnOverlay ? onClose : undefined}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              className={cn(
                'relative w-full bg-white rounded-2xl shadow-2xl',
                sizeClasses[size],
                className
              )}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ 
                duration: 0.2, 
                type: "spring", 
                stiffness: 300, 
                damping: 30 
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              {(title || showCloseButton) && (
                <div className="flex items-center justify-between p-6 border-b border-warm-200">
                  <div>
                    {title && (
                      <h2 className="text-2xl font-bold text-secondary-900">
                        {title}
                      </h2>
                    )}
                    {description && (
                      <p className="text-secondary-600 mt-1">
                        {description}
                      </p>
                    )}
                  </div>
                  
                  {showCloseButton && (
                    <button
                      onClick={onClose}
                      className="p-2 text-secondary-400 hover:text-secondary-600 hover:bg-warm-100 rounded-full transition-colors duration-200"
                    >
                      <XMarkIcon className="w-6 h-6" />
                    </button>
                  )}
                </div>
              )}

              {/* Content */}
              <div className={cn(
                'p-6',
                size === 'full' && 'max-h-[80vh] overflow-y-auto'
              )}>
                {children}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}

// Modal Trigger Component
interface ModalTriggerProps {
  children: React.ReactNode
  modal: React.ReactNode
  title?: string
  description?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
}

const ModalTrigger = ({ 
  children, 
  modal, 
  title, 
  description, 
  size = 'md' 
}: ModalTriggerProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div onClick={() => setIsOpen(true)}>
        {children}
      </div>
      
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={title}
        description={description}
        size={size}
      >
        {modal}
      </Modal>
    </>
  )
}

// Confirmation Modal Component
interface ConfirmModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  description: string
  confirmText?: string
  cancelText?: string
  variant?: 'danger' | 'warning' | 'info'
}

const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'info'
}: ConfirmModalProps) => {
  const handleConfirm = () => {
    onConfirm()
    onClose()
  }

  const variantColors = {
    danger: 'bg-red-500 hover:bg-red-600',
    warning: 'bg-yellow-500 hover:bg-yellow-600',
    info: 'bg-primary-500 hover:bg-primary-600'
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="sm"
      title={title}
      description={description}
    >
      <div className="flex space-x-4 justify-end mt-6">
        <button
          onClick={onClose}
          className="px-4 py-2 text-secondary-600 hover:text-secondary-800 font-medium transition-colors duration-200"
        >
          {cancelText}
        </button>
        <button
          onClick={handleConfirm}
          className={cn(
            'px-6 py-2 text-white font-semibold rounded-lg transition-colors duration-200',
            variantColors[variant]
          )}
        >
          {confirmText}
        </button>
      </div>
    </Modal>
  )
}

export { Modal, ModalTrigger, ConfirmModal }