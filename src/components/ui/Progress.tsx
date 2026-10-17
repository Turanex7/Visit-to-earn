import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Flame } from 'lucide-react'
import { cn } from '@/lib/cn'
import { formatNumber } from '@/lib/format'
import { xpToNextLevel } from '@/game/rules'

export function ProgressBar({
  value,
  className,
  barClassName,
  label,
}: {
  value: number
  className?: string
  barClassName?: string
  label?: string
}) {
  const pct = Math.max(0, Math.min(1, value)) * 100
  return (
    <div
      className={cn('h-2 w-full overflow-hidden rounded-full bg-white/10', className)}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(pct)}
      aria-label={label}
    >
      <motion.div
        className={cn('h-full rounded-full bg-primary', barClassName)}
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ type: 'spring', damping: 26, stiffness: 120 }}
      />
    </div>
  )
}

export function ProgressRing({
  value,
  size = 56,
  stroke = 6,
  color = 'var(--color-primary)',
  children,
}: {
  value: number
  size?: number
  stroke?: number
  color?: string
  children?: React.ReactNode
}) {
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const pct = Math.max(0, Math.min(1, value))
  return (
    <div className="relative inline-grid place-items-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90" aria-hidden>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth={stroke} />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: c * (1 - pct) }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-sm font-extrabold">{children}</div>
    </div>
  )
}

export function XPBar({ level, xp, compact = false }: { level: number; xp: number; compact?: boolean }) {
  const { t } = useTranslation()
  const max = xpToNextLevel(level)
  return (
    <div className="flex w-full flex-col gap-1">
      <ProgressBar
        value={xp / max}
        className={compact ? 'h-1.5' : 'h-2.5'}
        barClassName="bg-gradient-to-r from-gold to-[#ffd98a] shadow-[0_0_12px_rgba(242,184,75,0.6)]"
        label={t('hud.xp', { xp: formatNumber(xp), max: formatNumber(max) })}
      />
      <span className={cn('font-bold tabular-nums text-muted', compact ? 'text-[11px]' : 'text-xs')}>
        {t('hud.xp', { xp: formatNumber(xp), max: formatNumber(max) })}
      </span>
    </div>
  )
}

export function LevelBadge({ level, size = 'md' }: { level: number; size?: 'sm' | 'md' | 'lg' }) {
  const { t } = useTranslation()
  const sizes = { sm: 'size-7 text-xs', md: 'size-9 text-sm', lg: 'size-14 text-xl' }
  return (
    <span
      className={cn(
        'relative inline-grid shrink-0 place-items-center font-black text-bg [clip-path:polygon(50%_0,93%_25%,93%_75%,50%_100%,7%_75%,7%_25%)]',
        'bg-gradient-to-b from-[#ffd98a] to-gold',
        sizes[size],
      )}
      aria-label={t('hud.level', { level })}
    >
      {level}
    </span>
  )
}

export function StreakFlame({ days }: { days: number }) {
  const { t } = useTranslation()
  const active = days > 0
  return (
    <span
      className={cn(
        'inline-flex h-11 items-center gap-1 rounded-full px-3 text-sm font-extrabold tabular-nums',
        active ? 'bg-nar/18 text-[#ff8a5b]' : 'bg-white/6 text-muted',
      )}
      aria-label={t('hud.streak', { count: days })}
      title={t('hud.streak', { count: days })}
    >
      <Flame className={cn('size-5', active && 'fill-[#ff8a5b]/40')} aria-hidden />
      {days}
    </span>
  )
}
