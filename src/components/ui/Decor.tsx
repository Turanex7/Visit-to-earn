import { useEffect, useId } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/cn'
import { fireConfetti } from '@/lib/confetti'
import type { Rarity } from '@/types'

/** Subtle "şəbəkə" 8-point star lattice. */
export function PatternBackground({ className, opacity = 0.06 }: { className?: string; opacity?: number }) {
  const id = `sebeke-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`
  return (
    <svg
      aria-hidden
      className={cn('pointer-events-none absolute inset-0 size-full text-ivory', className)}
      style={{ opacity }}
    >
      <defs>
        <pattern id={id} width="56" height="56" patternUnits="userSpaceOnUse">
          <path d="M28 6 L33 23 L50 28 L33 33 L28 50 L23 33 L6 28 L23 23 Z" fill="none" stroke="currentColor" strokeWidth="1" />
          <rect x="18" y="18" width="20" height="20" transform="rotate(45 28 28)" fill="none" stroke="currentColor" strokeWidth="1" />
          <circle cx="0" cy="0" r="2" fill="currentColor" />
          <circle cx="56" cy="56" r="2" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  )
}

export function ButaLogo({ size = 96, animate = true, className }: { size?: number; animate?: boolean; className?: string }) {
  const gradientId = `buta-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`
  const draw = animate
    ? { initial: { pathLength: 0, opacity: 0 }, animate: { pathLength: 1, opacity: 1 } }
    : { initial: false as const }
  return (
    <svg viewBox="0 0 120 120" width={size} height={size} className={className} aria-hidden>
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#19B5C7" />
          <stop offset="1" stopColor="#F2B84B" />
        </linearGradient>
      </defs>
      <motion.path
        d="M66 10 C 100 28, 106 80, 72 102 C 48 117, 16 104, 16 78 C 16 56, 36 46, 54 52 C 68 57, 68 76, 56 80 C 48 83, 42 76, 46 70"
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
        transition={{ duration: 1.2, ease: 'easeInOut' }}
        {...draw}
      />
      <motion.circle
        cx="82"
        cy="42"
        r="6"
        fill="#C8283B"
        initial={animate ? { scale: 0 } : false}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: 'spring', stiffness: 400, damping: 12 }}
      />
    </svg>
  )
}

const RARITY_STYLES: Record<Rarity, string> = {
  common: 'border-rarity-common/50',
  rare: 'border-rarity-rare/70 shadow-[0_0_24px_-6px_var(--color-rarity-rare)]',
  epic: 'border-rarity-epic/70 shadow-[0_0_28px_-6px_var(--color-rarity-epic)]',
  legendary: 'border-rarity-legendary shadow-[0_0_32px_-4px_var(--color-rarity-legendary)]',
}

export function RarityFrame({ rarity, className, children }: { rarity: Rarity; className?: string; children: React.ReactNode }) {
  return <div className={cn('rounded-3xl border-2 bg-surface', RARITY_STYLES[rarity], className)}>{children}</div>
}

/** Fires once when `active` becomes true. */
export function ConfettiBurst({ active }: { active: boolean }) {
  useEffect(() => {
    if (active) fireConfetti()
  }, [active])
  return null
}
