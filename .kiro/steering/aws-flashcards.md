# AWS Flash Cards — Project Conventions

## TypeScript
- Strict mode, no `any`, prefer `unknown` and narrow
- All components are functional with explicit prop types

## Code Style
- Tailwind only — no inline styles, no CSS modules
- AWS service data lives in `src/data/aws-services.ts` (single source of truth)
- GenAI prompt templates live in `src/lib/prompts.ts`

## Component Rules
- `FlashCard`: pure presentational, receives state via props
- `CardDeck`: handles layout, filtering, delegates state to `useFlashCards` hook
- `GenAIPanel`: renders streaming text, never calls Bedrock directly

## API Routes
- All Bedrock calls go through `src/app/api/genai/route.ts`
- AWS credentials must never be exposed to the browser

## File Structure
```
src/
  app/          # Next.js App Router
  components/   # React components
  data/         # Static AWS service data
  hooks/        # Custom React hooks
  lib/          # Utilities and prompt templates
```
