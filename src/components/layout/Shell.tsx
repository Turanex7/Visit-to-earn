import { Bell, Home, Map, QrCode, Trophy, UserRound } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuthStore } from '@/store/auth'
import { Avatar } from '@/components/ui/Avatar'
import { LevelBadge, StreakFlame, XPBar } from '@/components/ui/Progress'
import { cn } from '@/lib/cn'

export function TopHUD() {
  const { t } = useTranslation()
  const user = useAuthStore((s) => s.user)
  return <header className="flex items-center gap-3 border-b border-white/6 bg-bg/95 px-4 py-3">
    <Link to="/profile" className="flex min-w-0 items-center gap-2" aria-label={t('hud.profile')}>
      {user ? <Avatar characterId={user.characterId} size={40} /> : <span className="grid size-10 place-items-center rounded-full bg-primary/15 text-primary"><UserRound className="size-5" /></span>}
      <div className="min-w-0 flex-1">{user ? <><p className="truncate text-sm font-extrabold">{user.name}</p><XPBar level={user.level} xp={user.xp} compact /></> : <span className="text-sm font-bold">{t('hud.guest')}</span>}</div>
    </Link>
    {user && <LevelBadge level={user.level} size="sm" />}
    <StreakFlame days={user?.streakDays ?? 0} />
    <Link to="/notifications" aria-label={t('hud.notifications')} className="grid size-11 shrink-0 place-items-center rounded-full bg-white/5 text-ivory"><Bell className="size-5" /></Link>
  </header>
}

const NAV = [
  { to: '/home', key: 'home', icon: Home }, { to: '/map', key: 'map', icon: Map },
  { to: '/scan', key: 'scan', icon: QrCode }, { to: '/league', key: 'league', icon: Trophy }, { to: '/profile', key: 'profile', icon: UserRound },
]

export function BottomNav() {
  const { t } = useTranslation()
  return <nav aria-label={t('nav.label')} className="grid h-[76px] shrink-0 grid-cols-5 items-end border-t border-white/8 bg-bg px-2 pb-[max(env(safe-area-inset-bottom),8px)] pt-2">
    {NAV.map(({ to, key, icon: Icon }) => <NavLink key={to} to={to} className={({ isActive }) => cn('relative flex h-14 flex-col items-center justify-center gap-1 rounded-2xl text-[11px] font-bold transition', key === 'scan' && '-translate-y-3', isActive ? 'text-primary' : 'text-muted')}>
      <span className={cn('grid size-9 place-items-center rounded-2xl', key === 'scan' ? 'size-14 -mt-3 rounded-[20px] bg-gradient-to-br from-primary to-[#58d2d4] text-bg shadow-[0_8px_28px_-8px_#19b5c7]' : 'bg-transparent')}><Icon className={key === 'scan' ? 'size-6' : 'size-5'} strokeWidth={key === 'scan' ? 2.5 : 2} aria-hidden /></span>
      <span>{t(`nav.${key}`)}</span>
    </NavLink>)}
  </nav>
}
