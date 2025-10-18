import React from 'react'
import { cn } from '@/lib/utils'

// Timeline Container
interface TimelineProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const Timeline = React.forwardRef<HTMLDivElement, TimelineProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('relative flex flex-col space-y-8', className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)
Timeline.displayName = 'Timeline'

// Timeline Item
interface TimelineItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const TimelineItem = React.forwardRef<HTMLDivElement, TimelineItemProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('relative flex gap-4', className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)
TimelineItem.displayName = 'TimelineItem'

// Timeline Connector (the line between items)
interface TimelineConnectorProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

const TimelineConnector = React.forwardRef<HTMLDivElement, TimelineConnectorProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'absolute left-6 top-10 h-full w-0.5 bg-border -translate-x-1/2',
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
TimelineConnector.displayName = 'TimelineConnector'

// Timeline Icon
interface TimelineIconProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
}

const TimelineIcon = React.forwardRef<HTMLDivElement, TimelineIconProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex h-12 w-12 shrink-0 items-center justify-center rounded-full border bg-background',
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
TimelineIcon.displayName = 'TimelineIcon'

// Timeline Header
interface TimelineHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const TimelineHeader = React.forwardRef<HTMLDivElement, TimelineHeaderProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex flex-col space-y-1 flex-1', className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)
TimelineHeader.displayName = 'TimelineHeader'

// Timeline Body
interface TimelineBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const TimelineBody = React.forwardRef<HTMLDivElement, TimelineBodyProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('mt-2 text-sm text-muted-foreground', className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)
TimelineBody.displayName = 'TimelineBody'

// Timeline Content (wrapper for header and body)
interface TimelineContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const TimelineContent = React.forwardRef<HTMLDivElement, TimelineContentProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex-1 space-y-2', className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)
TimelineContent.displayName = 'TimelineContent'

// Timeline Date
interface TimelineDateProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const TimelineDate = React.forwardRef<HTMLDivElement, TimelineDateProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('text-sm text-muted-foreground mt-1', className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)
TimelineDate.displayName = 'TimelineDate'

// Timeline Title
interface TimelineTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode
}

const TimelineTitle = React.forwardRef<HTMLHeadingElement, TimelineTitleProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <h3
        ref={ref}
        className={cn('text-lg font-semibold leading-none', className)}
        {...props}
      >
        {children}
      </h3>
    )
  }
)
TimelineTitle.displayName = 'TimelineTitle'

// Timeline Description
interface TimelineDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode
}

const TimelineDescription = React.forwardRef<HTMLParagraphElement, TimelineDescriptionProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn('text-sm text-muted-foreground', className)}
        {...props}
      >
        {children}
      </p>
    )
  }
)
TimelineDescription.displayName = 'TimelineDescription'

export {
  Timeline,
  TimelineItem,
  TimelineConnector,
  TimelineIcon,
  TimelineHeader,
  TimelineBody,
  TimelineContent,
  TimelineDate,
  TimelineTitle,
  TimelineDescription,
}