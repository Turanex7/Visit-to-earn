import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/cn'

export function Stepper({ current, total }: { current: number; total: number }) {
  const { t } = useTranslation()
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-1.5" aria-hidden>
        {Array.from({ length: total }, (_, i) => (
          <span
            key={i}
            className={cn(
              'h-2 rounded-full transition-all duration-300',
              i + 1 === current ? 'w-6 bg-primary' : i + 1 < current ? 'w-2 bg-primary/60' : 'w-2 bg-white/15',
            )}
          />
        ))}
      </div>
      <span className="text-xs font-bold text-muted">{t('common.step', { current, total })}</span>
    </div>
  )
}

export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  label,
}: {
  options: { value: T; label: string }[]
  value: T
  onChange: (value: T) => void
  label: string
}) {
  return (
    <div role="tablist" aria-label={label} className="flex rounded-2xl bg-surface p-1">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          role="tab"
          aria-selected={opt.value === value}
          onClick={() => onChange(opt.value)}
          className={cn(
            'h-11 flex-1 rounded-xl text-sm font-bold transition',
            opt.value === value ? 'bg-surface-2 text-ivory shadow' : 'text-muted hover:text-ivory',
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}

function remaining(to: string) {
  const ms = Math.max(0, new Date(to).getTime() - Date.now())
  const s = Math.floor(ms / 1000)
  return { d: Math.floor(s / 86400), h: Math.floor((s % 86400) / 3600), m: Math.floor((s % 3600) / 60), s: s % 60 }
}

export function Countdown({ to, className }: { to: string; className?: string }) {
  const [left, setLeft] = useState(() => remaining(to))
  useEffect(() => {
    const id = setInterval(() => setLeft(remaining(to)), 1000)
    return () => clearInterval(id)
  }, [to])
  const pad = (n: number) => n.toString().padStart(2, '0')
  return (
    <time dateTime={to} className={cn('font-extrabold tabular-nums', className)}>
      {left.d > 0 && `${left.d}g `}
      {pad(left.h)}:{pad(left.m)}:{pad(left.s)}
    </time>
  )
}
