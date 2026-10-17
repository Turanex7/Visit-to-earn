import type { AuthResult, SetupStep, User } from '@/types'
import { RESERVED_USERNAMES, createUser, getDemoAccount, loadAccounts, saveAccounts } from '@/mocks/accounts'
import { ApiError, clone, delay } from './client'

// POST /api/auth/login
export async function login(identifier: string, password: string): Promise<AuthResult> {
  await delay(500, 900)
  const id = identifier.trim().toLowerCase()
  const account = loadAccounts().find(
    (a) => (a.user.email === id || a.user.username === id) && a.password === password,
  )
  if (!account) throw new ApiError('invalid_credentials')
  return clone({ user: account.user, setupStep: account.setupStep })
}

// POST /api/auth/google  (OAuth callback; mocked as the demo account)
export async function loginWithGoogle(): Promise<AuthResult> {
  await delay(600, 900)
  const account = getDemoAccount()
  return clone({ user: account.user, setupStep: account.setupStep })
}

// GET /api/users/check-username?username={username}
export async function checkUsername(username: string): Promise<{ available: boolean }> {
  await delay(300, 500)
  const u = username.trim().toLowerCase()
  const taken = RESERVED_USERNAMES.includes(u) || loadAccounts().some((a) => a.user.username === u)
  return { available: !taken }
}

export interface RegisterInput {
  name: string
  username: string
  email: string
  password: string
}

// POST /api/auth/register
export async function register(input: RegisterInput): Promise<AuthResult> {
  await delay(600, 900)
  const accounts = loadAccounts()
  const username = input.username.trim().toLowerCase()
  const email = input.email.trim().toLowerCase()
  if (RESERVED_USERNAMES.includes(username) || accounts.some((a) => a.user.username === username)) {
    throw new ApiError('username_taken')
  }
  if (accounts.some((a) => a.user.email === email)) throw new ApiError('email_taken')

  const user = createUser({ name: input.name, username, email })
  const setupStep: SetupStep = 'university'
  saveAccounts([...accounts, { user, password: input.password, setupStep }])
  return clone({ user, setupStep })
}

// POST /api/auth/forgot-password
export async function requestPasswordReset(email: string): Promise<{ sent: true }> {
  await delay(500, 800)
  void email
  return { sent: true }
}

// POST /api/auth/reset-password
export async function resetPassword(token: string, password: string): Promise<{ ok: true }> {
  await delay(500, 800)
  void token
  void password
  return { ok: true }
}

// PATCH /api/users/me
export async function syncProfile(userId: string, user: User, setupStep: SetupStep): Promise<void> {
  await delay(100, 200)
  const accounts = loadAccounts()
  saveAccounts(accounts.map((a) => (a.user.id === userId ? { ...a, user: clone(user), setupStep } : a)))
}
