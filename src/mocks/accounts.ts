import type { SetupStep, User } from '@/types'

export interface MockAccount {
  user: User
  /** Mock only — a real backend stores a password hash, never plaintext. */
  password: string
  setupStep: SetupStep
}

const ACCOUNTS_KEY = 'vte-mock-accounts'

export const RESERVED_USERNAMES = ['admin', 'demo', 'visit', 'support', 'nizami']

export function createUser(fields: { name: string; username: string; email: string }): User {
  return {
    id: `user_${Math.random().toString(36).slice(2, 10)}`,
    name: fields.name.trim(),
    username: fields.username.trim().toLowerCase(),
    email: fields.email.trim().toLowerCase(),
    characterId: 'nizami',
    outfit: { head: undefined, body: undefined, accessory: undefined, frame: undefined },
    level: 1,
    xp: 0,
    totalXp: 0,
    streakDays: 0,
    isPremium: false,
    visitedMuseumIds: [],
    completedQuestIds: [],
    collectibleIds: [],
    badgeIds: [],
    friendIds: [],
    groupIds: [],
    joinedAt: new Date().toISOString(),
    settings: {
      language: 'az',
      notifications: { coop: true, league: true, quests: true, events: true },
      leaderboardVisible: true,
      virtualMuseumVisibility: 'friends',
    },
  }
}

const demoAccount: MockAccount = {
  password: 'demo1234',
  setupStep: 'done',
  user: {
    ...createUser({ name: 'Aysel Məmmədova', username: 'aysel', email: 'demo@visit.az' }),
    id: 'user_demo',
    universityId: 'uni_ada',
    characterId: 'natavan',
    level: 7,
    xp: 180,
    totalXp: 1530,
    streakDays: 5,
    badgeIds: ['badge_new_explorer'],
    groupIds: ['group_nar'],
    joinedAt: '2026-09-02T10:00:00.000Z',
  },
}

/** Mock "database" of accounts, persisted to localStorage so registrations survive refresh. */
export function loadAccounts(): MockAccount[] {
  try {
    const raw = localStorage.getItem(ACCOUNTS_KEY)
    if (raw) return JSON.parse(raw) as MockAccount[]
  } catch {
    /* corrupted storage — fall back to seed */
  }
  return [demoAccount]
}

export function saveAccounts(accounts: MockAccount[]): void {
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts))
}

export function getDemoAccount(): MockAccount {
  return loadAccounts().find((a) => a.user.id === demoAccount.user.id) ?? demoAccount
}
