# Utkarsh Capital — homepage

Built for Next.js (App Router) + Tailwind CSS.

## Files

- `page.tsx` → put at `app/page.tsx`
- `layout.tsx` → put at `app/layout.tsx` (adds the two Google Fonts as CSS
  variables). If you already have a layout, just copy the font setup into it.
- `tailwind.config.ts` → replace/merge with your project's config. It adds
  the `ink`, `brand`, `gold`, `cream`, `muted` colors and the `serif`/`sans`
  font families the page uses.

## Setup

```bash
npx create-next-app@latest utkarsh-capital --typescript --tailwind --app
cd utkarsh-capital
npm install lucide-react
```

Then drop in the three files above, make sure `app/globals.css` still has
the three `@tailwind` directives, and run:

```bash
npm run dev
```

## Notes

- All copy lives in the arrays at the top of `page.tsx` (`LOAN_OPTIONS`,
  `FEATURES`, `CHARGES`, `FAQS`) — edit those rather than the JSX to change
  text, rates, or add/remove cards.
- The EMI calculator computes a real amortization formula from the three
  sliders — nothing is hardcoded.
- Only icons come from `lucide-react`; everything else is plain Tailwind,
  so it deploys to Vercel with no extra config.
