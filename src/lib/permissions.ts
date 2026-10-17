import type { PermissionKey, PermissionState } from '@/types'

async function requestCamera(): Promise<PermissionState> {
  if (!navigator.mediaDevices?.getUserMedia) return 'unsupported'
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
    stream.getTracks().forEach((track) => track.stop())
    return 'granted'
  } catch {
    return 'denied'
  }
}

function requestLocation(): Promise<PermissionState> {
  if (!('geolocation' in navigator)) return Promise.resolve('unsupported')
  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      () => resolve('granted'),
      () => resolve('denied'),
      { timeout: 10000 },
    )
  })
}

async function requestNotifications(): Promise<PermissionState> {
  if (!('Notification' in window)) return 'unsupported'
  try {
    const result = await Notification.requestPermission()
    return result === 'granted' ? 'granted' : 'denied'
  } catch {
    return 'denied'
  }
}

export function requestPermission(key: PermissionKey): Promise<PermissionState> {
  if (key === 'camera') return requestCamera()
  if (key === 'location') return requestLocation()
  return requestNotifications()
}
