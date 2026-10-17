import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { CircleAlert, RotateCcw } from 'lucide-react'
import { cn } from '@/lib/cn'
import { Button } from './Button'

export function Skeleton({ className }: { className?: string }) {
  return <div className={cn('animate-pulse rounded-2xl bg-surface-2/80', className)} aria-hidden />
}

export function EmptyState({
  icon,
  title,
  text,
  action,
  className,
}: {
  icon: ReactNode
  title: string
  text?: string
  action?: ReactNode
  className?: string
}) {
  return (
    <div className={cn('flex flex-col items-center px-6 py-10 text-center', className)}>
      <div className="mb-4 grid size-16 place-items-center rounded-3xl bg-surface-2 text-primary" aria-hidden>
        {icon}
      </div>
      <h3 className="text-lg font-extrabold text-balance">{title}</h3>
      {text && <p className="mt-1.5 max-w-xs text-sm leading-relaxed text-muted text-pretty">{text}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  )
}

export function ErrorState({ onRetry, message }: { onRetry?: () => void; message?: string }) {
  const { t } = useTranslation()
  return (
    <EmptyState
      icon={<CircleAlert className="size-7 text-nar-soft" />}
      title={message ?? t('common.error')}
      action={
        onRetry && (
          <Button variant="secondary" size="sm" onClick={onRetry} leftIcon={<RotateCcw className="size-4" aria-hidden />}>
            {t('common.retry')}
          </Button>
        )
      }
    />
  )
}

export function Banner({ tone = 'error', children }: { tone?: 'error' | 'info'; children: ReactNode }) {
  return (
    <div
      role="alert"
      className={cn(
        'flex items-start gap-3 rounded-2xl border px-4 py-3 text-sm font-semibold',
        tone === 'error' ? 'border-nar/40 bg-nar/12 text-nar-soft' : 'border-primary/30 bg-primary/10 text-primary',
      )}
    >
      <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden />
      <span>{children}</span>
    </div>
  )
}
