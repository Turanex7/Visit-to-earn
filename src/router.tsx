import { createBrowserRouter, Navigate } from 'react-router-dom'
import { App, PlaceholderPage } from './App'
import { MainGuard, MainLayout, PublicOnlyGuard, SetupGuard } from '@/components/layout/Layouts'
import { SplashPage, OnboardingPage, LoginPage, RegisterPage, ForgotPasswordPage, ResetPasswordPage } from '@/pages/AuthPages'
import { UniversityPage, CharacterPage, PermissionsPage, TutorialPage } from '@/pages/SetupPages'

const placeholder = (title: string) => <PlaceholderPage title={title} />

export const router = createBrowserRouter([
  { path: '/', element: <App />, children: [
    { index: true, element: <SplashPage /> },
    { element: <PublicOnlyGuard />, children: [
      { path: 'onboarding', element: <OnboardingPage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
      { path: 'forgot-password', element: <ForgotPasswordPage /> },
      { path: 'reset-password', element: <ResetPasswordPage /> },
    ] },
    { element: <SetupGuard />, children: [
      { path: 'setup/university', element: <UniversityPage /> },
      { path: 'setup/character', element: <CharacterPage /> },
      { path: 'setup/permissions', element: <PermissionsPage /> },
      { path: 'tutorial', element: <TutorialPage /> },
    ] },
    { element: <MainGuard />, children: [{ element: <MainLayout />, children: [
      { path: 'home', element: placeholder('Ana səhifə') },
      { path: 'map', element: placeholder('Xəritə') },
      { path: 'scan', element: placeholder('QR Skan') },
      { path: 'league', element: placeholder('Mədəniyyət Liqası') },
      { path: 'profile', element: placeholder('Profil') },
      { path: 'notifications', element: placeholder('Bildirişlər') },
      { path: 'quests', element: placeholder('Questlər') },
      { path: 'collection', element: placeholder('Kolleksiya') },
      { path: 'friends', element: placeholder('Dostlar') },
      { path: 'shop', element: placeholder('Mağaza') },
      { path: 'settings', element: placeholder('Tənzimləmələr') },
      { path: 'museum/:id', element: placeholder('Muzey') },
    ] }] },
    { path: '*', element: <Navigate to="/" replace /> },
  ] },
])
