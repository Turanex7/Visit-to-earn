export class ApiError extends Error {
  constructor(
    public code: string,
    message?: string,
  ) {
    super(message ?? code)
    this.name = 'ApiError'
  }
}

/** Artificial network latency (300–800ms) so loading states are visible. */
export function delay(min = 300, max = 800): Promise<void> {
  const ms = Math.round(min + Math.random() * (max - min))
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/** Returns a deep copy so components can never mutate mock data. */
export function clone<T>(value: T): T {
  return structuredClone(value)
}
