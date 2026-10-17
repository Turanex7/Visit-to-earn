import { useEffect, useId, useRef, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion, useDragControls } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { X } from 'lucide-react'
import { useEscapeKey, useOverlayRoot } from '@/components/layout/overlay'

interface OverlayProps {
  open: boolean
  onClose: () => void
  title?: string
  children: ReactNode
  footer?: ReactNode
}

function useAutoFocus(open: boolean) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (open) ref.current?.focus()
  }, [open])
  return ref
}

export function BottomSheet({ open, onClose, title, children, footer }: OverlayProps) {
  const root = useOverlayRoot()
  const titleId = useId()
  const dragControls = useDragControls()
  const panelRef = useAutoFocus(open)
  useEscapeKey(open, onClose)

  if (!root) return null
  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div key="sheet" className="pointer-events-auto absolute inset-0 flex flex-col justify-end" exit={{ opacity: 1 }}>
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            ref={panelRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? titleId : undefined}
            className="relative flex max-h-[88%] flex-col rounded-t-[28px] border-t border-white/10 bg-surface outline-none"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 32, stiffness: 340 }}
            drag="y"
            dragControls={dragControls}
            dragListener={false}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.6 }}
            onDragEnd={(_, info) => {
              if (info.offset.y > 100 || info.velocity.y > 500) onClose()
            }}
          >
            <div
              className="flex cursor-grab touch-none justify-center pb-2 pt-3 active:cursor-grabbing"
              onPointerDown={(e) => dragControls.start(e)}
            >
              <span className="h-1.5 w-12 rounded-full bg-white/20" aria-hidden />
            </div>
            {title && (
              <h2 id={titleId} className="px-5 pb-3 text-xl font-extrabold text-balance">
                {title}
              </h2>
            )}
            <div className="overflow-y-auto px-5 pb-4">{children}</div>
            {footer && (
              <div className="border-t border-white/8 px-5 pb-[max(env(safe-area-inset-bottom),20px)] pt-4">{footer}</div>
            )}
            {!footer && <div className="pb-[max(env(safe-area-inset-bottom),16px)]" />}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    root,
  )
}

export function Modal({ open, onClose, title, children, footer }: OverlayProps) {
  const { t } = useTranslation()
  const root = useOverlayRoot()
  const titleId = useId()
  const panelRef = useAutoFocus(open)
  useEscapeKey(open, onClose)

  if (!root) return null
  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div key="modal" className="pointer-events-auto absolute inset-0 grid place-items-center p-5" exit={{ opacity: 1 }}>
          <motion.div
            className="absolute inset-0 bg-black/65 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            ref={panelRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? titleId : undefined}
            className="relative w-full rounded-[28px] border border-white/10 bg-surface p-6 outline-none"
            initial={{ opacity: 0, scale: 0.9, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', damping: 24, stiffness: 300 }}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-3 top-3 grid size-11 place-items-center rounded-full text-muted hover:bg-white/5 hover:text-ivory"
              aria-label={t('common.close')}
            >
              <X className="size-5" aria-hidden />
            </button>
            {title && (
              <h2 id={titleId} className="pr-10 text-xl font-extrabold text-balance">
                {title}
              </h2>
            )}
            <div className="mt-3">{children}</div>
            {footer && <div className="mt-6">{footer}</div>}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    root,
  )
}
