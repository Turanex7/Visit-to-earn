import useSWR from 'swr'
import { getCharacters, getUniversities } from '@/api/catalog'

export function useCharacters() {
  return useSWR('characters', getCharacters)
}

export function useCharacter(id: string | undefined) {
  const { data } = useCharacters()
  return id ? data?.find((c) => c.id === id) : undefined
}

export function useUniversities() {
  return useSWR('universities', getUniversities)
}
