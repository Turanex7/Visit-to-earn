import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Smartphone } from 'lucide-react'
import { Toaster } from '@/components/ui/Toaster'
import { ButaLogo, PatternBackground } from '@/components/ui/Decor'
import { OverlayContext } from './overlay'

/** Full-screen on phones; a centred 430px "device" with decorative backdrop on desktop. */
export function AppFrame() {
  const { t } = useTranslation()
  const [overlayRoot, setOverlayRoot] = useState<HTMLDivElement | null>(null)

  return (
    <div className="relative flex min-h-dvh items-center justify-center overflow-hidden md:p-4">
      <div className="pointer-events-none absolute inset-0 hidden md:block" aria-hidden>
        <div className="absolute -left-40 top-1/4 size-[520px] rounded-full bg-primary/15 blur-[120px]" />
        <div className="absolute -right-40 bottom-0 size-[520px] rounded-full bg-nar/15 blur-[120px]" />
        <PatternBackground opacity={0.05} />
      </div>

      <aside className="pointer-events-none absolute left-[max(2rem,calc(50%-560px))] top-1/2 hidden w-64 -translate-y-1/2 xl:block">
        <ButaLogo size={64} animate={false} />
        <p className="mt-4 text-3xl font-black leading-tight">{t('app.name')}</p>
        <p className="mt-2 text-lg font-semibold text-muted">{t('app.tagline')}</p>
        <p className="mt-8 flex items-center gap-2 text-sm text-muted">
          <Smartphone className="size-4" aria-hidden />
          {t('app.desktopHint')}
        </p>
      </aside>

      <div className="relative flex h-dvh w-full max-w-[430px] flex-col overflow-hidden bg-bg md:h-[min(900px,calc(100dvh-32px))] md:rounded-[44px] md:border md:border-white/10 md:shadow-[0_40px_120px_-20px_rgba(0,0,0,0.8)] md:ring-[10px] md:ring-black/50">
        <OverlayContext.Provider value={overlayRoot}>
          <Outlet />
        </OverlayContext.Provider>
        <div ref={setOverlayRoot} className="pointer-events-none absolute inset-0 z-50" />
        <Toaster />
      </div>
    </div>
  )
}
