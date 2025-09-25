import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        // Scratchie brand variants
        carrot: "bg-scratchie-carrot text-white shadow-sm hover:bg-scratchie-carrot/90 focus-visible:ring-scratchie-carrot/50",
        "carrot-outline": "border border-scratchie-carrot text-scratchie-carrot bg-transparent shadow-sm hover:bg-scratchie-carrot hover:text-white",
        "carrot-ghost": "text-scratchie-carrot hover:bg-scratchie-carrot/10 hover:text-scratchie-carrot",
        cash: "bg-scratchie-cash text-white shadow-sm hover:bg-scratchie-cash/90 focus-visible:ring-scratchie-cash/50",
        "cash-outline": "border border-scratchie-cash text-scratchie-cash bg-transparent shadow-sm hover:bg-scratchie-cash hover:text-white",
        "cash-ghost": "text-scratchie-cash hover:bg-scratchie-cash/10 hover:text-scratchie-cash",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        xl: "h-12 rounded-lg px-10 text-base",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }