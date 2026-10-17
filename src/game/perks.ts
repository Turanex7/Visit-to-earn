export type XpSource = 'quiz' | 'coop' | 'trail' | 'collectible-first' | 'streak' | 'scan' | 'quest' | 'other'

interface Perk {
  source?: XpSource
  multiplier?: number
  extraQuizHints?: number
}

const PERKS: Record<string, Perk> = {
  nizami: { source: 'quiz', multiplier: 1.1 },
  xetai: { source: 'coop', multiplier: 1.1 },
  koroglu: { source: 'trail', multiplier: 1.1 },
  natavan: { source: 'collectible-first', multiplier: 1.1 },
  uzeyir: { extraQuizHints: 1 },
  nasimi: { source: 'streak', multiplier: 1.1 },
}

export function applyPerk(baseXp: number, source: XpSource, characterId: string): number {
  const perk = PERKS[characterId]
  if (!perk?.multiplier || perk.source !== source) return baseXp
  return Math.round(baseXp * perk.multiplier)
}

export function extraQuizHints(characterId: string): number {
  return PERKS[characterId]?.extraQuizHints ?? 0
}
