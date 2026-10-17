import { useId, useState, type InputHTMLAttributes, type ReactNode, type Ref } from 'react'
import { useTranslation } from 'react-i18next'
import { Eye, EyeOff } from 'lucide-react'
import { cn } from '@/lib/cn'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  hint?: ReactNode
  leftIcon?: ReactNode
  rightSlot?: ReactNode
  ref?: Ref<HTMLInputElement>
}

export function Input({ label, error, hint, leftIcon, rightSlot, id, className, ...props }: InputProps) {
  const autoId = useId()
  const inputId = id ?? autoId
  const messageId = `${inputId}-message`

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <label htmlFor={inputId} className="text-sm font-bold text-ivory/90">
        {label}
      </label>
      <div
        className={cn(
          'flex h-13 items-center gap-2.5 rounded-2xl border bg-surface px-4 transition-colors focus-within:border-primary focus-within:bg-surface-2',
          error ? 'border-nar-soft/80' : 'border-white/10',
        )}
      >
        {leftIcon && (
          <span className="text-muted" aria-hidden>
            {leftIcon}
          </span>
        )}
        <input
          id={inputId}
          aria-invalid={error ? true : undefined}
          aria-describedby={error || hint ? messageId : undefined}
          className="h-full min-w-0 flex-1 bg-transparent text-base text-ivory outline-none placeholder:text-muted/60 focus-visible:outline-none"
          {...props}
        />
        {rightSlot}
      </div>
      {error ? (
        <p id={messageId} role="alert" className="text-sm font-semibold text-nar-soft">
          {error}
        </p>
      ) : hint ? (
        <div id={messageId} className="text-sm text-muted">
          {hint}
        </div>
      ) : null}
    </div>
  )
}

export function PasswordInput(props: Omit<InputProps, 'type' | 'rightSlot'>) {
  const { t } = useTranslation()
  const [visible, setVisible] = useState(false)
  return (
    <Input
      {...props}
      type={visible ? 'text' : 'password'}
      rightSlot={
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          className="-mr-2 grid size-11 place-items-center rounded-xl text-muted transition hover:text-ivory"
          aria-label={visible ? t('auth.password.hide') : t('auth.password.show')}
          aria-pressed={visible}
        >
          {visible ? <EyeOff className="size-5" aria-hidden /> : <Eye className="size-5" aria-hidden />}
        </button>
      }
    />
  )
}
