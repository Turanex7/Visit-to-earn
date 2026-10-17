import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { AuthResult, SetupStep, User } from '@/types'
import { syncProfile } from '@/api/auth'
import { applyXp } from '@/game/rules'

interface AuthState {
  user: User | null
  isGuest: boolean
  setupStep: SetupStep
  hasSeenOnboarding: boolean
  signIn: (result: AuthResult) => void
  continueAsGuest: () => void
  signOut: () => void
  completeOnboarding: () => void
  updateUser: (patch: Partial<User>) => void
  setSetupStep: (step: SetupStep) => void
  /** Moves the wizard forward only — revisiting an earlier step never rewinds progress. */
  advanceSetup: (step: SetupStep) => void
  grantXp: (amount: number) => { levelsGained: number; level: number }
  addBadge: (badgeId: string) => void
}

export const SETUP_ORDER: SetupStep[] = ['university', 'character', 'permissions', 'tutorial', 'done']

export const SETUP_ROUTES: Record<Exclude<SetupStep, 'done'>, string> = {
  university: '/setup/university',
  character: '/setup/character',
  permissions: '/setup/permissions',
  tutorial: '/tutorial',
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => {
      const persistRemote = () => {
        const { user, setupStep } = get()
        if (user) void syncProfile(user.id, user, setupStep)
      }

      return {
        user: null,
        isGuest: false,
        setupStep: 'done',
        hasSeenOnboarding: false,

        signIn: ({ user, setupStep }) =>
          set({ user, setupStep, isGuest: false, hasSeenOnboarding: true }),

        continueAsGuest: () => set({ user: null, isGuest: true, setupStep: 'done', hasSeenOnboarding: true }),

        signOut: () => set({ user: null, isGuest: false, setupStep: 'done' }),

        completeOnboarding: () => set({ hasSeenOnboarding: true }),

        updateUser: (patch) => {
          const user = get().user
          if (!user) return
          set({ user: { ...user, ...patch } })
          persistRemote()
        },

        setSetupStep: (setupStep) => {
          set({ setupStep })
          persistRemote()
        },

        advanceSetup: (step) => {
          if (SETUP_ORDER.indexOf(step) <= SETUP_ORDER.indexOf(get().setupStep)) return
          set({ setupStep: step })
          persistRemote()
        },

        grantXp: (amount) => {
          const user = get().user
          if (!user) return { levelsGained: 0, level: 1 }
          const result = applyXp(user.level, user.xp, amount)
          set({ user: { ...user, level: result.level, xp: result.xp, totalXp: user.totalXp + amount } })
          persistRemote()
          return { levelsGained: result.levelsGained, level: result.level }
        },

        addBadge: (badgeId) => {
          const user = get().user
          if (!user || user.badgeIds.includes(badgeId)) return
          set({ user: { ...user, badgeIds: [...user.badgeIds, badgeId] } })
          persistRemote()
        },
      }
    },
    {
      name: 'vte-auth',
      partialize: (s) => ({
        user: s.user,
        isGuest: s.isGuest,
        setupStep: s.setupStep,
        hasSeenOnboarding: s.hasSeenOnboarding,
      }),
    },
  ),
)

export function resolveEntryRoute(state: Pick<AuthState, 'user' | 'isGuest' | 'setupStep' | 'hasSeenOnboarding'>): string {
  if (state.user) return state.setupStep === 'done' ? '/home' : SETUP_ROUTES[state.setupStep]
  if (state.isGuest) return '/home'
  return state.hasSeenOnboarding ? '/login' : '/onboarding'
}
