# Praktyki pracy z agentami AI: indeks

Uniwersalna wiedza do użycia w dowolnym projekcie, podzielona na trzy pliki według tego, czym się akurat zajmujesz. Ten plik to spis treści i router: mówi, który plik otworzyć (i który wskazać agentowi), a sam niczego nie uczy.

Źródło: kurs AI Tech Leaders, tydzień 1 (lekcje 1-5) i tydzień 2 (lekcje 6-10). Stan: lekcja 10 (z własnymi obserwacjami z wykonania pracy domowej w §16 pliku o designie).

## Trzy pliki

| Plik | Sekcje | O czym |
|---|---|---|
| `praktyki-produkt.md` | 9-13 | Analiza wymagań i discovery, product brief, syntetyczni użytkownicy, backlog z briefu, specyfikacja dla agentów |
| `praktyki-design.md` | 14-17 | Generyczny wygląd z AI, design system, kontrola jakości interfejsu (CI, dostępność, test agentem), prototyp |
| `praktyki-inzynieria.md` | 1-8, 18-21 | Stack, repozytorium, architektura, safety net, SDLC, środowisko i skille agentów, GitHub, kodowanie z agentem, bezpieczeństwo warsztatu, context engineering, zasady ogólne |

Numeracja sekcji jest wspólna i niezmieniona, więc odwołania typu „sekcja 19” działają. Odwołania między plikami mają nazwę pliku.

## Gdy robisz X, czytaj Y

| Zadanie | Czytaj | Sekcje |
|---|---|---|
| Zakładasz nowy projekt | `praktyki-inzynieria.md` (checklista startu), potem pozostałe pliki wg potrzeby | 1-8, checklisty |
| Piszesz `AGENTS.md`, porządkujesz kontekst, mierzysz koszt sesji | inżynieria | 2, 20 |
| Dobierasz, instalujesz albo piszesz skille | inżynieria | 7, 19, 20 |
| Konfigurujesz CI, safety net, SDLC | inżynieria | 4, 5, 8 |
| Zbierasz wymagania, robisz brief i backlog | produkt | 9-12 |
| Piszesz albo oceniasz specyfikację | produkt | 13 |
| Budujesz design system albo ekran | design | 14-16 |
| Robisz mapę ekranów i prototyp | design | 17 |
| Implementujesz specyfikację z agentem, review, testy manualne | inżynieria | 18 |
| Uruchamiasz agenta w cudzym repo, ustawiasz sandbox, sekrety, hooki | inżynieria | 19 |
| Zlecasz zadanie agentowi albo oceniasz jego wynik | checklisty w pliku zgodnym z typem zadania (UI i prototyp: design; reszta: inżynieria) | checklisty |

## Jak tego używać

- Człowiek: czytaj plik, którego dotyczy bieżąca praca. Każdy plik ma na końcu własne checklisty (start projektu, zlecenie zadania, przegląd wyniku) i antywzorce dla swojego obszaru. Checklista startu nowego projektu jest rozbita na trzy części, a jej pełna wersja to trzy listy po kolei: inżynieria, produkt, design.
- Agent: nie ładuj wszystkich trzech plików na start. Wskaż mu jeden, zgodny z zadaniem (lub po prostu ten indeks jako router). To ta sama zasada, którą opisuje sekcja 20: kontekst osiągalny, nie obecny.
- Dopisywanie nowych lekcji: nowa sekcja trafia do pliku zgodnego z tematem, z kolejnym numerem. Antywzorce i checklisty dopisuj w tym samym pliku. Ten indeks aktualizuj tylko tabelą i polem „Stan”.

## Uwagi

- Liczby z badań, incydentów i narzędzi pochodzą z materiałów lekcji i nie były sprawdzane w oryginałach (adnotacje są w sekcjach, których dotyczą). Wersje narzędzi i limity zmieniają się szybko, więc sprawdź aktualny stan u siebie.
- Zasady ogólne (sekcja 21) są w pliku inżynieryjnym, a zasady dotyczące designu i prototypu na końcu pliku o designie.
