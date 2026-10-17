import confetti from 'canvas-confetti'

export function fireConfetti(): void {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const colors = ['#F2B84B', '#19B5C7', '#C8283B', '#F5F1E6']
  void confetti({ particleCount: 110, spread: 75, startVelocity: 42, origin: { y: 0.55 }, colors, zIndex: 9999 })
  setTimeout(() => {
    void confetti({ particleCount: 60, spread: 110, origin: { y: 0.5 }, colors, zIndex: 9999 })
  }, 220)
}
