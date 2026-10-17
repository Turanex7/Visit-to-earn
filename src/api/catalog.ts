import type { Character, FriendGroup, University } from '@/types'
import { characters } from '@/mocks/characters'
import { friendGroups, universities } from '@/mocks/universities'
import { ApiError, clone, delay } from './client'

// GET /api/characters
export async function getCharacters(): Promise<Character[]> {
  await delay()
  return clone(characters)
}

// GET /api/universities
export async function getUniversities(): Promise<University[]> {
  await delay()
  return clone(universities)
}

// POST /api/groups/join  { inviteCode }
export async function joinGroupByCode(code: string): Promise<FriendGroup> {
  await delay(400, 700)
  const group = friendGroups.find((g) => g.inviteCode === code.trim().toUpperCase())
  if (!group) throw new ApiError('group_not_found')
  return clone(group)
}
