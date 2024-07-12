import * as React from 'react';

import { type VariantProps, cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center border font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
        outline: 'text-foreground',
      },
      round: {
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
        xl: 'rounded-xl',
        full: 'rounded-full',
      },
      sizes: {
        sm: 'px-2.5 py-0.5 text-xs',
        md: 'px-4 py-1 text-sm',
        lg: 'px-5 py-1.5 text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      round: 'full',
      sizes: 'sm',
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, round, sizes, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, round, sizes }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
