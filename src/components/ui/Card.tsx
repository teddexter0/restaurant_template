// FILE: src/components/ui/Card.tsx
import { forwardRef, HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'elevated' | 'outlined'
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', padding = 'md', children, ...props }, ref) => {
    const variants = {
      default: 'bg-white/80 backdrop-blur-sm border border-warm-200 shadow-lg hover:shadow-xl',
      glass: 'bg-white/10 backdrop-blur-md border border-white/20 shadow-xl',
      elevated: 'bg-white shadow-2xl border-0',
      outlined: 'bg-transparent border-2 border-primary-200 hover:border-primary-400'
    }

    const paddings = {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8'
    }

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-2xl transition-all duration-300',
          variants[variant],
          paddings[padding],
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'

// Card Header Component
type CardHeaderProps = HTMLAttributes<HTMLDivElement>

const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-col space-y-1.5 mb-6', className)}
      {...props}
    />
  )
)

CardHeader.displayName = 'CardHeader'

// Card Title Component
type CardTitleProps = HTMLAttributes<HTMLHeadingElement>

const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn('text-2xl font-bold leading-none tracking-tight text-secondary-900', className)}
      {...props}
    />
  )
)

CardTitle.displayName = 'CardTitle'

// Card Description Component
type CardDescriptionProps = HTMLAttributes<HTMLParagraphElement>

const CardDescription = forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('text-secondary-600 leading-relaxed', className)}
      {...props}
    />
  )
)

CardDescription.displayName = 'CardDescription'

// Card Content Component
type CardContentProps = HTMLAttributes<HTMLDivElement>

const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('text-secondary-700', className)}
      {...props}
    />
  )
)

CardContent.displayName = 'CardContent'

// Card Footer Component
type CardFooterProps = HTMLAttributes<HTMLDivElement>

const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-center justify-between mt-6 pt-6 border-t border-warm-200', className)}
      {...props}
    />
  )
)

CardFooter.displayName = 'CardFooter'

export { 
  Card, 
  CardHeader, 
  CardFooter, 
  CardTitle, 
  CardDescription, 
  CardContent 
}