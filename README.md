# Visit-to-Earn

Mobile-first PWA frontend concept that turns Baku museum visits into quests. The interface is Azerbaijani-first and uses mock data until a backend is available.

## Run locally

```sh
pnpm install
pnpm dev
```

Production build: `pnpm build`.

Demo login: `demo@visit.az` / `demo1234`.

## Current handoff — 17 October 2026

**Phase 1 (foundation and login/onboarding) is implemented.** Project setup, Tailwind theme, mobile phone frame, reusable UI components, Azerbaijani i18n plus English/Russian stubs, Zustand persistence, delayed mock API, route guards, bottom navigation, TopHUD, onboarding, auth flows, setup wizard and tutorial are present. Other main tabs intentionally open Phase 2+ placeholders.

The project had no README when work resumed. See [PROGRESS.md](./PROGRESS.md) for the detailed work log and next steps. Keep both files current when handing off work.

Build check: `pnpm build` passes (17 Oct 2026). Vite reports a config-loader notice and a large-bundle advisory; neither blocks the build.

## Product direction

Follow the user's master spec at `~/Downloads/visit-to-earn-frontend-prompt.md`. Implement one phase at a time. Keep all user-facing copy Azerbaijani-first, route data through `src/api`, and persist user progress in local storage. GPS is only for nearby suggestions; quest completion must be QR-based.
