# Project Guidance

## User Preferences

- Fokus multi-aula: banyak ruangan/aula dalam satu sistem
- Bahasa antarmuka Indonesia
- Tampilan profesional, bersih, dan lapang

## Verified Commands

- **typecheck**: `pnpm typecheck`
- **fix**: `pnpm fix`
- **build**: `pnpm build`

## Learnings

- Backend DateKey is YYYYMMDD (year*10000+month*100+day), not epoch-days; frontend date helpers in src/frontend/src/lib/format.ts must encode/decode it the same way or createBooking fails with #invalidDate.
- With [canisters.backend.migrations] check-limit=1, keep exactly one pending migration file; fold all pending changes into the latest pending file and remove earlier ones.
- Motoko has no triple-quoted multi-line text literal; author long static strings as adjacent single-line literals joined with # and explicit \n escapes.
- OQL auto-derivation (.toEntity) cannot handle a record with a collection field ([Text]) or variant/option fields; use .toEntityManual with one .payload per column.
- Hall availability must come from the backend status (approved booking covering now) or today's day schedule, never from the hall.active admin flag.
- Catalog facility filter values must match the seeded facility strings exactly (Proyektor, Tata Suara, AC, Panggung, WiFi, Meja Lipat, TV Layar Besar, Papan Tulis, Area Pameran).
- Backend enums (BookingStatus, HallAvailability, UserRole) are value enums from @/backend; use HallAvailability.available / .occupied rather than string literals.
- Frontend pages are resolved via import.meta.glob('./pages/*.tsx') in App.tsx, so page files drop in without editing the router.
- Root test command is pnpm --dir app test (Vitest + @testing-library/react + jsdom); the PocketIC backend lane skips when no lane test file or backend wasm exists.
