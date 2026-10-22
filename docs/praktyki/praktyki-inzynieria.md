# Praktyki: inżynieria pracy z agentami AI

Stack, repozytorium, architektura, safety net, proces (SDLC), środowisko i skille agentów, GitHub, kodowanie z agentem, bezpieczeństwo warsztatu, zarządzanie kontekstem oraz zasady ogólne. Sekcje 1-8 i 18-21.

Część zbioru praktyk AI Tech Leaders. Indeks i tabela „gdy robisz X, czytaj Y”: `README.md` (ten katalog). Numeracja sekcji jest wspólna dla wszystkich plików (nie przenumerowana), żeby odwołania i notatki się nie gubiły.

---

## 1. Dobór stacku pod pracę z AI
- Wybieraj technologie, z którymi modele radzą sobie dobrze: dużo publicznego kodu, jawne typy, silne konwencje. Moda nie jest kryterium.
- Język typowany (TypeScript) i tryb `strict` wyłapują błędy, które agent mógłby wprowadzić niezauważenie.
- Relacyjna baza (PostgreSQL) i ORM z jawnie opisanymi encjami są łatwiejsze do czytania i zmiany przez agenta niż ukryta magia.
- Wstrzykiwanie zależności (np. Awilix) i interfejsy zamiast importowania singletonów: agent może testować i podmieniać elementy bez zmiany reszty.
- UI: system utility-first (Tailwind) i biblioteka komponentów zamiast własnego CSS. Mniej decyzji, bardziej przewidywalny wynik. Sama biblioteka nie jest jeszcze wyglądem produktu (patrz `praktyki-design.md`, sekcje 14-16).

## 2. Struktura repozytorium pod agentów
- Jeden plik instrukcji w korzeniu (`AGENTS.md`) jako źródło prawdy. Pliki specyficzne dla narzędzi (`CLAUDE.md`) tylko go importują (`@AGENTS.md`). Nie utrzymuj dwóch wersji.
- Katalog na wiedzę dla agentów (np. `.ai/`): `specs/` (specyfikacje), `runs/` (logi uruchomień), `lessons.md` (wnioski z błędów), plik konfiguracji pipeline'u.
- Monorepo z podziałem na pakiety: granice modułów są widoczne, agent nie miesza odpowiedzialności.
- Zasady trzymaj w repo, nie w czacie ani w głowie. Agent bez kontekstu zgaduje.
- Zawartość dobrego `AGENTS.md`: opis projektu, tabela komend (lint, typecheck, build, testy), zasady pracy, zasady architektury, odsyłacze do dokumentów procesowych.
- `AGENTS.md` to budżet, nie dokumentacja: płacisz za niego w każdej sesji. Zostaw komendy, konwencje niewyprowadzalne z kodu, granice i routing, a szczegóły modułów przenieś do plików przy kodzie (sekcja 20).
- Standardy inżynierskie w osobnym pliku (styl, nazewnictwo, architektura, testy, bezpieczeństwo), do którego odsyła `AGENTS.md`.
- Dla interfejsu: skrót design systemu w osobnym pliku (np. `docs/design-system.md`), do którego odsyła `AGENTS.md`. Agent budujący ekran czyta go jako pierwszy (`praktyki-design.md`, sekcja 15).

## 3. Architektura przyjazna agentom
- Warstwy: `domain/` (czyste funkcje i typy, bez I/O), `application/` (serwisy zależne od interfejsów), `infrastructure/` (baza, sieć). Zależności idą w jedną stronę.
- Czas, losowość i identyfikatory wstrzykuj (`now`, `generateId`), zamiast czytać `Date.now()` w domenie. Funkcje stają się deterministyczne i testowalne.
- Błędy domenowe jako dedykowane klasy, nie gołe `Error` ani stringi.
- Kontrakty (publiczne eksporty, trasy HTTP, schemat bazy, zmienne środowiskowe) mają osobny dokument zgodności wstecznej. Zmiana łamiąca wymaga ścieżki wycofania: najpierw nowe obok starego, stare `@deprecated`, usunięcie w kolejnym wydaniu. Migracje bazy addytywne w jednym wydaniu, usunięcia dopiero po tym, jak nic z tego nie korzysta.

## 4. Safety net (siatka bezpieczeństwa)
Zasada: agent może pracować szybko tylko wtedy, gdy każdy błąd jest wychwytywany automatycznie. Siatkę stawiasz przed pierwszą funkcją, bo dołożenie jej później kosztuje wielokrotnie więcej.
- Lint (zakaz `console.*`, nieużywanych zmiennych).
- Typecheck i build całego projektu. Skrócony `tsc` dla jednego pakietu nie wyłapuje błędów między modułami.
- Testy jednostkowe: szybkie, bez sieci i bazy, zależności jako interfejsy podmieniane w pamięci. Próg pokrycia (np. 100% dla `domain/` i `application/`) wymuszony w konfiguracji, nie w opisie PR.
- Testy integracyjne na prawdziwych zależnościach: baza w kontenerze (testcontainers). Lokalnie bez Dockera: zmienna ze wskazaniem istniejącej bazy.
- Testy UI w przeglądarce dla kluczowych przepływów, dodawane razem z funkcjami UI.
- Dla interfejsu dwie dodatkowe bramki: sprawdzenie wartości spoza tokenów (kolory, odstępy wpisane na sztywno) i testy dostępności komponentów, które kończą się błędem przy naruszeniu (`praktyki-design.md`, sekcja 16).
- Audyt zależności w CI. Poziom blokujący dobierz do realiów (np. `critical`), a niższe poziomy przeglądaj przy aktualizacjach.
- CI na każdym PR, merge tylko przy zielonych sprawdzeniach. Dla forków każdy workflow może wymagać ręcznego zatwierdzenia.
- Przed uznaniem PR za gotowy sprawdź także stan scalania z gałęzią bazową (konflikty w plikach generowanych) i wymagane zatwierdzenia, a nie tylko "testy były zielone".
- Agent potrzebuje sygnału z zewnątrz (typecheck, lint, testy, build), nie samooceny: bez niego samopoprawa pogarsza wynik (sekcja 18).
- Każdy naprawiany błąd zaczyna się od testu, który go odtwarza.
- Testy sprawdzają zachowanie, nie implementację. Bez testów zależnych od czasu i kolejności.

## 5. Proces wytwarzania (SDLC) opisany na piśmie
- `SDLC.md`: jak powstaje zmiana (zadanie, specyfikacja, gałąź, implementacja, walidacja lokalna, PR, CI, review, merge, retrospektywa).
- `CODE_REVIEW.md`: lista kontrolna review (poprawność, testy, architektura, bezpieczeństwo, zgodność wsteczna, czytelność).
- `BACKWARD_COMPATIBILITY.md`: chronione kontrakty i zasady ich zmiany.
- Konfiguracja pipeline'u w pliku (gałąź bazowa, tracker, komendy walidacji, ścieżki, etykiety, checklista review), z której korzystają narzędzia agentów.
- Specyfikacja przed kodem przy zmianach nietrywialnych: agent implementuje zatwierdzony opis, a nie własną interpretację. Specyfikacje mają stały szablon i datę w nazwie pliku.
- Wnioski z błędów i nieoczywistych decyzji idą do `lessons.md`: kontekst, problem, zasada. Ten sam błąd nie powinien wrócić.
- Szablon PR: co i dlaczego, jak przetestowano, czy jest zmiana łamiąca.
- Design system musi trafić do procesu, a nie tylko do dokumentacji komponentów: krok UI w `SDLC.md` (specyfikacja wskazuje komponenty i zgłasza luki, walidacja obejmuje kontrolę tokenów i testy Storybooka, po większej zmianie test agentem), blok "Interfejs" w `CODE_REVIEW.md`, pole UI w szablonie PR (zrzut jasny i ciemny) i dodatkowe reguły w repozytoryjnym skillu review z poziomami powagi (wartość na sztywno to major). Bez tego agent i recenzent nie mają skąd wiedzieć, że UI ma własne bramki.

## 6. Środowisko pracy agentów
- Autoryzuj CLI narzędzi (np. `gh auth login`), żeby agent pracował na repo i PR-ach bez ręcznej pomocy. Sekrety nigdy w repo ani w poleceniach wpisywanych przez agenta.
- `git worktree`: osobny katalog roboczy na zadanie, wiele agentów równolegle bez kolizji.
- Wiele agentów wymaga blokad: oznaczaj zadanie "w toku" (etykieta), żeby dwa agenty nie robiły tego samego. Agent widzący blokadę zgłasza to i nie podejmuje zadania.
- Koordynator równoległych sesji (kolejka zadań, jeden widok) przydaje się, gdy zadań jest więcej niż uwagi człowieka.
- Zainstalowane narzędzia i skille mogą działać z pełnymi uprawnieniami agenta. Przejrzyj je przed użyciem. Konkretne ryzyka i obrony: sekcja 19.
- Tryb nieinteraktywny (`-p`) nadaje się do przeglądów i generowania dokumentów. Człowiek nadal czyta wynik.

## 7. Skille agentów
- Skill to zbiór instrukcji plus opcjonalne assety i skrypty. Zapisuje powtarzalny proces, żeby nie tłumaczyć go przy każdym zadaniu.
- Różnica wobec pliku instrukcji: skill ładuje się tylko, gdy jest potrzebny, więc agent nie tonie w instrukcjach. Zasady ogólne idą do pliku instrukcji, procesy do skilli. Opis skilla (ładowany zawsze) mówi kiedy go użyć, treść mówi jak (sekcja 20).
- Standard i dobre praktyki pisania: agentskills.io. Katalogi gotowych skilli: skills.sh.
- Instalacja: `npx skills add <org>/<repo> --skill '*'`, wybór agentów. Preferuj instalację per projekt zamiast globalnej. Tryb `--copy` unika zależności od dowiązań. Plik lock zapisuje wersje.
- Katalogi: `.claude/skills` (Claude Code), `.agents/skills` (pozostałe agenty). Wywołanie: `/nazwa` w Claude Code, `$nazwa` w Codex.
- Nie edytuj zainstalowanych skilli, bo aktualizacja je nadpisze. Dopasowuj przez rozszerzenie lokalne: skill o tej samej nazwie w `.ai/skills/<nazwa>/SKILL.md`, który importuje bazowy (`@ścieżka`) i dodaje reguły projektu. Reguły lokalne wygrywają w specyfice repo, ale nie osłabiają reguł bezpieczeństwa skilla bazowego.
- Skille to zewnętrzne zależności, które mogą wykonać kod albo zawierać złośliwą instrukcję. Czytaj każdy, którego nie napisałeś, skanuj grepem i narzędziem, a nowe i zmiany skilli wprowadzaj przez pull request z review (sekcja 19).
- Rozszerzenie sprawdź na gałęzi testowej z celowym naruszeniem (np. `console.log` w domenie). Jeśli raport nie zgłasza lokalnej reguły, nadpisanie nie działa.
- Dobre skille są niezależne (instalowalne pojedynczo), podzielone na pliki w `references/` (agent ładuje tylko to, co potrzebne, więc oszczędzasz kontekst) i na początku odwołują się do pliku konfiguracji.
- Skille komponują się w większe przepływy (weryfikacja zgłoszenia, analiza przyczyny, poprawka, PR, review). Warianty interaktywne działają z człowiekiem, automatyczne bez niego.
- Pierwszy własny skill wyłania się zwykle z powtarzanego promptu code review z regułami projektu. Potem warto ujednolicić specyfikacje i opis PR.

## 8. Przepływ pracy na GitHubie (lekki SDLC)
- GitHub jako jedyne źródło prawdy: Issues (zadania), Pull Requesty (zmiany), etykiety (stan). Na start wystarczy, bez Jiry i Projects.
- Etykiety stanu PR: `review`, `changes-requested`, `merge-queue`. Analogiczne dla zadań. Filtrowanie po etykietach rozwiązuje problem zalewu PR-ów.
- Ścieżka: zgłoszenie (szukanie duplikatów i specyfikacji, etykiety wg szablonu), implementacja, PR, review wg reguł projektu.
- Tracker jest wymienny, jeśli warstwa skilli go abstrahuje.
- Review przez agenta pokazuje wynik bramki walidacji z faktycznymi wynikami. "Nie uruchomiono" jest legalnym wynikiem z podaniem powodu.
- Review kodu robi osobna sesja, najlepiej modelem z innej rodziny niż ten, który pisał kod (sekcja 18).

## 18. Kodowanie z agentem w trybie interaktywnym
- Tryb interaktywny to taki, w którym z agentem jeszcze sporo rozmawiasz: podajesz pliki, wskazujesz, z czego ma korzystać, testujesz ręcznie, puszczasz review i poprawiasz błędy. Wejściem do implementacji są wszystkie wcześniejsze artefakty: reguły i architektura w repozytorium (`AGENTS.md`), brief, design system, prototyp i specyfikacja. Brief, reguły i design system nie idą prosto do kodu, tylko najpierw do specyfikacji i prototypu, a dopiero te dwie rzeczy zasilają kod.
- Prototyp wypełnia dziurę między specyfikacją a kodem: daje język wizualny, w którym można rozmawiać z klientem (makieta lub prototyp z komentarzami porządkuje tę komunikację).
- Zamiast czytać całą specyfikację ekran po ekranie przy każdym zadaniu, wskaż agentowi opis ekranów prototypu (np. README prototypu z listą ekranów, scenariuszy i mapą na pliki źródłowe).

### Przebieg implementacji
- Jeden inicjalny prompt uruchamia całość: wskazuje plik specyfikacji, każe ją przeczytać i podzielić na stabilne, możliwe do zaimplementowania zadania, realizować je po kolei, zatrzymać się do ręcznego testu po każdej fazie, każde zadanie robić subagentem, od razu utworzyć plik `track.md` ze statusem (fazy, zadania w fazach, zakończone oznaczane jako wykonane) i po każdym zadaniu zrobić commit.
- Przebieg jednej fazy: inicjalny plan, podział na zadania, implementacja zadania, wewnętrzny check agenta (typecheck, lint, skryptowe checki, testy, build), commit i wpis do `track.md`, powrót do implementacji kolejnego zadania. Po ostatnim zadaniu STOP i przekazanie człowiekowi: testy manualne i review kodu drugim agentem. Uwagi wracają do sesji implementacyjnej. Po wszystkich fazach review całej specyfikacji.
- `track.md` pozwala odtworzyć stan po przerwie. Commit po każdym zadaniu to punkt powrotu, gdy skończy się limit, padnie API albo coś pójdzie nie tak: ostatni commit i stan w trackerze mówią, gdzie agent skończył. W trackerze zostają też otwarte punkty z wcześniejszych zadań (agent dopisuje je przy kolejnym), które przy wielu zadaniach łatwo zgubić.
- Subagent na zadanie ma własne okno kontekstowe, a do głównego wątku wraca tylko wynik. Dzięki temu główna sesja zmieściła całą implementację czterech faz w około pół miliona tokenów bez kompaktowania (kontekst po zadaniu 3 to 169 tys., przy zadaniu 9 247 tys.). Stan kontekstu sprawdzisz komendą `/context`, razem z tym, ile zjadają skille. Subagenci służą jakości, nie oszczędności (sekcja 20).
- Otwarte pytanie, na które sam nie znasz odpowiedzi (np. czy prototypowy przepływ narusza wymaganie), nie blokuje pracy w małym zespole: podejmij decyzję roboczą, zapytaj osobę, która zna kontekst, i odwróć decyzję, jeśli odpowiedź będzie inna.

### Sygnał z zewnątrz zamiast samooceny
- Self-correction bez zewnętrznego sygnału pogarsza wynik. W badaniu na GPT-4 i benchmarku GSM8K (zadania tekstowe z matematyki szkolnej, około 8,5 tys.) odpowiedzi poprawnych było 95,5%, po jednej rundzie samopoprawy 91,5%, po drugiej 89,0%. Gdy model dostał z zewnątrz informację, czy odpowiedź jest poprawna, wynik wzrósł do 97,5%.
- Wniosek dla kodowania: nie proś agenta, żeby ocenił swój kod, tylko wskaż mu skrypty safety netu, które zawsze dla tego samego kodu dają ten sam wynik. Typecheck (`tsc --noEmit`) sprawdza typy bez uruchamiania kodu, lint pilnuje reguł i stylu, testy porównują wynik z oczekiwanym, build sprawdza, czy aplikacja się kompiluje. Czerwony wynik to dla agenta konkretny sygnał, co i gdzie poprawić.
- `AGENTS.md` trzyma obowiązek uruchamiania wszystkich statycznych checków po każdym zadaniu i fazie, dzięki czemu agent robi to bez przypominania.
- Przy błędzie wklej agentowi dokładny komunikat (np. wynik typechecku) i poproś o root cause, zamiast kazać mu szukać go od zera: oszczędzasz kontekst i czas. Debugowanie z agentem, który znajduje przyczynę przez subagenta, jest dziś zwykle szybsze niż ręczne.

### Review: trzy pułapki i wybór recenzenta
- Agent, który napisał kod, słabo go sprawdza. Trzy pułapki, każda z obejściem:
  - **Self-correction blind spot.** Model nie poprawia błędu we własnym wyjściu w tej samej sesji, choć poprawiłby ten sam błąd podany jako cudzy. Przeszkadza mu zebrany kontekst. Obejście: ten sam model w nowej sesji. W badaniu Self-Correction Bench na 14 modelach otwartych model średnio w 64,5% przypadków nie poprawił błędu we własnym wyjściu. To największy pojedynczy uzysk.
  - **Self-preference bias.** Model faworyzuje własne wyjście także w innej sesji (rozpoznaje własny tekst, a im lepiej to robi, tym mocniej go preferuje jako sędzia). Obejście: inny model.
  - **Familiarity bias.** Inny model z tej samej rodziny (np. Opus i Sonnet) jest wciąż delikatnie stronniczy, bo podobne metody trenowania dają podobne błędy. Sędzia wyżej ocenia modele, które mylą się podobnie do niego. Obejście: model z innej stajni.
- Wniosek: model koduje, a review w osobnej sesji robi model z innej rodziny. Ustaw to jako stały element procesu po każdej fazie, a nie wyjątek.
- Uwagi z review wracaj do sesji implementacyjnej (agent ma wtedy pełen kontekst zmian), nie do sesji recenzenta. Blokery i majory popraw przed kolejną fazą. Recenzent też uruchamia checki.
- Najlepszy ogólnie model nie musi być najlepszym recenzentem. Wyniki w kodowaniu i w review się rozjeżdżają, a w benchmarkach review dobrze wypadają także tańsze i otwarte modele. Wybieraj recenzenta po aktualnych benchmarkach review, nie po ogólnym rankingu, i sprawdzaj je w źródle, bo zmieniają się szybko.
- Review działa też asymetrycznie (badanie z lekcji: Claude recenzujący kod Codex podniósł wynik ze 71,6% do 89,7%, a w drugą stronę wynik spadł z 91,4% do 82,8%), więc nie zakładaj, że każda para modeli działa tak samo. Liczby z badań w tej sekcji pochodzą z materiałów lekcji i nie były sprawdzane w oryginałach.
- Puszczaj review kodu przed testami manualnymi. Agent usuwa wtedy proste błędy, a Ty nie tracisz czasu na przeklikiwanie glitchy i przekazywanie ich agentowi.

### Testy manualne po fazie
- Po każdej fazie sprawdź aplikację, nawet jeśli statyczne checki są zielone. W lekcji błąd w adapterze i przekierowaniu siedział w ostatnim commicie fazy i wyszedł dopiero przy logowaniu. Kolejne fazy nie powinny budować się na błędnym kodzie.
- Poproś agenta o przewodnik do testów manualnych dla wskazanych faz: komendy startowe, konta testowe z rolami i hasłami, lista rzeczy do przeklikania. Nie musisz wtedy zgadywać, co powinno działać.
- Konta testowe pokrywają przypadki skrajne: rolę z hasłem, rolę bez hasła (logowanie hasłem ma być odrzucone), konto z rolami łączonymi i konto, które nie działa żadną metodą. Sprawdzaj też negatywy: wejście na panel innej roli ma być odbite przekierowaniem, a limit prób logowania ma zwracać `retry-after`.
- Dane testowe (seed) wypełniają bazę po migracjach kontami i rolami, żeby od razu było na czym klikać. Mock adaptera zewnętrznej usługi i flagi testowe są tylko lokalne, nigdy na prawdziwym wdrożeniu.
- W środowisku deweloperskim link z maila ląduje w logach: poproś agenta o polecenie, które go stamtąd wyciąga, i sprawdź cały przepływ rejestracji (link potwierdzający, przekierowanie, ponowne użycie linku).
- Nazwy zmiennych i komend zależą od repozytorium. Czytaj rozpiskę, którą zostawił agent, i `.env.example`. Klucze (np. sekret sesji wygenerowany przez `openssl rand -base64 32`) nie są commitowane ani pokazywane.
- Zapisz, czego nie przetestowałeś: testy integracyjne (np. gdy środowisko nie ma Dockera) i prawdziwa integracja z usługą zewnętrzną zostają na koniec wszystkich faz. Mocki nie dowodzą, że integracja działa.

### Integracja z zewnętrznym logowaniem (przykład: GitHub OAuth)
- Najpierw mock adapter, potem prawdziwa integracja po zaimplementowaniu faz. Zakładasz aplikację OAuth (w GitHubie: Settings, Developer Settings, OAuth Apps), z nazwą zawierającą środowisko (osobna aplikacja na lokalne, testowe i produkcyjne środowisko).
- Pola lokalnie: homepage URL i callback URL wskazują na adres aplikacji (callback to miejsce, do którego wraca żądanie po autoryzacji), webhook wyłączony, uprawnienia minimalne (adres e-mail tylko do odczytu).
- Client ID i client secret idą do `.env` (nie do kodu i nie do commita). Po zmianie zakresu użytkownicy muszą potwierdzić zgodę od nowa, co pozwala zobaczyć cały przepływ jeszcze raz.

## 19. Bezpieczeństwo warsztatu AI (narzędzia, nie produkt)
- Zanim agenty zaczną pracować autonomicznie (wykonują coraz więcej komend bez Twojego nadzoru), sprawdź warsztat: repozytorium, skille, serwery MCP, sekrety na dysku i to, dokąd agent może te dane wysłać. Bezpieczeństwo samego produktu to osobny temat (lekcja 16).
- Sześć miejsc do poprawienia: repozytorium wykonujące kod, skille, prompt injection, sekrety w sesjach, sandbox, twarde guardraile.
- Liczby z badań i incydentów w tej sekcji pochodzą z materiałów lekcji i nie były sprawdzane w oryginałach. Wersje narzędzi i poprawki (CVE) zmieniają się szybko, więc sprawdź aktualny stan u siebie.

### Rama: lethal trifecta
- Pojęcie Simona Willisona (autora zwrotu "prompt injection"). Trzy elementy, z których każdy osobno jest zwykłą funkcją narzędzia: dostęp do danych prywatnych (np. `.env` z sekretami), kontakt z niezaufaną treścią (ticket, wynik wyszukiwania, dokument, którego nie przeczytałeś) i możliwość komunikacji na zewnątrz (`curl`, `git push`, CLI GitHuba tworzące PR i issues).
- Niebezpieczne jest dopiero spotkanie wszystkich trzech w jednym przebiegu agenta: instrukcja ukryta w niezaufanej treści może wystawić dane prywatne na zewnątrz.
- Przy każdym przebiegu agenta pytaj, której nogi brakuje. Każda z obron poniżej odcina jedną z nóg. W każdym przebiegu jednej powinno brakować.

### Repozytorium, które wykonuje kod
- Sklonowane repozytorium może wykonać kod na Twoim komputerze przez pliki konfiguracyjne agenta (remote code execution w wersji agentowej): hook `SessionStart` w `.claude/settings.json` uruchamia komendę przy starcie sesji, a serwer MCP w `.mcp.json` razem z flagą `enableAllProjectMcpServers` uruchamia `npx` (czyli dowolną paczkę z internetu) bez pytania. Nic nie widać, dopóki nie sprawdzisz skutków.
- Te konkretne dziury (opisane m.in. przez Check Point Research, poprawki w wersjach 1.0.87 i 1.0.111) są załatane, ale cała kategoria zostaje otwarta: coś w plikach konfiguracyjnych repozytorium, co wywołuje akcję po uruchomieniu agenta. Okno zaufania do katalogu, na które odpowiadasz "tak", wciąż pozwala plikom z repozytorium konfigurować agenta.
- Zanim uruchomisz agenta w cudzym repozytorium, wylistuj jego pliki konfiguracyjne i przeczytaj je. Alias `agent-audit` przeszukuje `.mcp.json`, `CLAUDE.md`, `AGENTS.md`, `.cursorrules`, katalogi `.claude/`, `.agents/`, `.codex/` i `.github/workflows/` (z pominięciem `node_modules` i `.git`). Drugi alias (`agent-audit-hot`) szuka najgroźniejszych miejsc: `"hooks"`, `enableAllProjectMcpServers`, `"allow"`, `mcpServers`, `npx`, `curl`, `wget`. Hooki, `enableAllProjectMcpServers`, listy `allow` i nieznane serwery MCP to sygnał, żeby się zatrzymać.
- Główna zasada: repozytoria z niezaufanego źródła uruchamiaj w środowisku odseparowanym, w którym agent nie ma Twoich danych (w świeżo sklonowanym repo nie ma jeszcze Twoich sekretów, więc odcinasz nogę "dane prywatne"). Najprostsza wersja to kontener z zamontowanym tylko katalogiem repozytorium (`docker run --rm -it -v "$PWD":/work -w /work node:22 bash`, w środku instalacja agenta i logowanie). Drugą opcją jest sandbox w chmurze.

### Skille jako zależności
- Skille to nowy rodzaj zewnętrznych zależności bez menedżera paczek, który by chronił. Skan Snyka (prawie 4 tys. skilli z ClawHub i skills.sh): ponad jedna trzecia ma co najmniej jedną wadę bezpieczeństwa, ponad 13% problem krytyczny. Były też skoordynowane kampanie złośliwych skilli.
- Dwa mechanizmy ataku: dynamiczny kontekst (komenda poprzedzona wykrzyknikiem w treści skilla wykonuje się przed modelem) i prompt injection w samej treści skilla (zwykłe zdanie z instrukcją).
- Zachowanie zależy od agenta. W demo Claude Code nie wykonał komendy z dynamicznego kontekstu, a Codex (nieaktualizowany) wykonał ją bez wahania. Repozytorium, które wydaje się bezpieczne w jednym narzędziu, może zaszkodzić komuś z zespołu, kto używa innego. Zwykły prompt injection w treści skilla oba agenty zgłosiły albo zignorowały.
- Skan grepem po katalogach skilli (`~/.claude/skills/`, `.claude/skills/`, `~/.agents/skills/`, `.agents/skills/`) szuka wykrzykników i wywołań `curl`, `wget`, `base64`, odwołań do `~/.ssh`, `~/.aws`, `.env`. Łapie dynamiczny kontekst, ale nie łapie ataku zapisanego zwykłym zdaniem, więc nie zastępuje czytania skilla. Drugie narzędzie: Snyk Agent Scan (wymaga tokenu, który trzymasz w zmiennej środowiskowej, nie w plikach repozytorium).
- Najważniejsza obrona to zarządzanie skillami w repozytorium (najlepiej wewnętrznym), w którym dodanie i zmiana skilla wymaga pull requestu z review. Korzystaj tylko ze skilli przejrzanych przez kogoś. Przeczytaj każdy skill, którego nie napisałeś sam.
- Nie instaluj skilli testowych globalnie. Uruchamiaj agenta w katalogu laboratorium, wtedy skille działają tylko tam.

### Prompt injection
- Direct prompt injection wysyła użytkownik. Interesuje nas indirect: agent w trakcie pracy sięga do strony, dokumentu albo outputu narzędzia i trafia na złośliwą instrukcję (np. nakłaniającą do odłożenia credentiali do innego pliku albo dopisania kodu na potrzeby późniejszego ataku).
- Modele są dużo lepsze niż kiedyś (według system card: skuteczność ataków best-of-N w przeglądarce spadła z 49,36% dla Sonnet 4.5 do 1,29% dla Sonnet 4.6) i trenowane na warstwach instrukcji (systemowe, użytkownika, materiał zebrany w trakcie pracy). Mimo to w zawodach z marca 2026 (272 tys. ataków na 13 modeli) każdy model okazał się podatny, z wahaniem skuteczności od 0,5% do 8,5%. Statystycznie atak w końcu przejdzie.
- Atak musi przejść trzy kroki: model ulega instrukcji, harness wykonuje akcję, powstaje szkodliwy artefakt (złośliwy skrypt, podatność w kodzie, credentiale odłożone na później). Tryb auto w Claude Code ma dodatkowy klasyfikator, który nie czyta outputu narzędzi (nie zanieczyszcza się wstrzykniętą treścią), ale przepuszcza część nadgorliwych akcji (około 17% w zestawie testowym producenta). Wciąż jest lepszy niż człowiek akceptujący wszystko o północy.
- Przeglądy obron pokazują, że przy atakach adaptacyjnych skuteczność przebicia najlepszych obron potrafi przekraczać 85%, edytory z auto-approve wykonywały złośliwe komendy w do 84% przypadków, a obrona warstwowa obniżyła skuteczność z 73,2% do 8,7% (ataki statyczne). Wniosek: odporność modelu to redukcja ryzyka, nie granica bezpieczeństwa. Granica musi być poza modelem.
- Dodaj do harnessu własne zabezpieczenia: reguły `deny`, hooki przed i po użyciu narzędzia, narzędzia bez uprawnień do wykonania i sandbox. Wtedy agent nie wykradnie danych spoza sandboxa, chyba że zostawisz tam niezabezpieczone sekrety.
- Testuj to własnym zdaniem-pułapką w dokumentacji albo zgłoszeniu, które agent czyta. Test w nowej sesji z niewinną prośbą ("przeczytaj i podsumuj"), porównuj tryby (auto i ręczny), modele (także najsłabszy) i narzędzia. Opisz, co się stało.

### Sekrety w sesjach agenta
- Claude Code trzyma sesje w `~/.claude/projects/` jako zwykły tekst, domyślnie przez 30 dni, a leżą tam zwykle także Twoje sekrety. Pliki czytają złośliwe biblioteki (np. z npm), które wysyłają dane dalej. W sesjach autora: 51 connection stringów do Postgresa, 10 tokenów i 4 prywatne klucze SSH, a Gitleaks znalazł 17 wycieków w 32 MB tekstu.
- Agent czyta `.env` mimo wpisu w `.gitignore`. Zawartość trafia do sesji i do modelu, nawet jeśli niczego nie wypisał na ekran.
- Przeskanuj sesje (grep z wyrażeniami na connection stringi, `sk-ant-`, `ghp_`, `github_pat_`, `AKIA...`, JWT, `BEGIN PRIVATE KEY`, albo Gitleaks z `--redact`, żeby nie wypisywał wartości). To, co znajdziesz, to lista do rotacji dzisiaj, nie kiedyś. Skrypt nie wypisuje wartości sekretów, tylko liczy trafienia.
- Trzy poziomy obrony, uzupełniające się:
  - **Poziom 1, konfiguracja agenta:** reguły `permissions.deny` na odczyt (`Read(./.env)`, `Read(./.env.*)`, `Read(./**/*.pem)`, `Read(~/.ssh/**)`, `Read(~/.aws/**)`). Odczyt odrzuca harness, więc dane nie trafiają do modelu. Blokada obejmuje też `.env.example`.
  - **Poziom 2, sekrety z menedżera zamiast `.env`:** w repozytorium leży `.env.template` bez wartości, z samymi odnośnikami do sejfu (`op://Sejf/Pozycja/pole`), który można commitować. Aplikację uruchamiasz przez `op run --env-file=.env.template -- npm run dev`, a zmienne trafiają do procesu, nie na dysk. To samo robią Doppler, Infisical, HashiCorp Vault i AWS Secrets Manager.
  - **Poziom 3, minimalne uprawnienia:** klucze z najmniejszymi wymaganymi uprawnieniami i krótkim czasem ważności (np. GitHub fine-grained PAT, a dla OAuth tylko odczyt maila).
- Publiczne konfiguracje MCP na GitHubie zawierały tysiące sekretów (według GitGuardian ponad 24 tys., z czego ponad 2 tys. wciąż działało), więc nie wklejaj kluczy do konfiguracji.

### Sandbox i ruch wychodzący
- Najlepszą izolację dają sandboxy w chmurze albo odcięta maszyna wirtualna. Claude Code i Codex mają też wbudowany sandbox oparty na mechanizmach systemu (macOS: Seatbelt, Linux i WSL2: `bubblewrap` i `socat`), włączany komendą `/sandbox` i konfiguracją w `settings.json`.
- Szkielet konfiguracji: `permissions.deny` (odczyt `.env`, `~/.ssh`, `~/.aws`) oraz `sandbox`: `enabled: true`, `allowUnsandboxedCommands: false`, `filesystem.denyRead` (`~/.ssh`, `~/.aws`, `~/.config/gh`, `~/.kube`, `~/.npmrc`, `~/.pypirc`, `~/**/.env`), `network.allowedDomains` (np. `github.com`, `api.github.com`, `registry.npmjs.org`) i `network.deniedDomains` (adresy metadanych chmury: `169.254.169.254`, `metadata.google.internal`).
- Potrzebujesz obu konfiguracji. `permissions.deny` ogranicza natywne narzędzia (Read, Write), a `sandbox.filesystem.denyRead` komendy basha. Sam sandbox nie powstrzyma narzędzia Read przed odczytem sekretów.
- Sandbox odcina nogę "dane prywatne", a z ograniczeniem sieci także "komunikację na zewnątrz". Obejmuje komendy basha i ich procesy potomne (także skrypty postinstall), ale nie narzędzia wbudowane (Read, Edit, Write), serwery MCP ani hooki, które działają poza nim.
- Sandbox też miewa dziury (np. pusta lista `allowedDomains` oznaczała brak ograniczeń sieci, a w 2026 opisano obejście allowlisty przez różnicę w parsowaniu nazwy hosta). Allowlista nie jest polityką, dopóki jej nie przetestujesz (komendy spoza allowlisty `curl`, `git clone` z innego hosta, odczyt `~/.ssh/config`, a przepuszczone ma być to, co dozwolone). Ruch wychodzący kontroluj też poza agentem (firewall, proxy firmowe, sieć kontenera) i unikaj szerokich wildcardów.
- Inne narzędzia też mają tryby sandboxa (Codex: `read-only`, `workspace-write`; Copilot: firewall agenta w chmurze). Zajrzyj do ich dokumentacji.

### Twarde guardraile (hooki)
- Hook `PreToolUse` uruchamia skrypt tuż przed użyciem narzędzia i dostaje na stdin JSON z opisem (m.in. `tool_name` i `tool_input.command`). Skrypt (np. z `jq`) wyciąga komendę i sprawdza ją deterministycznie, w odróżnieniu od modelu, którego można przekonać.
- Kody wyjścia: 2 blokuje wywołanie (komunikat ze stderr trafia do modelu), 0 przepuszcza, każdy inny kod (także 1) to błąd hooka: komenda przechodzi, a komunikat widzisz tylko Ty w transkrypcie. (Prowadzący sprostował, że na nagraniu mówił o kodzie 1 inaczej.)
- Przykładowe reguły: pobieranie skryptu prosto do powłoki (`curl ... | sh`), rekursywne usuwanie (`rm -r`), dostęp do `~/.ssh` i `~/.aws`, odczyt `.env` (z wyjątkiem `.env.example` i `.env.template`, które nie zawierają sekretów). W komunikacie napisz modelowi, żeby nie obchodził blokady.
- Hook blokuje narzędzie, a nie intencję agenta. W demo agent po odrzuconym `rm` znalazł inny sposób i katalog fizycznie zniknął. Hook musi być kompletny (testuj obejścia: odczyt `.env` przez `python`, `awk`, `find -exec`) i zapisz każde udane obejście jako miejsce niekompletne.
- Skrypt hooka musi mieć `chmod +x`. Bez tego w sesji pojawia się `Permission denied` jako błąd niebokujący, hook się nie uruchamia i komenda przechodzi, co łatwo wziąć za zadziałanie blokady. Testuj hooka bez agenta (przekaż JSON na stdin i sprawdź kod wyjścia 2 dla komendy zablokowanej i 0 dla przepuszczonej). Ścieżkę podawaj przez `$CLAUDE_PROJECT_DIR`.
- Gotowe zestawy (np. claude-guardrails, CloneGuard) przeczytaj przed wdrożeniem, bo hook to też kod, który się wykonuje.

### Wdrożenie w projekcie
- Efekt: jedna zmerdżowana zmiana z regułami `deny`, konfiguracją sandboxa i jednym hookiem blokującym. Pliki konfiguracyjne agenta (`.claude/`, `.mcp.json`) objęte `CODEOWNERS` (i włączona w ochronie gałęzi opcja wymagania review od właścicieli kodu, bez tego `CODEOWNERS` niczego nie wymusza). Sekrety przynajmniej jednego projektu z menedżera, nie z `.env`.
- Spisz listę uprawnień, skilli i serwerów MCP, które masz włączone, wynik skanu sesji (bez wklejania sekretów), wynik własnego testu prompt injection i jedno zdanie o tym, którą nogę trifekty usunąłeś w której ścieżce (np. w `security-notes.md`). Warsztat ma dać się przejrzeć w minutę.
- Audyt zrób nie tylko w swoim projekcie, ale i w ostatnio sklonowanych cudzych repozytoriach.

## 20. Context engineering: AGENTS.md jako router, pomiar kontekstu
- Mamy już `AGENTS.md`, skille i specyfikacje. To jest system sterowania kontekstem, tylko trzeba go zmierzyć i odchudzić. Kolejność pracy: zmierz stan wejściowy, uporządkuj `AGENTS.md`, przebuduj go w router, dopnij checki do CI, porównaj pomiar przed i po.
- Liczby z badań i narzędzi w tej sekcji pochodzą z materiałów lekcji i nie były sprawdzane w oryginałach. Limity narzędzi (progi plików, wersje) zmieniają się szybko, więc sprawdź aktualny stan u siebie.

### Czym jest context engineering
- Prompt engineering jest wypierany przez context engineering: najtrudniejsze nie jest ułożenie prompta, tylko zarządzanie informacją, która trafia do ograniczonej uwagi modelu w długiej pracy agenta.
- Definicja: zaprojektowanie tego, co trafia do okna kontekstowego, tak żeby były tam informacje potrzebne na teraz. Wg Anthropica: najmniejszy możliwy zestaw tokenów o wysokim sygnale, który maksymalizuje szansę na oczekiwany wynik.
- Sygnał to informacja, która zmienia to, co agent zrobi przy bieżącym zadaniu (komenda testów, ścieżka do modułu, wzorcowy przykład). Reszta to szum, nawet prawdziwy i ładnie napisany. Szum zajmuje uwagę i rozmywa to, co ważne.
- Okno kontekstowe to nie to samo co uwaga modelu. Okno rzędu miliona tokenów to zapas na wypadek, gdy zadanie tego wymaga, a nie zaproszenie do wypełnienia go. W lekcji jakość kodu zaczynała powoli spadać po mniej więcej 300 tys. tokenów, a praktyczna granica użyteczności leży znacznie niżej.
- Dwa powody: jakość (agent trzyma się Twoich wzorców, a nie wymyśla własnych, bo wie, gdzie jest wzorzec walidacji) i koszt (to samo zadanie na tym samym poziomie jakości za mniej tokenów).
- Badanie 124 PR-ów z 10 repozytoriów (sparowane: ten sam stan repo z historycznym `AGENTS.md` i bez niego): z `AGENTS.md` mediana czasu pracy agenta niższa o około 29%, mediana tokenów wyjściowych o około 17%. Zastrzeżenia: chodzi o tokeny wyjściowe (wejściowych nie ubyło), badanie nie mierzy poprawności, to korelacja, małe PR-y i jeden agent. Nie ekstrapoluj na swój projekt, zmierz go.

### Context rot
- Im więcej tokenów w oknie, tym gorzej model przywołuje to, co w nim jest. Badanie Chroma (18 modeli z czterech rodzin): jakość spada stopniowo od samego początku, a nie skokowo po przekroczeniu limitu, także na zadaniach celowo trywialnych. Modele różnią się tempem, zjawisko jest u wszystkich.
- Kontekst to zasób skończony o malejącej użyteczności. To łamie intuicję "dam mu wszystko, sam wybierze": więcej informacji obniża szansę, że model wybierze akurat potrzebne.
- Wniosek: na starcie sesji trzymaj tylko to, co potrzebne prawie zawsze. Reszta ma być osiągalna, nie obecna.

### Cztery miejsca, w których powstaje kontekst
- **Start sesji.** System prompt, definicje narzędzi (każdy serwer MCP), nazwy i opisy skilli, `AGENTS.md`/`CLAUDE.md` z korzenia. Płacisz za to w każdej sesji i każdej turze, niezależnie od zadania.
- **Kontekst dostarczany w trakcie** przez skille i narzędzia (wyszukiwanie w sieci, logi aplikacji). Płacisz tylko wtedy, gdy agent po to sięgnie, więc pilnuj, żeby brał tylko to, czego potrzebuje.
- **Wyszukiwanie w kodzie** (szczególny podzbiór poprzedniego). Przy generowaniu kodu najważniejsze: projektujesz repozytorium tak, żeby agent szybko trafiał w potrzebne pliki i nie czytał połowy projektu.
- **Agent główny plus subagenci.** Subagent dostaje nowe okno kontekstowe. Decydujesz, w którym miejscu go uruchamiać.
- Na każdym etapie działają inne narzędzia, więc poprawiasz je po kolei, po zmierzeniu stanu AS / IS.

### Pomiar stanu wejściowego (AS / IS)
- Zanim cokolwiek poprawisz, zmierz i zapisz liczby. Bez pomiaru "lepiej" jest tylko wrażeniem.
- Przegląd własnymi oczami: czytaj `AGENTS.md` od góry do dołu i przy każdej sekcji pytaj, czy agent potrzebuje jej za każdym razem. W przykładzie z lekcji zostają: opis repo, skrypty (dają agentowi pętlę zwrotną), konfiguracja i konwencje, wymagania testowe. Pod znakiem zapytania: koncepcje domenowe, REST API, warstwa UI (ładować tylko przy pracy nad API lub UI), reguły specyfikacji (kandydat do wyniesienia). Sekcja "lessons learned" rośnie przez całe życie projektu, więc jej rozmiar mierz w CI.
- `/context` w świeżej sesji (nic w niej nie robiąc) pokazuje, co agent bierze na starcie. W lekcji: 38 tys. tokenów (około 10% okna), z czego system prompt i narzędzia systemowe (około 13 tys.) to nie Twoja sprawa, a pliki pamięci (około 10 tys.) i opisy skilli (około 10 tys.) to Twoja robota. `/context all` rozwija listę plików.
- Skill `eliminate-no-op` szuka w instrukcjach zdań, które nie zmieniają zachowania agenta. W lekcji odzyskał 7% tokenów, ale ważniejsze były dwa znaleziska: reguła rozjechana z kodem ("zawsze haszuj bcrypt/argon2", a w kodzie `scrypt`) i odwołanie do skilla, którego w projekcie nie ma. Instrukcje się starzeją, a nikt tego nie widzi. Skill sprawdza to skryptowo, ale i tak przejrzyj plik sam.
- Estymaty tokenów różnią się między narzędziami (każdy model tokenizuje inaczej, modele Anthropica liczą więcej niż OpenAI o kilkanaście procent). Traktuj je jako rząd wielkości i porównuj zawsze w obrębie jednego narzędzia.
- Context Scope (open source, indeksuje historię sesji na Twoim komputerze) pokazuje budżet startu, rozbicie na argumenty i wyniki narzędzi, wykres narastania kontekstu w czasie, rekomendacje i listę ścieżek z instrukcji, które nie istnieją. Bez niego dużo zrobisz samym `/context`.
- Czerwona flaga: duży pik kontekstu zaraz na początku sesji. Znaczy, że agent przepala kontekst na zbieranie informacji z różnych miejsc repo, bo nie wie, gdzie czego szukać. Gładka linia oznacza, że kontekst narasta z pracą. Wykres ze schodkami to kompaktowanie, które pomaga, ale samo kosztuje tokeny.
- Wynik z lekcji (Context Scope, ta sama miara przed i po): start sesji Claude Code 20,9 tys. → 12,3 tys. tokenów, pliki instrukcji 12,9 tys. → 4,3 tys., opisy skilli bez zmian (8,0 tys.), główny `AGENTS.md` 12 382 → 3 905 tokenów. Zapisz własną tabelę w tym układzie.
- Przed budową routera sprawdź ścieżki z `AGENTS.md`: wskazania na nieistniejące pliki to błąd (część to przeczenia, przykłady zapisu albo świadomie zostawione na przyszłość, resztę napraw).

### Skille od strony kosztu
- Trzy poziomy (progressive disclosure), każdy wchodzi do okna w innym momencie: nazwa i opis (około 100-150 tokenów na skill, ładowane zawsze), treść `SKILL.md` (po decyzji agenta o użyciu, rekomendacja około 5 tys. tokenów, poniżej 500 linii, nie twarda reguła), pliki referencyjne i szablony (ładowane dynamicznie, najrzadziej). Kod skryptów nie wchodzi do kontekstu, tylko wynik ich wywołania, więc skrypty mogą być długie.
- Dwadzieścia skilli daje na wejściu dwadzieścia zdań, a nie dwadzieścia dokumentów.
- Opis odpowiada na pytanie kiedy, treść na pytanie jak. Częsty błąd: opis streszcza, co skill robi, zamiast mówić, kiedy po niego sięgnąć (muszą być sygnały rozpoznania właściwego momentu). Twardy limit opisu to 1024 znaki. Przy dużej liczbie skilli dłuższe opisy są nieuniknione, bo trzeba rozróżnić, który skill kiedy.
- Wyrzuć stare, skeszowane wersje skilli ze starszych lokalizacji (bardziej rozwlekłe, z większą liczbą znaków) i używaj tylko aktualnych. Wyłącz skille i serwery MCP, których w projekcie nie używasz.
- Własne skille przepuść przez `eliminate-no-op`.

### Struktura repo, nazwy i przykłady jako kontekst
- Najtańszy kontekst to ten, którego agent nie musi czytać, bo wynika ze struktury repo i nazw. Hierarchia katalogów, konwencje nazw i daty dają sygnały, gdzie szukać (dlatego dobrze działa Next.js: ten sam układ plików niezależnie od funkcjonalności).
- Jedna konwencja na całe repo, nawet nieidealna. Konsekwencja wygrywa, bo da się ją zapisać w `AGENTS.md`. Trzymaj się standardu rynkowego.
- Kolokacja: jedna funkcjonalność, jeden katalog z kodem, testami, API i stronami. Mniej wyszukań, mniej tokenów.
- Nazwa mówi o roli, nie o technologii (LLM-y działają semantycznie): `reservation-validation` wygrywa z `utils/helpers`.
- Daty w nazwach decyzji, notatek i specyfikacji tam, gdzie liczy się aktualność: przy dwóch sprzecznych plikach agent wnioskuje, który jest nowszy.
- Jeden przykład jest wart więcej niż milion tokenów: wskaż w `AGENTS.md` jedną linijką ścieżkę do dobrze napisanego serwisu jako wzorca ("nowy serwis rób jak `user service`"). Umiar: trzy przykłady na trzy scenariusze działają, dwadzieścia przepełnia kontekst. Aktualność: nieaktualny przykład jest gorszy niż brak, bo agent mocno za nim podąża (w Open Mercato agent tworzył pliki w starym stylu przez stary przykład, więc wskazywane pliki pilnuje CI).

### AGENTS.md jako router
- `AGENTS.md` to najdroższy plik w repo (płacisz w każdej sesji i turze), więc to nie dokumentacja projektu, tylko budżet. Test każdej linijki: czy bez niej agent zrobiłby to zadanie inaczej. Jeśli nie, linijka wylatuje, choćby była prawdziwa.
- Przechodzi test: komendy (uruchomienie, testy, lint, typecheck, migracje), konwencje niewyprowadzalne z kodu (zwłaszcza gdy trwa migracja i w repo są dwa wzorce, z których obowiązuje jeden), granice (czego nie ruszać, co jest generowane), routing (gdzie czego szukać; najważniejsza sekcja i zwykle najkrótsza).
- Nie przechodzi: opis architektury, który agent przeczyta z kodu (jeśli kod nieczytelny, napraw kod), duplikaty tego, co jest w skillach (rozjeżdżają się po pierwszej zmianie), motywacja i ogólniki ("pisz czysty kod"), historia i uzasadnienia decyzji (to materiał na ADR, do którego się routuje).
- Hierarchia plików: krótki plik w korzeniu i pliki szczegółowe przy modułach, blisko kodu. Standard `AGENTS.md` przewiduje, że plik zagnieżdżony ma pierwszeństwo przed głównym. Plik przy module wchodzi do okna tylko przy pracy w tym module i rzadziej się rozjeżdża z kodem. Każdy pakiet dostaje własny `AGENTS.md` z instrukcjami tylko o nim.
- Sprawdzian: przy każdym akapicie głównego pliku pytaj "dla ilu procent zadań to jest potrzebne?". Wszystko poniżej mniej więcej połowy to kandydat do przeniesienia.
- Limity narzędzi: Claude Code ostrzega przy `CLAUDE.md` powyżej 40 tys. znaków, a Codex ma twardy limit 32 KB i ucina resztę pliku. Plik rośnie linijka po linijce i nikt nie zauważa przekroczenia (w Open Mercato przekroczył tysiąc linii).
- Task Driven Context Routing: mała tabela w głównym `AGENTS.md` mówi, jakie pliki zaciągnąć na podstawie typu zadania. Dla każdego typu odpowiedz na dwa pytania: czego naprawdę potrzebuje i czego nie potrzebuje. Przykład:

| Typ zadania | Czego naprawdę potrzebuje | Czego nie potrzebuje |
|---|---|---|
| Naprawa błędu | reprodukcja, ścieżka do modułu, test, który ma być czerwony | całej specyfikacji produktu |
| Nowa funkcjonalność | specyfikacja, kryteria akceptacji, wzorcowy przykład, granice modułu | historii wcześniejszych bugów |
| Refactor | wzorzec docelowy, zakres, testy, które mają zostać zielone | kontekstu biznesowego |
| Review | diff, standard odbioru, zasady bezpieczeństwa | instrukcji uruchomienia projektu |

- Trasy prowadzą nie tylko do plików `AGENTS.md`, ale też do specyfikacji, notatek z sesji i konkretnych pakietów.
- Skill `task-router` przeprowadza przez cztery kroki: discovery (co gdzie leży), podział instrukcji na pliki zgodnie ze strukturą projektu, zbudowanie tabeli routingu, małe skrypty pilnujące, żeby się nie rozjechało. Uruchom go na swoim projekcie i przejrzyj wynik, nawet jeśli uznasz routing za niepotrzebny. W lekcji zestaw plików `AGENTS.md` spadł do około 2456 tokenów (ponad połowę mniej). W małym projekcie routing nie był jeszcze konieczny, ale wiesz, jak go zbudować, gdy projekt urośnie.

### Subagenci: jakość, nie oszczędność
- Subagenci nie zmniejszają ilości czytanego kontekstu, przenoszą go w inne miejsce, a łącznie może go być więcej. Służą jakości: chronią uwagę agenta głównego. Koszt rośnie (w badaniu Anthropica układ z subagentami wypadł o 90,2% lepiej, ale kosztował około 15 razy więcej tokenów niż zwykła rozmowa).
- Sięgaj po nich przy orkiestracji dłuższej implementacji, głębszym researchu i sekwencji research, plan, implementacja. Zadania z dużą zależnością i wspólnym kontekstem do takiego podziału się nie nadają, a większość zadań programistycznych ma mniej zrównoleglalnych fragmentów niż research. Zrównoleglenie to kryterium wyboru zadania, nie mechanizm.
- Subagent dostaje tylko brief i startuje z pustym oknem, więc eksploruje więcej niż agent główny. Do głównego wraca krótki wynik (np. pięć zdań), cały zebrany po drodze kontekst zostaje u subagenta.
- Optymalizacja: tańszy model jako subagent do researchu (agent główny mocniejszy, subagent słabszy, bo research w plikach nie wymaga wielkiego rozumowania).
- Sterowanie tym, kiedy subagenci są używani: model (nowsze radzą sobie nieźle przy researchu, gorzej przy stricte kodowaniu), prompt (rozpisz zadania i napisz wprost, przy którym użyć subagenta) i skill (najlepsze i najbardziej powtarzalne: procedura zapisana w skillu). Sprawdź, czy masz zaopiekowane dwa ostatnie miejsca (sekcja 18).

### Checki kontekstu w CI
- Pliki `AGENTS.md` w czasie życia projektu rosną. Dodaj do CI skrypt (w technologii projektu, np. `npm run check:agents`) z dwoma głównymi kontrolami: długość plików `AGENTS.md` (próg ostrzeżenia i próg twardego zatrzymania CI, ustawiasz sam, także dla plików `lessons`) i istnienie ścieżek, do których kieruje router.
- Check może też pilnować, żeby `CLAUDE.md` zawierał wyłącznie import `AGENTS.md`. W lekcji Claude Code zaczął czytać `AGENTS.md` natywnie, więc w nowszych wersjach `CLAUDE.md` można stopniowo porzucać (sprawdź, czy tak jest w wersji, której używasz).
- Zasada sprawdzana automatycznie nie musi być zapisana w instrukcji. Każda taka zasada to linijka do usunięcia z `AGENTS.md`.
- Przykłady wzorcowe też pilnuj w CI, żeby wskazywane pliki były aktualne.
- Dopięcie do pipeline'u to jeden krótki prompt do agenta (dodanie kroku pod `jobs.lint` w workflow), a potem uruchom check lokalnie i sprawdź wynik.

### Bardzo duży projekt (zaawansowane)
- Gdy część aplikacji siedzi w zależnościach (`node_modules`, biblioteki z innego repo), routing po plikach repo nie wystarcza, a agent musiałby grepować zależności i spalałby tokeny. Rozwiązanie z Open Mercato w trzech warstwach:
  - **Korpus generowany przy budowie aplikacji:** `AGENTS.md` w całości automatycznie (reguły i tabele ułożone w trzy osie), guides (jak poruszać się po aplikacji), skille (w tym skill-resolver `om-framework-context`) i fakty o modułach w strukturze drzewiastej z indeksem, generowane z kodu modułów. Budżety: root poniżej 12 KB, cały łańcuch dla zadania najlepiej w 32 KB. Katalog `.ai/` na wszystko dotyczące AI w projekcie, `.agents/` zostaje konfiguracją agentów.
  - **Trzy osie, które się sumują:** obszar i odpowiedzialność, jednostka pracy, SDLC (piszemy specyfikację, implementujemy, czy rzecz jest prosta i nie ładujemy nic dodatkowego). Wynik to minimalny podzbiór kontekstu. Escape hatch: reguła pozwalająca doczytać brakujące elementy w przypadkach szczególnych.
  - **Weryfikacja:** harness porównuje, co agent zadeklarował jako potrzebne, z tym, co faktycznie przeczytał (niezgodność znaczy, że kontekst wymaga poprawy). W lekcji 236 zadań w sandboksie, ocena analizą statyczną i LLM jako sędzią, pętla zwrotna do korpusu i osi.
- Do zabrania nawet bez własnego harnessu: pytanie "czy agent przeczytał dokładnie to, co zadeklarował" jest mocniejsze niż "czy agent odpowiedział dobrze".
- Przy zależnościach we własnych bibliotekach najlepiej, żeby to one generowały dokumenty i poradniki o sobie, wciągane automatycznie do aplikacji.

### Wdrożenie w projekcie
- Efekt: tabela pomiarów przed i po (start sesji z `/context` lub Context Scope, rozmiar `AGENTS.md`, łączny rozmiar opisów skilli, liczba i koszt włączonych serwerów MCP), uporządkowany `AGENTS.md` (każda linijka przeszła test), routing z istniejącymi ścieżkami, check w CI i krótka lista znalezisk z historii sesji z zaznaczeniem tego, co wdrażasz w następnym tygodniu. Sama zmiana bez pomiaru albo samo uruchomienie skilla bez przejrzenia wyniku się nie liczy.
- Jeśli liczby się nie poprawiły, to nie porażka, tylko informacja, że optymalizowałeś nie ten etap, co trzeba.

## 21. Zasady ogólne
- Mały, jasno określony zakres na jedną sesję agenta. Jeden PR, jeden cel.
- Każde ustalenie, które agent ma zapamiętać, trafia do pliku w repo.
- Weryfikuj wynik automatycznie (testy, CI), nie na wiarę i nie na wzrok. Nie deklaruj sukcesu bez zielonych wyników.
- Sprawdzaj niezależnie wybrane twierdzenia agenta na surowych danych. Pewny ton wyniku nie jest dowodem.
- Operacje zmieniające świat zewnętrzny (push, publikacja, tworzenie zgłoszeń, zakupy) tylko po wyraźnej zgodzie człowieka.
- Brak `--no-verify`, brak obchodzenia hooków i CI, brak sekretów w repo.
- Kontekst to zasób skończony: najmniejszy zestaw informacji o wysokim sygnale, a nie wszystko "na wszelki wypadek". Zmierz start sesji przed i po zmianie (sekcja 20).
- Zasada sprawdzana automatycznie (CI, hook) nie musi być w `AGENTS.md`.
- Agent nie ocenia własnej pracy. Sprawdzają ją skrypty (sygnał z zewnątrz) i recenzent w osobnej sesji, modelem z innej rodziny.
- W każdym przebiegu agenta powinno brakować jednej z trzech rzeczy: dostępu do danych prywatnych, kontaktu z niezaufaną treścią albo możliwości komunikacji na zewnątrz (sekcja 19). Odporność modelu na prompt injection to redukcja ryzyka, nie granica bezpieczeństwa: granica jest poza modelem (sandbox, `deny`, hooki).


## Checklista startu nowego projektu (ta część)
1. Stack dobrany pod AI, tryb `strict`.
2. Repo z `AGENTS.md`, `CLAUDE.md` (`@AGENTS.md`), katalogiem `.ai/`.
3. `SDLC.md`, `CODE_REVIEW.md`, `BACKWARD_COMPATIBILITY.md`, standardy inżynierskie, plik konfiguracji pipeline'u.
4. CI: lint, typecheck, build, unit z progiem pokrycia, integracyjne, audyt; szablon PR.
5. CLI zalogowane, worktrees gotowe.
6. Pierwszy commit z całością przed pierwszą funkcją.
7. Skille zainstalowane per projekt i co najmniej jedno rozszerzenie lokalne sprawdzone na naruszeniu testowym.
8. Etykiety i szablony zadań i PR zgodne z SDLC.
9. Inicjalny prompt implementacji z plikiem specyfikacji, podziałem na zadania i fazy, `track.md`, commitem po każdym zadaniu i zatrzymaniem po fazie. Drugi model (z innej rodziny) dostępny do review.
10. Warsztat agenta zabezpieczony przed autonomiczną pracą: reguły `deny` na `.env` i klucze, sandbox z przetestowaną allowlistą domen, co najmniej jeden hook `PreToolUse` sprawdzony na obejściach, `.claude/` i `.mcp.json` w `CODEOWNERS` z wymuszonym review, sekrety z menedżera zamiast `.env`, lista skilli i serwerów MCP spisana, skan sesji zrobiony i wyniki zrotowane.
11. Kontekst zmierzony i uporządkowany: tabela AS / IS (start sesji, `AGENTS.md`, opisy skilli, serwery MCP), główny `AGENTS.md` jako krótki router (każda linijka przeszła test "czy bez niej agent zrobiłby to inaczej"), instrukcje modułów przy kodzie, wskazany wzorcowy przykład, w CI check budżetu długości i istnienia ścieżek, `CLAUDE.md` tylko z importem.

## Checklista przed zleceniem zadania agentowi (ta część)
- Jest zatwierdzona i przeczytana przez człowieka specyfikacja (z user stories) lub kryteria akceptacji.
- Zakres jest mały, a granice jasne (co poza zakresem).
- Wiadomo, jakie komendy walidacji agent musi uruchomić.
- Zadanie ma blokadę ("w toku"), jeśli pracuje wielu agentów.
- Decyzje, na których zadanie się opiera, są aktywne, nie w statusie propozycji.
- Przy implementacji całej specyfikacji: inicjalny prompt z `track.md`, zadania robione subagentami, commit po każdym zadaniu, STOP po fazie, review drugim modelem.
- Dla zadania w dużym projekcie: agent wie z routingu, jakie pliki przeczytać (a jakich nie), ma wskazany wzorcowy przykład, a sesja nie zaczyna się od piku kontekstu.
- Przed autonomiczną pracą agenta: wiem, której nogi trifekty brakuje w tym przebiegu, nieznane repozytorium otwieram w kontenerze, a skille i serwery MCP, z których korzysta, są przejrzane.

## Checklista przeglądu wyniku agenta (ta część)
- Bramka walidacji uruchomiona, wyniki prawdziwe, "nie uruchomiono" opisane.
- Nowa logika ma testy, zmiana bazy ma test integracyjny.
- Warstwy i kierunek zależności zachowane, brak I/O w domenie.
- Kontrakty nienaruszone lub zmiana ma ścieżkę wycofania.
- Brak `console.*`, brak `any` bez uzasadnienia, brak wyłączonych reguł lintu.
- Wnioski wpisane do `lessons.md`, jeśli zmiana naprawia błąd lub rozstrzyga nieoczywistą kwestię.
- Wybrane liczby i twierdzenia z raportu sprawdzone na źródle.
- Po fazie implementacji: statyczne checki zielone (wyniki prawdziwe), review w osobnej sesji innym modelem, blokery i majory poprawione, aplikacja przeklikana wg przewodnika (każda rola, negatywy, limity), `track.md` aktualny, lista tego, czego nie przetestowano (integracyjne, usługi zewnętrzne).
- Dla zmian w `AGENTS.md`, routingu i skillach: każda dodana linijka przeszła test "czy bez niej agent zrobiłby to inaczej", ścieżki istnieją, check budżetu w CI zielony, brak duplikatów reguł ze skillami, pomiar startu sesji przed i po.
- Dla zmian w konfiguracji agenta (`.claude/`, `.mcp.json`, hooki, skille): przeczytane przez człowieka, bo mogą wykonać kod albo zmienić uprawnienia (wymaga review właściciela kodu).

## Antywzorce (ta część)
- Dwie wersje instrukcji dla agentów (osobne `CLAUDE.md` i `AGENTS.md`) rozjeżdżają się.
- Edycja zainstalowanych skilli bezpośrednio: aktualizacja ją zniszczy.
- Obniżanie progu pokrycia lub dopisywanie wykluczeń zamiast testów.
- Wyłączanie reguły lintu, żeby wyciszyć ostrzeżenie.
- Instalacja globalna skilli, która zaśmieca przestrzeń nazw wszystkich projektów.
- Siatka bezpieczeństwa dokładana po tym, jak powstał kod.
- Proszenie agenta, żeby sam sprawdził i poprawił swój kod, bez skryptów typecheck, lint, testy, build: samopoprawa bez sygnału z zewnątrz pogarsza wynik.
- Review kodu w tej samej sesji i tym samym modelem, który go napisał (blind spot), albo modelem z tej samej rodziny, który błędów szuka tak jak autor.
- Implementacja całej specyfikacji w jednej sesji bez subagentów, bez `track.md` i bez commitów po zadaniach: po przerwie nie wiadomo, gdzie jest stan, a kontekst się kończy.
- Kolejna faza zbudowana na niesprawdzonej poprzedniej: błąd z ostatniego commita fazy kopiuje się dalej.
- Testy manualne przed review kodu: tracisz czas na przeklikiwanie błędów, które agent poprawiłby sam.
- Uznanie integracji z usługą zewnętrzną za gotową na podstawie samych mocków albo pominięcie testów integracyjnych bez zapisania, że ich nie było.
- Klucze, sekrety i dane logowania w kodzie, w commicie albo wklejone do rozmowy z agentem. Mocki i flagi testowe włączone poza środowiskiem lokalnym.
- Uruchomienie agenta w cudzym, niezaufanym repozytorium bez przejrzenia plików konfiguracyjnych i poza kontenerem (hooki, serwery MCP, `enableAllProjectMcpServers`).
- Instalacja skilli i serwerów MCP z internetu bez czytania i bez review: to nieoznaczone zależności z mocą wykonania.
- `.env` z prawdziwymi sekretami na dysku, w którym agent może czytać (wpis w `.gitignore` nie chroni przed agentem), i brak skanu `~/.claude/projects/`.
- Poleganie wyłącznie na odporności modelu na prompt injection zamiast granicy poza modelem (sandbox, `deny`, hooki).
- Sandbox i allowlista domen uznane za działające bez testu, albo sandbox bez reguł `deny` na narzędzie Read (obie konfiguracje są potrzebne).
- Hook bez `chmod +x` albo bez testu na obejściach: błąd hooka przepuszcza komendę, a blokada narzędzia nie blokuje intencji agenta.
- Agent z trzema nogami trifekty naraz (dane prywatne, niezaufana treść, wyjście na zewnątrz) w jednym przebiegu bez nadzoru.
- Klucze z szerokimi uprawnieniami i bez terminu ważności dla agentów (zamiast minimalnych i krótkotrwałych).
- `CODEOWNERS` na pliki konfiguracyjne agenta bez włączonego wymogu review od właścicieli kodu: niczego nie wymusza.
- `AGENTS.md` jako dokumentacja projektu: opis architektury, lista modułów, historia i uzasadnienia decyzji ładowane w każdej sesji (to budżet płacony w każdej turze, a ADR ma być osiągalny przez routing).
- Ogólniki w instrukcjach ("pisz czysty kod", "dbaj o jakość") i duplikaty reguł ze skillami: nie zmieniają zachowania, zajmują miejsce i rozjeżdżają się.
- Instrukcje niezgodne z kodem (reguła bezpieczeństwa o jednym algorytmie, a w repo inny) albo odwołania do skilli i plików, których nie ma.
- Jeden plik instrukcji rosnący linijka po linijce bez limitu w CI: przekroczenie progu (Codex ucina plik powyżej 32 KB) zauważasz po fakcie.
- Dosypywanie kontekstu "na wszelki wypadek" i wiara w duże okno: jakość spada stopniowo (context rot), a uwaga jest zasobem skończonym.
- Optymalizacja kontekstu bez pomiaru przed i po albo porównywanie liczb z różnych narzędzi (różne tokenizery).
- Nieaktualny przykład wzorcowy w `AGENTS.md`: agent mocno za nim podąża, więc jest gorszy niż brak przykładu.
- Subagenci jako sposób na oszczędność tokenów: służą jakości i kosztują więcej, a zadania z dużą zależnością między krokami się do nich nie nadają.
- Stare, skeszowane wersje skilli, nieużywane serwery MCP i skille włączone w projekcie, który ich nie potrzebuje.
