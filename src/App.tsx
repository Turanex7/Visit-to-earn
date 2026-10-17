import { Component, type ErrorInfo, type ReactNode } from 'react'
import { Outlet } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/Button'
import { AppFrame } from '@/components/layout/AppFrame'

class ErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  componentDidCatch(error: Error, info: ErrorInfo) { console.error('Visit-to-Earn UI error', error, info) }
  render() {
    if (this.state.failed) return <div className="grid min-h-dvh place-items-center p-6 text-center"><div><h1 className="text-2xl font-black">Nəsə səhv getdi</h1><p className="mt-2 text-muted">Səhifəni yenilə və yenidən cəhd et.</p><Button className="mt-5" onClick={() => location.reload()}>Yenilə</Button></div></div>
    return this.props.children
  }
}

export function App() {
  return <ErrorBoundary><AppFrame /></ErrorBoundary>
}

export function PlaceholderPage({ title }: { title: string }) {
  const { t } = useTranslation()
  return <div className="flex h-full flex-col items-center justify-center px-8 text-center"><div className="mb-4 grid size-16 place-items-center rounded-3xl bg-primary/10 text-3xl">✦</div><h1 className="text-2xl font-black">{title}</h1><p className="mt-2 max-w-xs text-sm leading-6 text-muted">{t('placeholder.text')}</p><span className="mt-5 rounded-full bg-gold/10 px-4 py-2 text-xs font-bold text-gold">{t('common.comingSoon')}</span></div>
}

export function RootRedirect() { return <Outlet /> }
