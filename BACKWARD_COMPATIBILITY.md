# Zgodność wsteczna

Obszary objęte kontraktem (zmiana wymaga ścieżki wycofania):

| Obszar | Zasada |
|---|---|
| Publiczne eksporty `@aitl/core` | Nie usuwamy ani nie zmieniamy sygnatur bez okresu przejściowego. Najpierw dodaj nowe, oznacz stare `@deprecated`, usuń w kolejnym wydaniu. |
| Trasy HTTP (`/api/*`) | Nie zmieniamy kształtu odpowiedzi ani kodów statusu. Zmiany łamiące idą pod nową wersją ścieżki. |
| Schemat bazy | Migracje tylko addytywne w jednym wydaniu (nowa kolumna nullable lub z domyślną wartością). Usunięcie i zmiana typu dopiero po tym, jak żaden kod z nich nie korzysta. |
| Zmienne środowiskowe | Nowe są opcjonalne z sensowną domyślną wartością. Zmiana nazwy wymaga obsługi obu nazw przez jedno wydanie. |

Zmiana łamiąca musi być opisana w PR (sekcja "Breaking change") i w `CHANGELOG.md`.
