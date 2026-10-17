import { createContext, useContext, useEffect } from 'react'

/** Sheets/modals portal into this element so they stay inside the phone frame on desktop. */
export const OverlayContext = createContext<HTMLElement | null>(null)

export function useOverlayRoot(): HTMLElement | null {
  return useContext(OverlayContext)
}

export function useEscapeKey(active: boolean, onEscape: () => void): void {
  useEffect(() => {
    if (!active) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onEscape()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [active, onEscape])
}
