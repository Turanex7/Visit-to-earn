export type Rarity = 'common' | 'rare' | 'epic' | 'legendary'
export type StepType = 'clue' | 'scan' | 'quiz' | 'fact'
export type QuestKind = 'solo' | 'coop' | 'seasonal' | 'trail'
export type Language = 'az' | 'en' | 'ru'
export type OutfitSlot = 'head' | 'body' | 'accessory' | 'frame'

export interface User {
  id: string
  name: string
  username: string
  email: string
  universityId?: string
  characterId: string
  outfit: Record<OutfitSlot, string | undefined>
  level: number
  xp: number
  totalXp: number
  streakDays: number
  isPremium: boolean
  visitedMuseumIds: string[]
  completedQuestIds: string[]
  collectibleIds: string[]
  badgeIds: string[]
  friendIds: string[]
  groupIds: string[]
  joinedAt: string
  settings: {
    language: Language
    notifications: Record<string, boolean>
    leaderboardVisible: boolean
    virtualMuseumVisibility: 'public' | 'friends' | 'private'
  }
}

export interface Character {
  id: string
  name: string
  title: string
  bio: string
  longBio: string
  perkText: string
  accent: string
}

export interface Museum {
  id: string
  name: string
  type: 'museum' | 'open-air' | 'monument'
  lat: number
  lng: number
  address: string
  hours: string
  ticketInfo: string
  description: string
  coverImage: string
  status: 'active' | 'coming-soon'
  questIds: string[]
  collectibleIds: string[]
}

export interface QuestStep {
  id: string
  type: StepType
  title: string
  content: string
  hint?: string
  qrPayload?: string
  quizId?: string
}

export interface Quest {
  id: string
  museumId: string
  kind: QuestKind
  title: string
  story: string
  difficulty: 1 | 2 | 3
  estimatedMinutes: number
  xpReward: number
  collectibleRewardId?: string
  badgeRewardId?: string
  steps: QuestStep[]
  coopSize?: number
  eventId?: string
  trailId?: string
}

export interface QuizQuestion {
  id: string
  text: string
  options: string[]
  correctIndex: number
  explanation: string
}
export interface Quiz {
  id: string
  questions: QuizQuestion[]
  secondsPerQuestion?: number
}

export interface Collectible {
  id: string
  museumId: string
  name: string
  rarity: Rarity
  story: string
  imageKey: string
  setId?: string
  limitedUntil?: string
}
export interface Badge {
  id: string
  name: string
  description: string
  icon: string
  goal: number
  category: string
}
export interface University {
  id: string
  name: string
  shortName: string
  memberCount: number
  monthlyPoints: number
  monthlyVisits: number
  rankDelta: number
}
export interface FriendGroup {
  id: string
  name: string
  icon: string
  inviteCode: string
  memberIds: string[]
  monthlyGoal: number
}
export interface SeasonEvent {
  id: string
  title: string
  startsAt: string
  endsAt: string
  questIds: string[]
  limitedCollectibleIds: string[]
}
export interface Trail {
  id: string
  title: string
  description: string
  stops: { order: number; name: string; lat: number; lng: number; questStepId?: string }[]
  distanceKm: number
  minutes: number
}
export interface ShopItem {
  id: string
  category: 'outfit' | 'souvenir' | 'museum-theme' | 'coupon'
  name: string
  priceAzn: number
  rarity?: Rarity
  premiumOnly?: boolean
}
export interface CoopSession {
  id: string
  questId: string
  slots: { userId?: string; ready: boolean; scanned: boolean }[]
  status: 'lobby' | 'countdown' | 'scanning' | 'success' | 'failed'
}
export interface AppNotification {
  id: string
  type: 'coop-invite' | 'friend-request' | 'league' | 'event' | 'reward'
  text: string
  createdAt: string
  read: boolean
  payload?: unknown
}

/* App-level types (not part of the backend contract) */
export type SetupStep = 'university' | 'character' | 'permissions' | 'tutorial' | 'done'
export type PermissionKey = 'camera' | 'location' | 'notifications'
export type PermissionState = 'unknown' | 'granted' | 'denied' | 'unsupported'

export interface AuthResult {
  user: User
  setupStep: SetupStep
}
