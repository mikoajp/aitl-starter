# Standardy inżynierskie

## Kod
- TypeScript w trybie `strict`. Zakaz `any` bez uzasadnienia w komentarzu.
- Funkcje małe, jedna odpowiedzialność. Czyste funkcje w `domain/`.
- Błędy domenowe jako dedykowane klasy, nie gołe `Error`/stringi.
- Brak `console.*` (lint). Logowanie przez dedykowany logger.
- Nazwy plików: `camelCase.ts`, komponenty React `kebab-case.tsx` w `components/ui`.

## Testy
- Piramida: wiele szybkich testów jednostkowych, mniej integracyjnych, nieliczne end-to-end.
- Jednostkowe: bez sieci i bazy, zależności jako interfejsy z podmianą w pamięci. Próg 100% dla `domain/` i `application/`.
- Integracyjne: prawdziwy PostgreSQL w kontenerze (testcontainers). Lokalnie bez Dockera: `TEST_DATABASE_URL`.
- Testy UI w przeglądarce (agent-browser/Playwright) dla kluczowych przepływów, dodawane wraz z funkcjami UI.
- Każdy naprawiany błąd zaczyna się od testu, który go odtwarza.

## Git i PR
- Commity w trybie rozkazującym, zwięzłe, z kontekstem "dlaczego".
- Brak force-push na `main`. Merge przez PR z zielonym CI.
- PR opisuje co, dlaczego, jak przetestowano.

## Bezpieczeństwo
- Sekrety tylko ze zmiennych środowiskowych. `.env` w `.gitignore`.
- Wejście walidowane na granicy (API, formularze).
- Zależności aktualizowane regularnie (Dependabot), audyt w CI.
