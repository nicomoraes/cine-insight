import * as React from 'react';

import { type VariantProps, cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const certificationBadgeVariants = cva(
  'inline-flex items-center rounded-md font-medium aspect-square leading-4 certification_text-shadow',
  {
    variants: {
      variant: {
        L: 'bg-[#66b331] text-[#FFFFFF] hover:bg-[#66b331]/80 px-3 py-2',
        '10': 'bg-[#f5ce11] text-[#FFFFFF] hover:bg-[#f5ce11]/80 p-2 ',
        '12': 'bg-[#f5ce11] text-[#FFFFFF] hover:bg-[#f5ce11]/80 p-2 ',
        '14': 'bg-[#ec6718] text-[#FFFFFF] hover:bg-[#ec6718]/80 p-2 ',
        '16': 'bg-[#e41421] text-[#FFFFFF] hover:bg-[#e41421]/80 p-2 ',
        '18': 'bg-[#050608] text-[#FFFFFF] hover:bg-[#050608]/80 p-2 ',
      },
    },
  },
);

export interface CertificationBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<NonNullable<typeof certificationBadgeVariants>> {}

function CertificationBadge({ className, variant, ...props }: CertificationBadgeProps) {
  if (!variant) return null;
  return (
    <div className={cn(certificationBadgeVariants({ variant }), className)} {...props}>
      {variant}
    </div>
  );
}

export { CertificationBadge, certificationBadgeVariants };
