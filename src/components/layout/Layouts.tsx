import type { ReactNode } from 'react'
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ChevronLeft } from 'lucide-react'
import { SETUP_ORDER, SETUP_ROUTES, resolveEntryRoute, useAuthStore } from '@/store/auth'
import type { SetupStep } from '@/types'
import { Stepper } from '@/components/ui/Controls'
import { BottomNav, TopHUD } from './Shell'

/** Login/register/onboarding: signed-in users are sent home or back into the wizard. */
export function PublicOnlyGuard() {
  const user = useAuthStore((s) => s.user)
  const setupStep = useAuthStore((s) => s.setupStep)
  if (user) return <Navigate to={setupStep === 'done' ? '/home' : SETUP_ROUTES[setupStep]} replace />
  return <Outlet />
}

const ROUTE_STEP: Record<string, Exclude<SetupStep, 'done'>> = {
  '/setup/university': 'university',
  '/setup/character': 'character',
  '/setup/permissions': 'permissions',
  '/tutorial': 'tutorial',
}

/** Setup wizard: requires an account; prevents skipping ahead of the saved step. */
export function SetupGuard() {
  const { pathname } = useLocation()
  const user = useAuthStore((s) => s.user)
  const setupStep = useAuthStore((s) => s.setupStep)
  if (!user) return <Navigate to="/login" replace />
  if (setupStep === 'done') return <Navigate to="/home" replace />
  const routeStep = ROUTE_STEP[pathname]
  if (routeStep && SETUP_ORDER.indexOf(routeStep) > SETUP_ORDER.indexOf(setupStep)) {
    return <Navigate to={SETUP_ROUTES[setupStep]} replace />
  }
  return <Outlet />
}

/** Main app: users or guests. Incomplete setup resumes the wizard. */
export function MainGuard() {
  const state = useAuthStore()
  if (state.user && state.setupStep !== 'done') return <Navigate to={SETUP_ROUTES[state.setupStep]} replace />
  if (!state.user && !state.isGuest) return <Navigate to={resolveEntryRoute(state)} replace />
  return <Outlet />
}

const HUD_ROUTES = ['/home', '/map', '/profile']

export function MainLayout() {
  const { pathname } = useLocation()
  return (
    <div className="flex h-full flex-col">
      {HUD_ROUTES.includes(pathname) && <TopHUD />}
      <main className="no-scrollbar flex-1 overflow-y-auto">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  )
}

/** Scrollable full-height screen for auth/setup pages with safe-area padding. */
export function Screen({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <main
      className={`no-scrollbar relative flex h-full flex-col overflow-y-auto px-5 pb-[max(env(safe-area-inset-bottom),24px)] pt-[max(env(safe-area-inset-top),16px)] ${className}`}
    >
      {children}
    </main>
  )
}

export function SetupHeader({ step, backTo }: { step: number; backTo?: string }) {
  const { t } = useTranslation()
  const navigate = useNavigate()
  return (
    <div className="flex h-12 items-center justify-between">
      {backTo ? (
        <button
          type="button"
          onClick={() => navigate(backTo)}
          className="-ml-2 grid size-11 place-items-center rounded-full text-ivory hover:bg-white/5"
          aria-label={t('common.back')}
        >
          <ChevronLeft className="size-6" aria-hidden />
        </button>
      ) : (
        <span className="size-11" />
      )}
      <Stepper current={step} total={4} />
    </div>
  )
}
