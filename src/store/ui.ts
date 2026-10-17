import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { PermissionKey, PermissionState } from '@/types'

export type ToastTone = 'success' | 'error' | 'info' | 'gold'
export interface Toast {
  id: string
  tone: ToastTone
  message: string
}

interface UiState {
  toasts: Toast[]
  pushToast: (tone: ToastTone, message: string) => void
  dismissToast: (id: string) => void
}

export const useUiStore = create<UiState>()((set, get) => ({
  toasts: [],
  pushToast: (tone, message) => {
    const id = Math.random().toString(36).slice(2)
    set({ toasts: [...get().toasts.slice(-2), { id, tone, message }] })
    setTimeout(() => get().dismissToast(id), 3200)
  },
  dismissToast: (id) => set({ toasts: get().toasts.filter((t) => t.id !== id) }),
}))

export const toast = {
  success: (m: string) => useUiStore.getState().pushToast('success', m),
  error: (m: string) => useUiStore.getState().pushToast('error', m),
  info: (m: string) => useUiStore.getState().pushToast('info', m),
  gold: (m: string) => useUiStore.getState().pushToast('gold', m),
}

interface PermissionsState {
  statuses: Record<PermissionKey, PermissionState>
  setStatus: (key: PermissionKey, status: PermissionState) => void
}

export const usePermissionsStore = create<PermissionsState>()(
  persist(
    (set, get) => ({
      statuses: { camera: 'unknown', location: 'unknown', notifications: 'unknown' },
      setStatus: (key, status) => set({ statuses: { ...get().statuses, [key]: status } }),
    }),
    { name: 'vte-permissions' },
  ),
)
