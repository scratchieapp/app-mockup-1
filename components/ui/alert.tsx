import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 text-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive:
          "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
        // Scratchie brand variants
        carrot:
          "border-scratchie-carrot/50 bg-scratchie-carrot/10 text-scratchie-carrot [&>svg]:text-scratchie-carrot",
        cash:
          "border-scratchie-cash/50 bg-scratchie-cash/10 text-scratchie-cash [&>svg]:text-scratchie-cash",
        success:
          "border-scratchie-cash/50 bg-scratchie-cash/10 text-scratchie-cash [&>svg]:text-scratchie-cash",
        warning:
          "border-scratchie-carrot/50 bg-scratchie-carrot/10 text-scratchie-carrot [&>svg]:text-scratchie-carrot",
        info:
          "border-blue-500/50 bg-blue-50 text-blue-700 [&>svg]:text-blue-700 dark:border-blue-500/50 dark:bg-blue-950/20 dark:text-blue-300 [&>svg]:dark:text-blue-300",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
))
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription }