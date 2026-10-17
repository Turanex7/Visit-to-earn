# PROGRESS.md — Visit-to-Earn handoff

Update this file and `README.md` after substantial work and before handing the project off.

## Current state — 17 October 2026

- **Phase:** PHASE 1 — Foundation + Login/Onboarding.
- **Status:** Implemented; production build succeeds.
- **Most recent work:** Recovered the actual checkpoint from the code rather than relying on the stale handoff. The previous agent had set up Vite, theme tokens, UI primitives, API/store groundwork and character assets, but had not yet added an app entry point, router or screens. Completed those missing PHASE 1 pieces.
- **README status:** The repository did not contain a README. Added `README.md` with run instructions and current handoff summary.
- **Build check:** `pnpm build` passed. Non-blocking Vite notices: config-loader format and a 559 kB minified JS chunk.
- **Uncommitted changes:** The folder is not a Git repository, so no Git diff/status is available.

## Implemented

- Vite/React app entry, router, global error boundary and centered 430px desktop phone frame.
- Dark Azerbaijani-inspired theme, Nunito Variable font, shared UI components and persistent auth/UI/demo stores.
- Azerbaijani translation resource and English/Russian starter resources.
- Mock API functions with artificial latency and endpoint comments; username checks and mock account registration/login.
- Route guards for public pages, guest browsing, authenticated users and setup wizard resume.
- Screens: splash, four-slide onboarding, login, registration, forgot/reset password, university selection, character selection, permission requests and four-step tutorial.
- Main shell with TopHUD and five-slot bottom navigation. Phase 2+ destinations remain clear placeholders as specified.
- Tutorial demo awards 50 XP and the first explorer badge. Auth, profile setup and permission status persist locally.

## Next steps

1. **PHASE 2:** Build Home, Map, Museum, Quest list/detail/runner, manual/demo QR scan, quiz, reward flow and `/dev/qr`; persist quest progress.
2. Verify the UI in browser at 390×844 and check Azerbaijani glyph rendering.
3. Consider code splitting to address the current bundle-size advisory.
4. Continue through PHASE 3–5 only after the preceding phase is usable.

## Run

- `pnpm install`
- `pnpm dev`
- `pnpm build`

Demo account: `demo@visit.az / demo1234`.

## Source spec

User-provided master spec: `/Users/turan/Downloads/visit-to-earn-frontend-prompt.md`.
