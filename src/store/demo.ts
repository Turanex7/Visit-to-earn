import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface DemoState {
  enabled: boolean
  toggle: () => void
  setEnabled: (enabled: boolean) => void
}

/** Demo mode (Phase 2+): demo scan button, auto Co-Op teammates, shortened countdowns. */
export const useDemoStore = create<DemoState>()(
  persist(
    (set, get) => ({
      enabled: false,
      toggle: () => set({ enabled: !get().enabled }),
      setEnabled: (enabled) => set({ enabled }),
    }),
    { name: 'vte-demo' },
  ),
)
