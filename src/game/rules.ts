export const XP = {
  scanStep: 20,
  quizCorrect: 10,
  quizPerfectBonus: 20,
  firstMuseumVisit: 100,
  coopMultiplier: 1.5,
  hintCost: 5,
  tutorial: 50,
} as const

export const LEAGUE = {
  perDistinctMuseumVisit: 100,
  perQuestCompleted: 25,
} as const

export function streakBonus(streakDays: number): number {
  return 5 * Math.min(Math.max(streakDays, 0), 7)
}

/** XP needed to go from `level` to `level + 1`. */
export function xpToNextLevel(level: number): number {
  return 100 + 50 * (level - 1)
}

export interface XpResult {
  level: number
  xp: number
  levelsGained: number
}

/** Adds XP to a (level, xp-within-level) pair, rolling over as many levels as needed. */
export function applyXp(level: number, xp: number, gain: number): XpResult {
  let nextLevel = level
  let remaining = Math.max(0, xp + gain)
  let levelsGained = 0
  while (remaining >= xpToNextLevel(nextLevel)) {
    remaining -= xpToNextLevel(nextLevel)
    nextLevel += 1
    levelsGained += 1
  }
  return { level: nextLevel, xp: remaining, levelsGained }
}

export type LevelTitleKey =
  | 'levels.newbie'
  | 'levels.explorer'
  | 'levels.hunter'
  | 'levels.hero'
  | 'levels.elder'

export function levelTitleKey(level: number): LevelTitleKey {
  if (level >= 20) return 'levels.elder'
  if (level >= 15) return 'levels.hero'
  if (level >= 10) return 'levels.hunter'
  if (level >= 5) return 'levels.explorer'
  return 'levels.newbie'
}

export function leaguePoints(distinctMuseumVisits: number, questsCompleted: number): number {
  return distinctMuseumVisits * LEAGUE.perDistinctMuseumVisit + questsCompleted * LEAGUE.perQuestCompleted
}

/** "Adambaşı" (per active member) score for fair comparison between universities. */
export function perMemberPoints(totalPoints: number, activeMembers: number): number {
  return activeMembers > 0 ? Math.round(totalPoints / activeMembers) : 0
}
