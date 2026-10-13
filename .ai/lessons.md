# Lessons

Wnioski z błędów i nieoczywistych decyzji. Dopisuj na górze, krótko: kontekst, problem, zasada.

## 2026-10-13: lint w Next.js
Next.js ostrzega o braku pluginu ESLint podczas `next build`. Lint uruchamiamy osobno (`npm run lint`), więc w buildzie jest wyłączony (`ignoreDuringBuilds`). Nie wyłączaj reguł lintu, by wyciszyć ostrzeżenie.

## 2026-10-13: npm audit
`npm audit --omit=dev` zgłasza poziom "high" w zależnościach pośrednich Next.js (postcss, braces). Bramka w CI blokuje od poziomu `critical`. Poziom "high" przeglądamy przy aktualizacjach Next.js. Gdy pojawi się poprawka, podnieś próg do `high`.
