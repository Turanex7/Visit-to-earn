import { AnimatePresence, motion } from 'framer-motion'
import { CircleAlert, CircleCheck, Info, Sparkles } from 'lucide-react'
import { useUiStore, type ToastTone } from '@/store/ui'
import { cn } from '@/lib/cn'

const TONES: Record<ToastTone, { icon: typeof Info; className: string }> = {
  success: { icon: CircleCheck, className: 'border-success/40 text-[#5fd08f]' },
  error: { icon: CircleAlert, className: 'border-nar/50 text-nar-soft' },
  info: { icon: Info, className: 'border-primary/40 text-primary' },
  gold: { icon: Sparkles, className: 'border-gold/50 text-gold' },
}

export function Toaster() {
  const toasts = useUiStore((s) => s.toasts)
  const dismiss = useUiStore((s) => s.dismissToast)

  return (
    <div
      className="pointer-events-none absolute inset-x-0 top-0 z-[60] flex flex-col items-center gap-2 px-4 pt-[max(env(safe-area-inset-top),14px)]"
      aria-live="polite"
      role="status"
    >
      <AnimatePresence initial={false}>
        {toasts.map((toast) => {
          const { icon: Icon, className } = TONES[toast.tone]
          return (
            <motion.button
              key={toast.id}
              type="button"
              layout
              onClick={() => dismiss(toast.id)}
              initial={{ opacity: 0, y: -16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.96 }}
              className={cn(
                'pointer-events-auto flex w-full items-center gap-3 rounded-2xl border bg-surface-2/95 px-4 py-3 text-left shadow-xl backdrop-blur',
                className,
              )}
            >
              <Icon className="size-5 shrink-0" aria-hidden />
              <span className="text-sm font-semibold text-ivory">{toast.message}</span>
            </motion.button>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
