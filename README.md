# AITL Starter

Monorepo startowe do pracy z agentami AI: Next.js + React + Tailwind (apps/web), domena + Awilix + MikroORM + PostgreSQL (packages/core), CI jako siatka bezpieczeństwa.

```bash
npm ci
npm run validate          # lint + typecheck + build + testy jednostkowe (100% pokrycia domeny)
npm run test:integration  # wymaga Dockera (testcontainers) albo TEST_DATABASE_URL
npm run dev -w @aitl/web  # http://localhost:3000, health: /api/health
```

Zasady dla agentów: [AGENTS.md](AGENTS.md). Proces: [SDLC.md](SDLC.md). Review: [CODE_REVIEW.md](CODE_REVIEW.md).
