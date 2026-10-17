export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
export const USERNAME_RE = /^[a-z0-9_]{3,20}$/
export const PASSWORD_MIN = 8

/** 0 (very weak) – 4 (strong). */
export function passwordStrength(password: string): 0 | 1 | 2 | 3 | 4 {
  if (!password) return 0
  let score = 0
  if (password.length >= PASSWORD_MIN) score++
  if (/[a-zəıöüğşç]/.test(password) && /[A-ZƏIÖÜĞŞÇİ]/.test(password)) score++
  if (/\d/.test(password)) score++
  if (/[^A-Za-z0-9əıöüğşçƏIÖÜĞŞÇİ]/.test(password) || password.length >= 12) score++
  return Math.min(score, 4) as 0 | 1 | 2 | 3 | 4
}
