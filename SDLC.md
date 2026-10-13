# SDLC: jak powstaje zmiana

1. **Zadanie**: issue na GitHubie z celem i kryteriami akceptacji.
2. **Specyfikacja** (zmiany nietrywialne): `.ai/specs/YYYY-MM-DD-nazwa.md` z sekcjami: cel, zakres, model danych/API, przypadki brzegowe, plan testów. Zatwierdza człowiek.
3. **Gałąź**: `feat/...`, `fix/...`, `docs/...`. Dla równoległej pracy agentów osobny `git worktree` na zadanie.
4. **Implementacja**: małe commity, testy razem z kodem.
5. **Walidacja lokalna**: `npm run validate` i `npm run test:integration`.
6. **Pull request**: opis (co, dlaczego, jak przetestowano), powiązane issue, zgodność z `BACKWARD_COMPATIBILITY.md`.
7. **CI**: lint, typecheck, build, unit z pokryciem, integracyjne. Merge tylko przy zielonych sprawdzeniach.
8. **Review**: wg `CODE_REVIEW.md`. Poprawki w tym samym PR.
9. **Merge** (squash) do `main`.
10. **Retrospektywa**: wnioski z błędów do `.ai/lessons.md`.
