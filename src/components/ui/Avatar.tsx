import { useState } from 'react'
import { useCharacter } from '@/hooks/queries'
import { initials } from '@/lib/format'
import { cn } from '@/lib/cn'

/**
 * Character portrait with outfit layers (Phase 4). Artwork: /public/characters/{id}.png —
 * falls back to initials on the character accent colour if the file is missing.
 */
export function Avatar({
  characterId,
  size = 48,
  alt,
  className,
  ring = true,
}: {
  characterId: string
  size?: number
  alt?: string
  className?: string
  ring?: boolean
}) {
  const character = useCharacter(characterId)
  const [failedId, setFailedId] = useState<string | null>(null)
  const accent = character?.accent ?? '#19B5C7'
  const name = character?.name ?? ''

  return (
    <span
      className={cn('relative inline-grid shrink-0 place-items-center overflow-hidden rounded-full bg-surface-2', className)}
      style={{
        width: size,
        height: size,
        boxShadow: ring ? `0 0 0 2px ${accent}, 0 0 16px -2px ${accent}80` : undefined,
      }}
    >
      {failedId !== characterId ? (
        <img
          src={`/characters/${characterId}.png`}
          alt={alt ?? name}
          className="size-full object-cover"
          onError={() => setFailedId(characterId)}
          draggable={false}
        />
      ) : (
        <span className="font-black text-ivory" style={{ fontSize: size * 0.36 }} role="img" aria-label={alt ?? name}>
          {initials(name) || '?'}
        </span>
      )}
    </span>
  )
}
