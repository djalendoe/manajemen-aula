# Design Brief

## Direction

Ruang Terang — a calm, trustworthy multi-hall (aula) management workspace where every room, booking, and schedule reads at a glance.

## Tone

Refined, professional facility-management restraint: spacious off-white surfaces, deep teal authority, warm gold used only as a spark — never decorative noise.

## Differentiation

Status is the interface: a disciplined four-color booking/availability language (menunggu, disetujui, ditolak, dibatalkan · tersedia, sedang dipakai) makes the whole system legible in one scan.

## Color Palette

| Token      | OKLCH (light)     | Role   |
| ---------- | ----------------- | ------ |
| background | 0.985 0.004 220   | cool off-white page surface |
| foreground | 0.19 0.02 225     | primary text |
| card       | 1.0 0.002 220     | elevated content surfaces |
| primary    | 0.44 0.09 210     | deep teal — CTAs, active nav |
| accent     | 0.72 0.14 75      | warm gold — highlights only |
| muted      | 0.955 0.008 220   | quiet fills, chips, table stripes |
| success    | 0.55 0.15 155     | disetujui / tersedia |
| warning    | 0.72 0.15 78      | menunggu / sedang dipakai |
| destructive| 0.55 0.21 25      | ditolak |
| info       | 0.55 0.12 235     | dibatalkan / neutral info |

## Typography

- Display: Space Grotesk — headings, stat numbers, hall names, section titles
- Body: Figtree — paragraphs, labels, table cells, Indonesian UI copy
- Mono: Geist Mono — times, dates, room codes, capacity figures
- Scale: hero `text-4xl md:text-5xl font-bold tracking-tight`, h2 `text-2xl md:text-3xl font-bold tracking-tight`, label `text-xs font-semibold tracking-widest uppercase`, body `text-base`

## Elevation & Depth

Flat page background with two shadow tiers only: `shadow-subtle` for resting cards/tables, `shadow-elevated` for hovered cards, popovers, and modals; borders carry most separation.

## Structural Zones

| Zone       | Background        | Border            | Notes |
| ---------- | ----------------- | ----------------- | ----- |
| Header     | `bg-card`         | `border-b`        | search + user menu, sticky |
| Sidebar    | `bg-sidebar`      | `border-r`        | active item = `bg-sidebar-accent` teal tint |
| Content    | `bg-background`   | —                 | alternate sections `bg-muted/30` |
| Cards/table| `bg-card`         | `border-border`   | `shadow-subtle`, radius `lg` |
| Footer     | `bg-muted/40`     | `border-t`        | quiet meta strip |

## Spacing & Rhythm

Sections gap `gap-6 md:gap-8`; card grids `gap-4 md:gap-6`; card padding `p-5 md:p-6`; micro-spacing `space-y-1.5` inside cards and `gap-2` for chips.

## Component Patterns

- Buttons: `rounded-md`, primary = solid teal with `primary-foreground`; secondary = `bg-secondary`; destructive reserved for tolak/batalkan; hover `transition-smooth` + slight shadow lift
- Cards: `rounded-lg bg-card border shadow-subtle`, hover `shadow-elevated` + `-translate-y-0.5`
- Badges: pill `rounded-full text-xs font-medium px-2.5 py-0.5`, tinted background + solid foreground per status
- Status badges: menunggu = warning, disetujui/tersedia = success, ditolak = destructive, dibatalkan = muted; sedang dipakai = warning

## Motion

- Entrance: `animate-fade-in` 350ms ease-out on cards, lists, and page sections; stagger via inline delay
- Hover: `transition-smooth` 300ms on cards/buttons; cards lift `-translate-y-0.5`
- Decorative: `animate-pulse-soft` only for live "sedang dipakai" indicator dots

## Constraints

- Indonesian-language UI copy throughout; keep labels short and unambiguous
- Never use raw color literals or arbitrary Tailwind colors — semantic tokens only
- Both light and dark mode must hold AA+ contrast; status colors tuned per mode
- No gradients on large surfaces; no purple; no glow shadows
- Do not design surfaces for email notifications or usage reports/exports (out of scope)

## Signature Detail

The status color language is the brand: a single consistent pill system that maps every booking and availability state to one memorable hue, so the schedule and catalog become readable at a glance.
