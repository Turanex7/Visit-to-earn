import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Sparkles } from 'lucide-react'
import { BottomSheet } from '@/components/ui/BottomSheet'
import { Button } from '@/components/ui/Button'

export function GuestGateSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const go = (path: string) => {
    onClose()
    navigate(path)
  }
  return (
    <BottomSheet
      open={open}
      onClose={onClose}
      title={t('guestGate.title')}
      footer={
        <div className="flex flex-col gap-2">
          <Button fullWidth size="lg" onClick={() => go('/register')}>
            {t('guestGate.cta')}
          </Button>
          <Button fullWidth variant="ghost" onClick={() => go('/login')}>
            {t('guestGate.login')}
          </Button>
        </div>
      }
    >
      <div className="flex items-start gap-4">
        <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-gold/15 text-gold" aria-hidden>
          <Sparkles className="size-6" />
        </span>
        <p className="text-base leading-relaxed text-muted text-pretty">{t('guestGate.text')}</p>
      </div>
    </BottomSheet>
  )
}
