# AGENTS.md

Instrukcje dla agentów AI (Claude Code, Codex, Cursor i innych). To jedyne źródło prawdy. `CLAUDE.md` tylko go importuje.

## Projekt
Monorepo TypeScript: `apps/web` (Next.js, React, Tailwind, shadcn-style UI) i `packages/core` (domena, serwisy aplikacyjne, Awilix, MikroORM + PostgreSQL).

## Komendy
| Cel | Komenda |
|---|---|
| Lint | `npm run lint` |
| Typecheck | `npm run typecheck` |
| Build | `npm run build` |
| Testy jednostkowe (z pokryciem) | `npm test` |
| Testy integracyjne (Docker lub `TEST_DATABASE_URL`) | `npm run test:integration` |
| Komplet przed PR | `npm run validate` oraz `npm run test:integration` |

## Zasady pracy
1. Przeczytaj `SDLC.md`, `CODE_REVIEW.md`, `BACKWARD_COMPATIBILITY.md` i `docs/ENGINEERING_STANDARDS.md` przed zmianą kodu.
2. Zmiana nietrywialna zaczyna się od specyfikacji w `.ai/specs/` (data w nazwie pliku). Zaimplementuj zatwierdzony opis, nie własną interpretację.
3. Jeden PR, jeden cel. Mały zakres, czytelny diff.
4. Każda zmiana w kodzie ma testy. Nowy kod w `domain/` i `application/` ma 100% pokrycia (wymusza to CI).
5. Przed ukończeniem uruchom wszystkie komendy z tabeli. Nie deklaruj sukcesu bez zielonych wyników.
6. Wniosek z błędu lub nieoczywistej decyzji dopisz do `.ai/lessons.md`.
7. Nie commituj sekretów ani plików `.env`. Nie omijaj hooków i CI (`--no-verify` zabronione).

## Architektura
- `domain/`: czyste funkcje i typy, bez I/O.
- `application/`: serwisy zależne od interfejsów (np. `TaskRepository`), wstrzykiwane przez Awilix.
- `infrastructure/`: MikroORM, baza. Pokryte testami integracyjnymi.
- `apps/web` importuje `@aitl/core`, nigdy odwrotnie.

## Struktura `.ai/`
`specs/` specyfikacje, `runs/` logi uruchomień agentów, `lessons.md` wnioski, `agentic.config.json` konfiguracja pipeline'u.

## Skille agentów
- Zainstalowane z `open-mercato/skills` (`npx skills add open-mercato/skills --skill '*'`) do `.claude/skills` i `.agents/skills`. Wersje zapisane w `skills-lock.json`.
- Nie edytuj zainstalowanych skilli bezpośrednio. Dopasowania robimy w `.ai/skills/<nazwa>/SKILL.md` (rozszerzenie skilla o tej samej nazwie). Aktualnie: `om-code-review`.
- Konfiguracja procesu: `.ai/agentic.config.json`, `SDLC.md`, `CODE_REVIEW.md`. Skill `om-setup-agent-pipeline` może je wygenerować od nowa.
