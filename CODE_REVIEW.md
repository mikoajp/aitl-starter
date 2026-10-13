# Code review: lista kontrolna

**Poprawność**
- Zmiana robi to, co opisuje issue/specyfikacja, i nic ponad to.
- Przypadki brzegowe i błędy obsłużone, błędy domenowe mają własne typy.

**Testy**
- Nowa logika ma testy jednostkowe, zmiany w bazie mają test integracyjny.
- Testy sprawdzają zachowanie, nie implementację. Brak testów zależnych od czasu lub kolejności.

**Architektura**
- Zależności idą w jednym kierunku (web → core, application → interfejsy).
- Brak I/O w `domain/`. Zależności przez wstrzykiwanie, nie importy singletonów.

**Bezpieczeństwo i dane**
- Wejście walidowane na granicy systemu. Brak sekretów w kodzie i logach.
- Zapytania przez ORM lub parametryzowane.

**Zgodność wsteczna**
- Publiczne API, schemat bazy i zdarzenia zmieniane zgodnie z `BACKWARD_COMPATIBILITY.md`.

**Czytelność**
- Nazwy mówią, co robią. Brak martwego kodu i `console.log`.
