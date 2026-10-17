import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, ChevronLeft } from 'lucide-react'
import { Screen } from '@/components/layout/Layouts'
import { ButaLogo, PatternBackground } from '@/components/ui/Decor'
import { Button } from '@/components/ui/Button'
import { Input, PasswordInput } from '@/components/ui/Input'
import { Banner } from '@/components/ui/Feedback'
import { Card } from '@/components/ui/Card'
import { checkUsername, login, loginWithGoogle, register, requestPasswordReset, resetPassword } from '@/api/auth'
import { ApiError } from '@/api/client'
import { useAuthStore, resolveEntryRoute } from '@/store/auth'
import { EMAIL_RE, PASSWORD_MIN, USERNAME_RE, passwordStrength } from '@/lib/validation'

export function SplashPage() {
  const state = useAuthStore()
  const navigate = useNavigate()
  useEffect(() => { const id = window.setTimeout(() => navigate(resolveEntryRoute(state), { replace: true }), 1500); return () => clearTimeout(id) }, [navigate, state.user, state.isGuest, state.setupStep, state.hasSeenOnboarding])
  const { t } = useTranslation()
  return <div className="relative grid h-full place-items-center overflow-hidden bg-bg"><PatternBackground opacity={0.08} /><div className="relative flex flex-col items-center"><ButaLogo size={112} /><h1 className="mt-4 text-3xl font-black tracking-tight">{t('app.name')}</h1><p className="mt-2 text-sm font-semibold text-muted">{t('app.tagline')}</p><span className="mt-8 size-5 animate-spin rounded-full border-2 border-white/15 border-t-primary" aria-label={t('splash.loading')} /></div></div>
}

const SLIDES = [
  { title: 'onboarding.slide1Title', text: 'onboarding.slide1Text', icon: '🗺️' },
  { title: 'onboarding.slide2Title', text: 'onboarding.slide2Text', icon: '🔎' },
  { title: 'onboarding.slide3Title', text: 'onboarding.slide3Text', icon: '✨' },
  { title: 'onboarding.slide4Title', text: 'onboarding.slide4Text', icon: '🏆' },
]
export function OnboardingPage() {
  const { t } = useTranslation(); const navigate = useNavigate(); const [index, setIndex] = useState(0)
  const finish = (path: string) => { useAuthStore.getState().completeOnboarding(); navigate(path) }
  const slide = SLIDES[index]
  return <Screen className="justify-between py-5">
    <div className="flex items-center justify-between"><ButaLogo size={42} animate={false} /><Button variant="ghost" size="sm" onClick={() => finish('/register')}>{t('common.skip')}</Button></div>
    <div className="relative flex flex-1 flex-col items-center justify-center text-center"><div className="absolute inset-x-6 top-1/2 h-72 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" /><AnimatePresence mode="wait"><motion.div key={index} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: .25 }} className="relative flex flex-col items-center"><div className="grid size-56 place-items-center rounded-[48px] border border-white/10 bg-gradient-to-br from-surface-2 to-surface text-8xl shadow-[0_30px_80px_-40px_#19b5c7]">{slide.icon}</div><h1 className="mt-9 text-3xl font-black text-balance">{t(slide.title)}</h1><p className="mt-3 max-w-xs text-base leading-7 text-muted">{t(slide.text)}</p></motion.div></AnimatePresence></div>
    <div><div className="mb-6 flex justify-center gap-2" aria-label={t('onboarding.slides')}>{SLIDES.map((_, i) => <button key={i} aria-label={t('onboarding.goTo', { n: i + 1 })} aria-current={i === index} onClick={() => setIndex(i)} className={`h-2.5 rounded-full transition-all ${i === index ? 'w-8 bg-primary' : 'w-2.5 bg-white/20'}`} />)}</div>{index < SLIDES.length - 1 ? <Button fullWidth size="lg" rightIcon={<ArrowRight className="size-5" />} onClick={() => setIndex((v) => v + 1)}>{t('common.continue')}</Button> : <><Button fullWidth size="lg" onClick={() => finish('/register')}>{t('onboarding.start')}</Button><Button fullWidth variant="ghost" className="mt-2" onClick={() => finish('/login')}>{t('onboarding.haveAccount')}</Button></>}</div>
  </Screen>
}

export function LoginPage() {
  const { t } = useTranslation(); const navigate = useNavigate(); const [identifier, setIdentifier] = useState(''); const [password, setPassword] = useState(''); const [error, setError] = useState(''); const [loading, setLoading] = useState(false)
  const go = (result: Awaited<ReturnType<typeof login>>) => { useAuthStore.getState().signIn(result); navigate(resolveEntryRoute({ ...useAuthStore.getState(), ...result, isGuest: false }), { replace: true }) }
  const submit = async (e: React.FormEvent) => { e.preventDefault(); setError(''); setLoading(true); try { go(await login(identifier, password)) } catch { setError(t('auth.login.invalid')) } finally { setLoading(false) } }
  const demo = () => { setIdentifier('demo@visit.az'); setPassword('demo1234') }
  return <Screen><AuthHeader /><div className="mb-6 mt-8"><h1 className="text-3xl font-black">{t('auth.login.title')}</h1><p className="mt-2 text-sm text-muted">{t('auth.login.subtitle')}</p></div><form onSubmit={submit} className="flex flex-col gap-4">{error && <Banner>{error}</Banner>}<Input label={t('auth.login.identifier')} value={identifier} onChange={(e) => setIdentifier(e.target.value)} placeholder={t('auth.login.identifierPlaceholder')} autoComplete="username" required /><PasswordInput label={t('auth.login.password')} value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" required /><div className="-mt-2 flex justify-end"><Link className="text-sm font-bold text-primary" to="/forgot-password">{t('auth.login.forgot')}</Link></div><Button fullWidth size="lg" loading={loading} type="submit">{t('auth.login.submit')}</Button></form><div className="my-5 flex items-center gap-3 text-xs font-bold text-muted"><span className="h-px flex-1 bg-white/10" />{t('common.or')}<span className="h-px flex-1 bg-white/10" /></div><Button fullWidth variant="secondary" onClick={async () => { setLoading(true); try { go(await loginWithGoogle()) } finally { setLoading(false) } }}>{t('auth.login.google')}</Button><Button fullWidth variant="ghost" className="mt-2" onClick={() => { useAuthStore.getState().continueAsGuest(); navigate('/home') }}>{t('auth.login.guest')}</Button><Card className="mt-5 flex items-center justify-between !rounded-2xl !p-3"><div><p className="text-xs font-bold text-muted">{t('auth.login.demoHint')}</p><p className="text-sm font-extrabold">demo@visit.az · demo1234</p></div><Button variant="ghost" size="sm" onClick={demo}>{t('auth.login.demoFill')}</Button></Card><p className="mt-auto pt-6 text-center text-sm text-muted">{t('auth.login.noAccount')} <Link className="font-extrabold text-primary" to="/register">{t('auth.login.register')}</Link></p></Screen>
}

export function RegisterPage() {
  const { t } = useTranslation(); const navigate = useNavigate(); const [name, setName] = useState(''); const [username, setUsername] = useState(''); const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(null); const [email, setEmail] = useState(''); const [password, setPassword] = useState(''); const [confirm, setConfirm] = useState(''); const [terms, setTerms] = useState(false); const [busy, setBusy] = useState(false); const [error, setError] = useState('')
  useEffect(() => {
    if (!USERNAME_RE.test(username)) { setUsernameAvailable(null); return }
    let current = true
    const timer = window.setTimeout(() => { void checkUsername(username).then(({ available }) => { if (current) setUsernameAvailable(available) }) }, 280)
    return () => { current = false; clearTimeout(timer) }
  }, [username])
  const strength = passwordStrength(password)
  const submit = async (e: React.FormEvent) => { e.preventDefault(); setError(''); if (name.trim().split(/\s+/).length < 2) return setError(t('validation.name')); if (!USERNAME_RE.test(username.toLowerCase())) return setError(t('validation.username')); if (!EMAIL_RE.test(email)) return setError(t('validation.email')); if (password.length < PASSWORD_MIN) return setError(t('validation.passwordMin')); if (password !== confirm) return setError(t('validation.passwordMatch')); if (!terms) return setError(t('validation.terms')); setBusy(true); try { const result = await register({ name, username, email, password }); useAuthStore.getState().signIn(result); navigate('/setup/university', { replace: true }) } catch (err) { setError(err instanceof ApiError && err.code === 'email_taken' ? t('auth.register.emailTaken') : t('auth.register.usernameTaken')) } finally { setBusy(false) } }
  return <Screen><AuthHeader back /><div className="mb-5 mt-4"><h1 className="text-3xl font-black">{t('auth.register.title')}</h1><p className="mt-2 text-sm text-muted">{t('auth.register.subtitle')}</p></div><form onSubmit={submit} className="flex flex-col gap-3">{error && <Banner>{error}</Banner>}<Input label={t('auth.register.name')} value={name} onChange={(e) => setName(e.target.value)} placeholder={t('auth.register.namePlaceholder')} autoComplete="name" /><Input label={t('auth.register.username')} value={username} onChange={(e) => setUsername(e.target.value.toLowerCase())} placeholder={t('auth.register.usernamePlaceholder')} autoComplete="username" hint={usernameAvailable === null ? undefined : <span className={usernameAvailable ? 'text-success' : 'text-nar-soft'}>{usernameAvailable ? `✓ ${t('auth.register.usernameAvailable')}` : `✗ ${t('auth.register.usernameTaken')}`}</span>} /><Input label={t('auth.register.email')} type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t('auth.register.emailPlaceholder')} autoComplete="email" /><PasswordInput label={t('auth.register.password')} value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="new-password" hint={<div><div className="mt-1 flex gap-1">{[1,2,3,4].map((n) => <span key={n} className={`h-1 flex-1 rounded-full ${strength >= n ? 'bg-primary' : 'bg-white/10'}`} />)}</div><span>{t('auth.register.strength', { label: t(`auth.register.strength${strength}`) })}</span></div>} /><PasswordInput label={t('auth.register.confirm')} value={confirm} onChange={(e) => setConfirm(e.target.value)} autoComplete="new-password" /><label className="flex min-h-11 items-center gap-3 text-sm text-muted"><input type="checkbox" checked={terms} onChange={(e) => setTerms(e.target.checked)} className="size-5 accent-primary" />{t('auth.register.terms')}</label><Button fullWidth size="lg" loading={busy} type="submit">{t('auth.register.submit')}</Button></form><p className="mt-auto pt-5 text-center text-sm text-muted">{t('auth.register.haveAccount')} <Link className="font-extrabold text-primary" to="/login">{t('auth.register.login')}</Link></p></Screen>
}

export function ForgotPasswordPage() {
  const { t } = useTranslation(); const navigate = useNavigate(); const [email, setEmail] = useState(''); const [sent, setSent] = useState(false); const [busy, setBusy] = useState(false); const [error, setError] = useState('')
  return <Screen><AuthHeader back /><div className="mb-6 mt-8"><h1 className="text-3xl font-black">{t(sent ? 'auth.forgot.sentTitle' : 'auth.forgot.title')}</h1><p className="mt-3 text-sm leading-6 text-muted">{t(sent ? 'auth.forgot.sentText' : 'auth.forgot.text', { email })}</p></div>{sent ? <div className="grid flex-1 content-start justify-items-center pt-10"><span className="text-6xl">✉️</span><Button className="mt-8" fullWidth onClick={() => navigate('/login')}>{t('auth.forgot.backToLogin')}</Button><Button variant="ghost" fullWidth onClick={() => navigate('/reset-password')}>{t('auth.forgot.demoReset')}</Button></div> : <form onSubmit={async (e) => { e.preventDefault(); if (!EMAIL_RE.test(email)) return setError(t('validation.email')); setBusy(true); try { await requestPasswordReset(email); setSent(true) } finally { setBusy(false) } }} className="flex flex-col gap-4">{error && <Banner>{error}</Banner>}<Input label={t('auth.forgot.email')} type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /><Button type="submit" fullWidth size="lg" loading={busy}>{t('auth.forgot.submit')}</Button></form>}</Screen>
}

export function ResetPasswordPage() {
  const { t } = useTranslation(); const navigate = useNavigate(); const [password, setPassword] = useState(''); const [confirm, setConfirm] = useState(''); const [error, setError] = useState(''); const [done, setDone] = useState(false)
  return <Screen><AuthHeader back /><div className="mb-6 mt-8"><h1 className="text-3xl font-black">{t('auth.reset.title')}</h1><p className="mt-2 text-sm text-muted">{t('auth.reset.text')}</p></div>{done ? <><Banner tone="info">{t('auth.reset.success')}</Banner><Button className="mt-5" fullWidth onClick={() => navigate('/login')}>{t('auth.forgot.backToLogin')}</Button></> : <form className="flex flex-col gap-4" onSubmit={async (e) => { e.preventDefault(); if (password.length < PASSWORD_MIN) return setError(t('validation.passwordMin')); if (password !== confirm) return setError(t('validation.passwordMatch')); await resetPassword('demo-token', password); setDone(true) }}>{error && <Banner>{error}</Banner>}<PasswordInput label={t('auth.reset.password')} value={password} onChange={(e) => setPassword(e.target.value)} /><PasswordInput label={t('auth.reset.confirm')} value={confirm} onChange={(e) => setConfirm(e.target.value)} /><Button type="submit" fullWidth size="lg">{t('auth.reset.submit')}</Button></form>}</Screen>
}

function AuthHeader({ back = false }: { back?: boolean }) { return <div className="flex h-12 items-center justify-between">{back ? <Link to="/login" className="grid size-11 place-items-center rounded-full text-ivory" aria-label="Geri"><ChevronLeft className="size-6" /></Link> : <span className="size-11" />}<Link to="/" aria-label="Visit-to-Earn"><ButaLogo size={40} animate={false} /></Link><span className="size-11" /></div> }
