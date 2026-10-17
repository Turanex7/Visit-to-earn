import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('rounded-3xl border border-white/8 bg-surface p-4', className)} {...props} />
}

type ChipTone = 'default' | 'primary' | 'gold' | 'nar' | 'success'

const CHIP_TONES: Record<ChipTone, string> = {
  default: 'bg-white/8 text-ivory',
  primary: 'bg-primary/15 text-primary',
  gold: 'bg-gold/15 text-gold',
  nar: 'bg-nar/20 text-nar-soft',
  success: 'bg-success/20 text-[#5fd08f]',
}

export function Chip({
  tone = 'default',
  icon,
  className,
  children,
}: {
  tone?: ChipTone
  icon?: ReactNode
  className?: string
  children: ReactNode
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold leading-5',
        CHIP_TONES[tone],
        className,
      )}
    >
      {icon}
      {children}
    </span>
  )
}
