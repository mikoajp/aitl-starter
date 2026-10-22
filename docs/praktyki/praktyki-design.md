# Praktyki: design produktu i prototyp z agentami AI

Wygląd produktu i generyczny interfejs z AI, design system, kontrola jakości interfejsu, prototyp. Sekcje 14-17.

Część zbioru praktyk AI Tech Leaders. Indeks i tabela „gdy robisz X, czytaj Y”: `README.md` (ten katalog). Numeracja sekcji jest wspólna dla wszystkich plików (nie przenumerowana), żeby odwołania i notatki się nie gubiły.

---

## 14. Wygląd produktu: generyczny interfejs z AI
- Agent, któremu nie powiesz, jak ma wyglądać produkt, wybierze najbardziej prawdopodobny wygląd, czyli średnią z tego, co widział najczęściej. To nie zły gust, tylko statystyka. Tam, gdzie nikt nie zdecydował, podstawia się wartość domyślna.
- AI slop to treści produkowane szybko, masowo i bez żadnej decyzji po drodze. Nie znaczy "brzydkie", tylko "nieprzemyślane". Pojedynczy element generyczny nie jest błędem, problemem jest wiele takich elementów naraz.
- Typowe znaki generycznego wyglądu:
  - kolor: indygo lub fiolet jako kolor akcji bez uzasadnienia w marce, gradient w nagłówku, w tle albo na przycisku, ciemnogranatowe tło z poświatą,
  - kształt i głębia: duże zaokrąglenia i pigułki na większości elementów, karty z cieniem jako jedyny sposób oddzielenia treści, karta w karcie, półprzezroczyste rozmyte panele,
  - układ: pigułka z nowością nad nagłówkiem, wyróżnione kolorem słowo w nagłówku, para przycisków w stylu "Zacznij za darmo" i "Zobacz demo", rząd wielkich liczb, trzy identyczne karty z ikoną,
  - ozdobniki: logo jako kolorowy kwadrat z literą, awatary z inicjałami na kolorowym tle, emoji zamiast ikon, iskierki jako symbol AI,
  - tekst i dane: obietnice, które nic nie mówią o produkcie, oraz liczby, oceny, opinie i nazwy klientów, których nie ma w danych produktu.
- Eksperyment z lekcji: sześć niezależnych sesji agenta dostało po jednym zdaniu ("zbuduj stronę główną aplikacji do ...") bez żadnych wskazówek o wyglądzie. Na wszystkich sześciu logo było kolorowym kwadratem z ikoną lub literą, pięć miało główny przycisk w indygo lub fiolecie niezależnie od branży, a agent wymyślił dowody zaufania (ocenę 4,9 na 5 z ponad 32 000 opinii dla produktu, który nie istnieje).
- Dlaczego to ważne, choć "działa": zaufanie (produkt wyglądający jak szablon wygląda jak prototyp), spójność (średnia wychodzi za każdym razem trochę inna, więc po miesiącu każdy ekran wygląda jak z innego projektu) i rozpoznawalność (produktu podobnego do wszystkich nikt nie zapamięta).
- Konwencje kopiuj, wyglądu nie (prawo Jakoba: użytkownicy większość czasu spędzają w innych produktach i oczekują, że Twój będzie działał jak te, które znają). Logo w lewym górnym rogu prowadzi na stronę główną, Enter wysyła formularz, Escape zamyka okno. Kolor, typografia, kształt i ton to miejsce na charakter produktu.
- Moodboard z obrazkami nie wystarcza. Agent z obrazkami nadal nie ma decyzji: jakie odstępy, jakie kolory, jakie komponenty i kiedy ich używać. Nie musisz być designerem, wystarczy zapisać decyzję tak, żeby agent jej nie zgadywał.
- Profesjonalny wygląd na pierwszy rzut oka nie dowodzi jakości. Problemy (kontrast, brak etykiet, martwe linki, wyszukiwarka, która nic nie wyszukuje, wymyślone dane, niespójne sumy) wyłapuje dopiero audyt z listą kontrolną, a nie ocena na oko.
- Wykrywacz generycznego wyglądu to prompt, który tylko czyta i oddaje raport (niczego nie zmienia w plikach). Sprawdza:
  - znaki generycznego wyglądu: występuje, nie występuje, nie da się sprawdzić (z plikiem i linią),
  - błędy UX i dostępności przy szerokościach 1440, 768 i 320 px,
  - rozrzut wartości: liczba unikalnych kolorów tekstu, rozmiarów fontu, promieni zaokrąglenia, odstępów spoza siatki 4 px i kolorów wpisanych na sztywno poza plikiem tokenów,
  - na końcu pięć decyzji do podjęcia, z podziałem na token, komponent i zasadę.
  Każde znalezisko ma pewność: sprawdzone albo przypuszczenie. Z dostępem do przeglądarki agent mierzy kontrast na działającej stronie, bez niej raport opiera się na kodzie i wprost mówi, czego nie zmierzył. Uruchamiaj w nowej rozmowie.
- Mity o kolorze: statystyka "62-90% oceny produktu to sam kolor" pochodzi z przeglądu literatury (Singh, 2006), a nie z eksperymentu, a zdanie "niebieski buduje zaufanie" nie jest udowodnione (Elliot, 2015: badania są na wczesnym etapie). Działa za to norma kategorii: jeśli Twoja kategoria jest niebieska, możesz w niej zostać, ale wyróżnij się typografią, akcentem i tonem.
- Inspiracje: z cudzego produktu bierz konkretną zasadę (jak pokazuje cenę, jak prowadzi przez rejestrację), nie piksele. Dobra kradzież to studiowanie zamiast przeglądania, czerpanie od wielu, przetwarzanie i podanie źródła.
- Źródła inspiracji: prawdziwe ekrany działających aplikacji (Mobbin, Refero, Nicelydone, Page Flows; Refero i Mobbin mają serwery MCP, więc agent może z nich korzystać) są cenniejsze niż Dribbble, gdzie są głównie koncepty z idealnymi danymi, bez błędów, pustych list i długich nazw. Na Behance szukaj opisanych wdrożeń.

## 15. Design system dla agentów
- Design system to wspólne zasady, zasoby i sposób pracy, dzięki którym zespół buduje spójne ekrany i nie podejmuje tych samych decyzji od nowa. Dla developera: API interfejsu. Dla agenta: to, z czego składa ekran bez zgadywania.
- Sześć warstw: tokeny (nazwane wartości), komponenty (każdy z propsami i stanami), wzorce (jak złożyć z komponentów formularz, listę z filtrami, widok szczegółów), zasady (kiedy czego używać i kiedy nie), dokumentacja (najczęściej Storybook, czyli przykłady do skopiowania) i utrzymanie (kto decyduje o zmianach i jak dodaje się nowy wariant).

### Nie zaczynaj od zera
- Najpierw sprawdź, co już istnieje. Galerie zbierające publiczne design systemy (The Component Gallery, DesignSystems.one, Design System Hunt) pokazują, jak inni rozwiązali dany komponent, zanim zaprojektujesz własny.
- Biblioteki headless (Radix, React Aria, Base UI, Ark UI) dają samo zachowanie: obsługę klawiatury, fokus i dostępność. Wygląd ustalasz sam. Biblioteki ostylowane (shadcn, MUI, Mantine, Chakra, Ant Design) dają gotowy wygląd.
- Domyślny shadcn to dziś najczęstszy generyczny wygląd. Nie dlatego, że jest zły, tylko że jest dobry, więc wszyscy go używają. Jeśli go używasz, od razu zmień tokeny. Zachowanie i dostępność bierz z biblioteki, wygląd ustal sam.
- Zapisz, którą bazę wybierasz i dlaczego. Ta odpowiedź trafia do promptu budującego design system.

### Referencje zamieniaj w decyzje
- Karta referencji: źródło (link albo zrzut), co mi się podoba, co mi się nie podoba (co z tej referencji NIE bierzemy), dlaczego pasuje do produktu, jak bardzo (musi być, warto, tylko inspiracja). Karta antyreferencji: źródło, dlaczego tego nie chcę, po czym to poznać (np. fioletowy gradient, szklane karty, iskierki).
- Dawaj więcej referencji niż antyreferencji, najlepiej ze zrzutami ekranu. Agent uczy się z tego, co pokazujesz, a nie z tego, czego zabraniasz.
- Dodaj referencję z codzienności użytkowników, czyli z tego, na co patrzą cały dzień (GitHub, Slack, Excel, system w sklepie). Takiej referencji "średnia" nie ma, bo wynika z Twoich ludzi, a nie z galerii designu.
- Agent zamienia karty w obserwacje i decyzje: każda cecha dostaje osobny numer (R01.1, R01.2) i rodzinę (kolor, typografia, kompozycja i gęstość, komponenty, ruch i reakcja, ton wypowiedzi). To, czego nie lubisz, też jest decyzją: zapisz, co robimy zamiast tego.
- Z opisów wynikają 3-5 słów charakteru i tyle samo słów antycharakteru, podpisy antyreferencji (po czym je rozpoznać na ekranie i w kodzie) oraz konflikty między referencjami. Konflikty rozstrzyga człowiek, nie agent. Do antyreferencji zawsze należy "generyczny wygląd AI".
- Referencja bez związku z produktem to gust, nie decyzja. Agent ma wskazać, dlaczego cecha pasuje do użytkowników produktu, a jeśli nie umie, napisać to otwarcie.
- Nie przyjmuj propozycji agenta hurtem. Agent dopisuje własne (np. antyreferencje wyczytane z briefu i wywiadów). Odpowiedź "akceptuję twoje propozycje" przyjmie pięć antyreferencji, których sam nie napisałeś. Każdą propozycję czytaj i przyjmuj albo odrzucaj osobno.
- Wynik zapisz w pliku z numeracją, statusem (propozycja, przyjęte) i wprost opisanymi lukami. Nic w nim nie jest jeszcze regułą: zasady i tokeny powstają w następnym kroku i zatwierdzasz je osobno.

### Tokeny w trzech warstwach
- Surowe wartości (paleta, skala) używane tylko w pliku tokenów. Znaczenia nazwane według przeznaczenia (`action-primary`, `surface-card`, `text-muted`, `space-section`), nigdy według wyglądu (`blue-500`). Tokeny komponentów tylko tam, gdzie komponent potrzebuje własnej wartości. Agent korzysta z warstwy znaczeń, więc nie musi znać palety ani zgadywać odcienia.
- Nazwa mówi agentowi, kiedy użyć wartości: `#335cff` może być czymkolwiek, "kolor głównej akcji" jest jednoznaczny. Z tego samego powodu w kodzie nie nazywasz zmiennej `liczba3`, tylko `maxRetries`.
- Czystsza wersja wskazuje token z palety, a nie wartość wprost. Zmiana koloru głównej akcji to wtedy jedna linia, a wszystkie przyciski idą za nią:
```css
/* surowa wartość (paleta) */
--brand-500: #335cff;
/* znaczenie: kolor głównej akcji */
--action-primary-fill: var(--brand-500);
/* komponent bierze znaczenie, nie paletę */
.button-primary { background: var(--action-primary-fill); }
```
- Wartość wpisaną na sztywno poznasz po kolorze zapisanym jako hex, `rgb()`, `hsl()` albo `oklch()` w komponencie, po klasie z palety Tailwinda (`bg-zinc-900`, `text-white`, `bg-indigo-500`) i po wartości w nawiasach kwadratowych (`px-[18px]`). Token znaczeniowy poznasz po nazwie, która mówi, do czego służy wartość.
- Prompt "od decyzji do tokenów" najpierw mapuje decyzje na istniejące tokeny i proponuje nowy tylko wtedy, gdy żaden nie pasuje (w przykładzie z lekcji 37 z 43 pozycji dało się zmapować na istniejące). Nazwy opisujące wygląd (`bg-white-0`) traktuje jako warstwę surową i dodaje nad nimi nazwy znaczeniowe. Przy każdym tokenie znaczeniowym zapisuje pochodzenie (numer referencji lub decyzję).
- Format design tokenów ma pierwszą stabilną wersję specyfikacji od 28 października 2025 (grupa społecznościowa przy W3C, nie oficjalny standard W3C).
- Odstępy: jedna skala kroków (np. 8, 16, 24, 32, 48 px) przypisana do relacji: w grupie, między grupami, wewnątrz panelu, między komponentami, między sekcjami. Agent nie wybiera z dowolnej liczby pikseli, tylko z kilku wartości. Zacznij od zbyt dużej ilości białej przestrzeni i zmniejszaj ją, zamiast dobierać odstępy na oko.
- Typografia: role (nagłówek strony, sekcji, tekst, etykieta, metadane, liczby, kod) zamiast samych rozmiarów. Agent wybiera styl, nie rozmiar. Dwa kroje wystarczą (np. jeden do interfejsu, jeden do kodu i cen). Sam font nie daje charakteru: Inter i Roboto są nadużywane, ale nie są złe.
- Kształt, głębia, ruch: każdy promień zaokrąglenia ma przeznaczenie (małe kontrolki, przyciski, karty, panele). Cień jest informacją, co leży nad czym, a nie ozdobą. Ruch ma kilka stałych czasów (np. 120, 180 i 240 ms) i znika przy włączonym `prefers-reduced-motion`.
- Ikony: jeden zestaw na cały produkt, z grubością linii dopasowaną do fontu, nigdy dwa naraz. Emoji to nie ikony. Domyślny zestaw w shadcn (Lucide) jest częścią domyślnego wyglądu.
- Kolor to funkcja, nie nastrój: role (akcja, tło, powierzchnia, tekst, obramowanie, sukces, ostrzeżenie, błąd) zamiast "niebieski 500". Kolor nigdy nie jest jedynym nośnikiem znaczenia: status ma też tekst albo ikonę. Kontrast się liczy, nie ocenia na oko.
- Ciemny motyw to nie odwrócone kolory. Każdy token ma dwie wartości: znaczenie zostaje, zmienia się wartość (ten sam niebieski na ciemnym tle bywa nieczytelny). Kontrast sprawdzaj w obu motywach. Przełącznik motywu ustawiaj na elemencie głównym dokumentu, żeby dialogi, menu i popovery renderowane poza drzewem komponentu też dostały motyw.

### Zasady UX zapisane w komponentach
- Prawo bliskości: to, co jest blisko siebie, wygląda na jedną grupę, więc odstępy grupują treść, a nie dekorują. Prawo Fittsa: im mniejszy i dalszy cel, tym trudniej w niego trafić (minimalne rozmiary przycisków). Prawo Hicka: im więcej opcji, tym dłużej trwa decyzja (mało wariantów, jedna akcja główna na ekranie). Próg Doherty'ego: system powinien odpowiedzieć w mniej niż 400 ms, a gdy trwa to dłużej, pokazuje stan ładowania.
- Pięć heurystyk Nielsena da się zapisać w komponencie, a to, co jest w komponencie, dostaje każdy ekran, także zbudowany przez agenta: spójność (przycisk "Zapisz" wygląda tak samo i stoi w tym samym miejscu w każdym formularzu), widoczność stanu (przycisk pokazuje, że trwa zapis, pusta lista mówi, dlaczego jest pusta), zapobieganie błędom (w kalendarzu nie ma terminów z przeszłości), pomoc przy błędach (zamiast "Invalid input": "Podaj cenę w złotych, na przykład 120") i minimalizm (każdy element konkuruje o uwagę z najważniejszym).
- Liczby do zapamiętania:

| Co | Ile |
|---|---|
| kontrast zwykłego tekstu | co najmniej 4,5 : 1 |
| kontrast dużego tekstu, ikon i obrysów pól | co najmniej 3 : 1 |
| minimalny cel kliknięcia według WCAG 2.2 | 24 x 24 px |
| cel dotykowy zalecany przez Apple i Material | 44 pt i 48 dp |
| szerokość, przy której treść mieści się bez przewijania w bok | 320 px |
| wygodna długość linii tekstu | 45-75 znaków |

- Sprawdzaj zawsze, zanim uznasz zasadę za spełnioną: obrys pola formularza z kontrastem 1,19 : 1 (w przykładzie z lekcji) wygląda dobrze, a nie przechodzi progu 3 : 1. Biały tekst na indygo z kontrastem 4,47 : 1 nie przechodzi progu 4,5 : 1.

### Dokumentacja komponentu
- Dokumentacja to instrukcja obsługi, nie galeria. Strona każdego komponentu ma tę samą budowę (13 sekcji): do czego służy, kiedy używać, kiedy nie używać i czego użyć zamiast, anatomia, warianty (kiedy który), stany, zachowanie i dostępność, treść, responsywność, API (propsy z typami i wartościami domyślnymi), kod (minimalny i typowy przykład), dobrze i źle (pary obok siebie), powiązane (z czym się go myli).
- Najcenniejsza dla agenta jest linijka "kiedy nie używać". Agent, który ją zna, nie zrobi z przycisku linku do innej strony.
- Stany komponentu: domyślny, najechanie, fokus (z wyraźnym obrysem), wciśnięty, zablokowany, ładowanie, wybrany i błąd. Zablokowany element ma osobne kolory tła i tekstu (półprzezroczysty tekst łatwo traci kontrast) i wyjaśnia, dlaczego akcja jest niedostępna.
- API komponentu to kontrakt. Przycisk ma dwa wymiary: przeznaczenie (akcja główna, zwykła, usuwanie) i wygląd (wypełniony, z obrysem, jaśniejszy, sam tekst), do tego skończoną liczbę rozmiarów. Agent wybiera z istniejących wariantów, nie wymyśla kolejnego. Przycisk z samą ikoną ma nazwę dla czytnika ekranu. W stopce formularza najpierw jest "Anuluj", potem akcja główna, w tej samej kolejności w kodzie i na ekranie.
- Wzorce to większe kawałki złożone z komponentów. Zasady zapisane w jednym komponencie (np. formularzu) pilnują się same, a agent nie musi o nich pamiętać przy każdym ekranie:
  - formularz: etykieta zawsze widoczna (placeholder to przykład, nie nazwa pola), walidacja tym samym schematem co serwer, błędy pod polem i z nim połączone (czytnik ekranu je odczyta), po nieudanym wysłaniu fokus na pierwszym błędzie, blokada podwójnego wysłania, komunikat o sukcesie dopiero po potwierdzeniu z serwera;
  - lista z filtrami: licznik wyników, aktywne filtry widoczne i łatwe do usunięcia, osobny stan "brak wyników dla filtrów" (z akcją wyczyść filtry) i osobny "jeszcze nic tu nie ma" (z akcją utwórz);
  - widok szczegółów: najważniejsza informacja i główna akcja widoczne bez przewijania, stan "nie istnieje albo brak dostępu";
  - potwierdzenie usunięcia: nazwa obiektu w pytaniu, łatwy do znalezienia przycisk rezygnacji, przycisk usuwania opisany czasownikiem ("Usuń profil"), nie "OK".
- Treść interfejsu też jest zasadą: ton z referencji (trzy zdania, które produkt mówi, i trzy, których nie mówi), przyciski jako czasownik i obiekt, błędy mówią co się stało i co zrobić, puste stany mówią dlaczego jest pusto i jaki jest następny krok, formaty dat, godzin, walut i liczb. Błąd, który wymaga działania, nigdy nie jest toastem.
- Skrót dla agentów (np. `docs/design-system.md`, z odwołaniem w `AGENTS.md`): charakter produktu, tabela komponentów (import, kiedy używać, kiedy nie), tokeny znaczeniowe z przeznaczeniem, przewodniki "jeśli ... to użyj ...", lista "czego unikać", komendy Storybooka. Agent budujący ekran czyta ten plik jako pierwszy.

### Układ Storybooka
- Design system: Start here (jak zbudować ekran), Components (katalog z podglądem), How to choose (jak wybrać komponent), Usage and accessibility, Content, What to avoid, What is missing, Contributing, plus jedna strona na każdy epik z backlogu (przepływ, ekrany i ich stany). Dalej: Foundations (kolor, typografia, odstępy i układ, kształt i głębia, ruch, ikony, motywy), Primitives (komponenty bazowe), Product (komponenty produktu pogrupowane według epików), Patterns (formularz, lista z filtrami, widok szczegółów, potwierdzenie usunięcia i kluczowe wzorce z backlogu).
- "What to avoid" ma trzy części: antywzorce produktu z referencji, generyczny wygląd AI i błędy implementacji (wartość spoza tokenów, wariant dodany przy okazji, `div` zamiast przycisku, placeholder zamiast etykiety, status oznaczony tylko kolorem, zablokowany przycisk bez wyjaśnienia). Przy każdym punkcie: jak go rozpoznać także w kodzie, dlaczego to problem i czym zastąpić.
- "What is missing" to lista braków i pokrycia backlogu. Komponent, którego nie ma w bazie, agent buduje z komponentów bazowych i tokenów i dokumentuje jak pozostałe. Czego nie da się zbudować z materiałów, trafia na tę stronę. Nie wymyśla niczego po cichu.
- Foundations pokazują prawdziwe zmienne CSS (nie obrazki) wraz z tabelą kontrastu każdej pary tekst i tło w obu motywach. Dokumentacja pisana w MDX potrzebuje pluginu `remark-gfm`, inaczej tabele wyświetlą się jako surowy tekst z kreskami. Podglądy owiń w blok `Unstyled` Storybooka, żeby style dokumentacji nie przebijały style komponentów. Pochodzenie bazy zapisz w notatce technicznej, w interfejsie Storybooka ma być widoczna tylko nazwa produktu. Fonty dołącz do projektu, nie ładuj z zewnętrznego CDN.
- Stories korzystają z prawdziwych komponentów z pakietu (żadnych kopii w HTML). Macierz stanów pokazuje najechanie i fokus jako zamrożony podgląd (te same deklaracje co w `:hover` i `:focus-visible`, podpięte pod atrybut tylko do dokumentacji). Dane w przykładach są realistyczne i wzięte z briefu i specyfikacji, bez lorem ipsum i bez wymyślonych liczb klientów, ocen ani opinii.

### Budowa z agentem etapami
- Prompt budujący design system dzieli pracę na etapy: 0 plan (agent czyta materiały i nic nie buduje, tylko pyta i zapisuje plan), 1 fundamenty (Storybook, tokeny w kodzie, strony Foundations, przełącznik motywu, skrypt szukający wartości spoza tokenów), 2 komponenty bazowe (partiami po ok. sześć), 3 komponenty produktu, wzorce i ekrany, 4 strony uczące i plik dla agentów, 5 sprawdzenie i raport. Po każdym etapie agent zatrzymuje się i czeka na "dalej".
- Postęp zapisuj w pliku (np. `POSTEP.md` w katalogu design systemu): zakończone etapy, zatwierdzone decyzje, otwarte pytania, następny krok. Dzięki temu pracę można przerwać i wrócić w nowej sesji promptem "przeczytaj prompt i plik postępu, kontynuuj od następnego kroku".
- Zasady, których agent nie łamie: styl wynika z materiałów (nie wymyśla go, a propozycje oznacza), wygląd bazy nie jest stylem produktu (sama zmiana palety nie wystarcza: kształt, typografia, odstępy, gęstość i stany też), każda wartość z tokenu, każda reguła z przypisanym źródłem (referencja, antyreferencja, decyzja z briefu lub specyfikacji, WCAG, WAI-ARIA) albo oznaczona jako propozycja, żadnych komponentów, wariantów i zależności spoza zatwierdzonego planu (po komendzie CLI, np. shadcn, sprawdź `package.json` i usuń zależności spoza planu), niczego nie wypychać i nie publikować, istniejącego design systemu nie usuwać ani nie przepisywać bez zgody.
- Skala pracy z lekcji: etapy 0 i 1 zajęły razem 26 minut, pierwsza partia sześciu komponentów około godziny razem ze sprawdzaniem, a cały prompt to szacunkowo 10-15 godzin pracy agenta w kilku sesjach. Twoja rola: zatwierdzać plan i decydować o propozycjach. Wiele pytań agenta na etapie 0 jest normalne, bo niczego nie zbuduje, dopóki nie odpowiesz.
- Po lekcji w katalogu na wyniki ćwiczeń zostają: raport z audytu, plik referencji, tabela tokenów. W kodzie: tokeny, Storybook z Foundations, przełącznik motywu, skrypt kontroli tokenów i plik postępu. Komponenty, wzorce, ekrany, strony z zasadami i plik dla agentów powstają w pracy domowej.

## 16. Kontrola jakości interfejsu (CI, dostępność, test agentem)
- Typowe błędy AI w interfejsach są przewidywalne, więc można je łapać automatycznie. Lista do wklejenia do promptu: szary tekst na kolorowym tle (kontrast), cele klikalne poniżej 24 px i bez odstępu, placeholder zamiast etykiety, emoji zamiast ikon, kolor jako jedyny sygnał stanu, brak stanów (pusty, błąd, ładowanie), niewidoczny fokus, zmyślone dane (liczby, opinie, logo klientów), za dużo wariantów (osiem promieni, dwanaście kolorów tekstu), magiczne liczby zamiast tokenów, linie tekstu dłuższe niż 75 znaków, "Coś poszło nie tak" zamiast instrukcji.
- Skala problemu (dane podane w lekcji): w badaniu z 2024 roku (Aljedaani i in.) 84% stron wygenerowanych z pomocą ChatGPT miało problemy z dostępnością. Według raportu WebAIM Million 2026 95,9% stron głównych z miliona najpopularniejszych ma błędy WCAG, a niski kontrast występuje na 83,9% stron. W przykładzie z lekcji strony bez design systemu miały od 3 do 66 błędów kontrastu na stronę, a profil zbudowany na design systemie 0.
- Odstępy to nie kosmetyka: decydują o czytelności (co należy do czego), dostępności (padding wyznacza wielkość celu kliknięcia) i użyteczności (ściśnięte przyciski to pomyłki w kliknięciu, zwłaszcza na telefonie).
- Cztery sposoby łapania błędów: prompt budujący design system z wbudowaną listą, sprawdzenie w CI, testy dostępności w Storybooku i test agentem.

### Sprawdzenie wartości spoza tokenów w CI
- Szukaj kolorów wpisanych na sztywno (hex, `rgb`, `hsl`, `oklch`), klas palety Tailwinda zamiast tokenów (`bg-indigo-500`, `text-white`) i arbitralnych wartości w pikselach albo remach. Podmień ścieżki na swoje, a plik tokenów zostaw poza sprawdzanymi katalogami:
```bash
grep -rnE '#[0-9a-fA-F]{3,8}\b|(rgba?|hsla?|oklch)\(|-\[[0-9.]+(px|rem)\]|(^|[^-[:alnum:]_])(bg|text|border|ring|fill|stroke|from|via|to)-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-[0-9]{2,3}\b|(^|[^-[:alnum:]_])(bg|text|border)-(white|black)\b' <ścieżki> --include='*.tsx' --include='*.css'
```
- To pierwsza linia obrony, a nie cała. Nie łapie pikseli wpisanych w zwykłym CSS (`padding: 13px`). Warunek `(^|[^-[:alnum:]_])` przed nazwą klasy sprawia, że polecenie nie zgłasza nazw tokenów w CSS. Na macOS `grep` przy złej ścieżce nic nie wypisze i nie zgłosi błędu, więc najpierw sprawdź ścieżki.
- Krok w GitHub Actions ma kończyć się błędem zarówno przy znalezisku, jak i przy złej ścieżce. Samo `! grep ...` tego nie zapewnia: GitHub Actions uruchamia krok przez `bash -e`, który nie przerywa na poleceniu zanegowanym przez `!`, więc taki krok przechodzi mimo znaleziska, jeśli po nim jest inna linia, a przy złej ścieżce przechodzi zawsze. Poprawny wzorzec:
```bash
status=0
grep -rnE '<wzorzec>' <ścieżki> --include='*.tsx' --include='*.css' || status=$?
if [ "$status" -eq 0 ]; then echo "Znaleziono wartości spoza tokenów"; exit 1; fi
if [ "$status" -ne 1 ]; then echo "grep nie zadziałał, sprawdź ścieżki"; exit 1; fi
```
- Włącz to sprawdzenie dopiero po poprawieniu istniejących naruszeń w kodzie aplikacji, bo inaczej zatrzyma najbliższy PR. Poprawki robi osobny prompt (znajdź wartości, zaproponuj istniejący token, a gdy żaden nie pasuje, zaproponuj nowy z wartością dla obu motywów i policz kontrast, poczekaj na decyzję, zmień tylko te pliki i plik tokenów). Jeśli agent dodał własny skrypt kontroli, uruchom w CI ten skrypt zamiast `grep`, po krokach instalacji zależności jak w pozostałych jobach.

### Testy dostępności w Storybooku
- Ustaw `a11y: { test: 'error' }` w preview, żeby naruszenia kończyły testy błędem, i uruchamiaj stories jako testy (np. dodatkiem Vitest do Storybooka) w obu motywach, jeśli produkt ma ciemny. Panel dostępności sprawdza przy każdym przykładzie kontrast i etykiety.
- Testy działają w przeglądarce, więc job w CI potrzebuje przeglądarki Playwrighta. Poproś agenta o job i przed zapisem pliku obejrzyj YAML (nazwa skryptu jest w `package.json` i pliku postępu, kroki checkout, setup i instalacji weź z istniejących jobów, pozostałych jobów nie zmieniaj).
- Każda story przechodzi sprawdzenie dostępności bez naruszeń albo ma opisany wyjątek. CI uruchamia się przy pull requeście, więc oba joby zobaczysz w działaniu dopiero po wypchnięciu gałęzi i otwarciu PR (zakładka Checks).
- Zbudowany Storybook (`storybook-static`) wpisz do `.gitignore` i do ignorowanych katalogów lintu, inaczej trafi do commita i do `lint`.
- Axe nie oblicza kontrastu dla kolorów zbudowanych z `color-mix` (np. stan najechania), więc takie stany sprawdź osobno, na przykład policzeniem kontrastu skryptem.
- Wyłącz telemetrię Storybooka w konfiguracji (`core.disableTelemetry`), jeśli projekt tego wymaga.

### Test agentem
- Agent buduje nowy ekran wyłącznie z design systemu i jego dokumentacji i wypisuje każde miejsce, w którym musiał zgadywać. Każde takie miejsce to luka w design systemie.
- Rób go w nowej sesji, bez kontekstu. Agent, który przed chwilą pisał dokumentację, zna odpowiedzi z rozmowy, a nie z plików.
- Zasady testu: tylko istniejące komponenty, tokeny i wzorce, żadnych nowych kolorów, odstępów, promieni, wariantów ani komponentów, brak nowych komponentów wielokrotnego użytku (czego brakuje, to luka, a nie ciche wymyślanie), bez dodawania testów, eksportów i wpisów w konfiguracji.
- Krok 1 przed kodem: agent wypisuje wszystkie decyzje, których wymaga ekran (układ, komponenty, stany, odstępy, kolory, teksty, zachowanie przy błędzie, zachowanie na telefonie) i oznacza każdą jako REGUŁA (zapisana zasada, z plikiem i miejscem), PRZYKŁAD (jest tylko przykład w kodzie albo Storybooku, bez zasady) albo ZGADUJĘ (nie ma ani zasady, ani przykładu, z opisem założenia). Krok 2: buduje ekran i sprawdza wartości wpisane na sztywno.
- Wynik: lista luk pogrupowana (brakujący komponent, brakujący stan, brakująca zasada, niejasna lub sprzeczna dokumentacja, a przy każdej: co zgadł, gdzie i co dopisać), liczby w kategoriach REGUŁA, PRZYKŁAD i ZGADUJĘ oraz wynik sprawdzenia wartości na sztywno. Agent nie poprawia design systemu sam, tylko opisuje braki.
- Każdą lukę zamień w zadanie: dopisz zasadę, dodaj stan lub komponent albo wpisz lukę na stronę "What is missing". Potem powtórz test. Przykład z lekcji: ekran z 60 decyzjami, z czego 19 oparto na zasadach, 14 na samych przykładach, a 27 zgadnięto. Nawet rozbudowany design system ma po pierwszym teście listę luk.
- Design system jest gotowy, gdy lista luk jest pusta albo zawiera tylko rzeczy, które świadomie zostawiasz na później. Kryteria zaliczenia lekcji: skrypt nie znajduje wartości spoza tokenów, testy Storybooka z dostępnością przechodzą w CI (w obu motywach, jeśli jest ciemny), a po teście agentem każde miejsce zgadywania ma zasadę albo wpis w "What is missing".

### Doświadczenia z wykonania pracy domowej (własne obserwacje, nie treść lekcji)
Źródło: budowa design systemu w `mikoajp/aitl-starter` (menedżer zadań, Next.js, Tailwind 4, Storybook 10). Warto sprawdzić u siebie, bo część dotyczy konkretnych wersji narzędzi.
- **Bramka bez testu negatywnego może być pusta.** Zarówno test a11y, jak i skrypt tokenów sprawdziłem celowo złym wejściem: historia z szarym tekstem (`#ccc` na białym) musi wywalić test kontrastu, a plik z `bg-indigo-500 px-[18px] #335cff` musi wywalić skrypt. Dopiero wtedy zielony wynik coś znaczy.
- **Skrypt tokenów łapie własne błędy agenta od pierwszego uruchomienia.** Znalazł dwa naruszenia w komponentach zbudowanych chwilę wcześniej (`max-w-[65ch]`, szerokość okna w nawiasach). Wzorzec na nawiasy kwadratowe zawęź do postaci `-\[...cyfra...\]` (z myślnikiem przed nawiasem), inaczej zgłasza zwykłe tablice w TypeScript (`['a', '8 px']`). Wartości układowe w nawiasach (np. `grid-cols-[auto_1fr]`) też są zgłaszane, więc zamień je na zwykłe klasy albo token.
- **Skrypt kontroli ma działać z dowolnego katalogu** (`cd` do korzenia repo na początku) i kończyć się błędem, gdy `grep` zwróci kod inny niż 0 i 1. Uruchomiony z `apps/web` bez tego zgłosił błąd ścieżki, co było poprawne, ale mylące.
- **Tokeny znaczeniowe w CSS i motyw zagnieżdżony.** Jeśli `--surface-page: var(--neutral-50)` jest zadeklarowane tylko na `:root`, zagnieżdżony `data-theme="dark"` niczego nie zmienia, bo `var()` rozwiązuje się tam, gdzie właściwość jest zadeklarowana. Deklaruj warstwę znaczeń na `:root` i na `[data-theme]`, a surowe wartości per motyw. Lint, build i testy tego nie wykryły, pokazał to dopiero zrzut ekranu.
- **Motyw ustawiaj na opakowaniu historii, nie na `<html>`.** Na stronie dokumentacji Storybooka kilka historii leży w jednym dokumencie, więc globalny atrybut miesza motywy. Okno modalne (`<dialog>` otwarty w historii) zakrywa całą stronę dokumentacji, więc historie z modalem renderuj w ramce (`docs.story.inline: false`).
- **Dodatek Vitest do Storybooka 10.x wymaga Vitest 4 lub 5.** Przy repo z Vitest 3 to zmiana w całym projekcie. Rozdziel skrypty: `test` uruchamia tylko projekt `unit` (job `checks` nie potrzebuje przeglądarki), a historie z dostępnością idą osobnym skryptem i osobnym jobem z instalacją Chromium. Sprawdź `npm audit --omit=dev` po instalacji, bo narzędzia deweloperskie ściągają wiele zależności.
- **W komponentach klienckich importuj z pakietu domenowego tylko typy** (`import type`). Pełny import z `index.ts` pakietu z ORM-em wciąga kod serwerowy do przeglądarki.
- **Wzorce (formularz, lista, szczegóły) rób prezentacyjne**, z danymi i akcjami w propsach, i testuj zachowanie w `play` (walidacja, filtr, usuwanie z potwierdzeniem, skupienie na "Anuluj"). Zachowanie, nie tylko wygląd, to część design systemu.
- **Natywne kontrolki w ciemnym motywie** (pole daty, lista, pasek przewijania) wymagają `color-scheme` per motyw w tokenach. Bez tego przeglądarka rysuje je jasno na ciemnym tle.
- **Po zmianie zasad zaktualizuj wszystkie miejsca, które je powtarzają.** Test agentem znalazł, że komendy z tabeli w `AGENTS.md`, konfiguracji pipeline'u i `SDLC.md` rozjechały się z tym, co wymaga CI. Jedno miejsce prawdy (`AGENTS.md`) i odwołania do niego są trwalsze niż kopie.
- **Zrzut ekranu to osobne sprawdzenie.** Dwa realne błędy (motyw zagnieżdżony, motyw globalny w dokumentacji) wyszły dopiero na zrzutach, a nie z testów. Przy pracy z agentem każ mu zrobić zrzut i opisać, co widzi.
- **Test agentem w podagencie jest przybliżeniem.** To ten sam model co autor systemu, a zakaz czytania poza repo to polecenie, nie zabezpieczenie. Wynik (152 decyzje: 49 REGUŁA, 46 PRZYKŁAD, 57 ZGADUJĘ) był wartościowy, ale warto powtórzyć w świeżej sesji. Wyrywkowo zweryfikuj twierdzenia agenta w kodzie, zanim je zapiszesz jako fakty.
- **Test agentem wykrywa sprzeczności w dokumentacji, nie tylko braki.** Znalazł 18 (ikony opisane trzy różnymi sposobami, tokeny w dokumencie inne niż w pliku, wyjątki od zasady akcentu zapisane tylko w kodzie, nieaktualne zdanie w briefie). Dokumentacja pisana etapami szybko się rozjeżdża.
- **Decyzje, których właściciel nie zatwierdził, zapisuj osobno** (sekcja "Decyzje niezatwierdzone" w pliku postępu), z listą, co trzeba poprawić, jeśli się zmienią. Agent nie powinien traktować własnych założeń jako ustalonych.
- **Odpowiedź "zgadzam się ze wszystkim" nie jest przeglądem punkt po punkcie.** Zapisz to w statusie pliku referencji (przyjęte hurtem, bez weryfikacji na zrzutach), tak jak lekcja ostrzega.

### Gotowe pliki wzorcowe (do skopiowania do nowego projektu)
Źródło: `mikoajp/aitl-starter`, gałąź `feat/design-tokens` (po zastosowaniu patcha z etapów 0-5). Skopiuj i dopasuj, nie pisz od zera.
- Tokeny: `apps/web/src/styles/tokens.css` (trzy warstwy, motyw jasny i ciemny, deklaracja znaczeń na `:root` i `[data-theme]`, `@theme inline` dla Tailwinda 4, `color-scheme`).
- Kontrola tokenów: `scripts/check-tokens.sh` (wzorzec ze statusem, `cd` do korzenia repo) i joby `ui-tokens` oraz `storybook` w `.github/workflows/ci.yml`.
- Storybook i testy: `apps/web/.storybook/main.ts`, `preview.tsx` (motyw na opakowaniu historii, `a11y: 'error'`), `apps/web/vitest.config.ts` (projekty `unit` i `storybook`).
- Dokumentacja dla agentów i proces: `docs/design-system.md`, `POSTEP.md`, `.ai/specs/` (brief, referencje, tokeny, test agentem), blok "Interfejs" w `CODE_REVIEW.md`, krok UI w `SDLC.md`.

## 17. Prototyp: sprawdź przepływ, zanim powstanie kod
- Prototyp to wersja aplikacji, którą można przeklikać jak prawdziwą, choć pod spodem nie ma kodu produkcyjnego. Dane są zmyślone, logowanie i maile to symulacje. Służy całemu zespołowi: klient widzi, co dostanie, developer widzi, jak ma działać każdy ekran (także ten z wygasłym linkiem z maila), a agent koduje z ekranów, nie tylko z opisu. Opis da się zrozumieć na kilka sposobów, ekran tylko na jeden.
- Poprawka w prototypie to jedno polecenie dla agenta. Ta sama poprawka po wdrożeniu to nowa gałąź, testy, review i kolejny PR.
- Klient, który klika prototyp, mówi zwykle o drobiazgach. O ważne rzeczy nikt sam nie zapyta (np. co zobaczy ktoś bez konta na GitHubie, skoro logujemy się GitHubem). Takie sytuacje pokaż w prototypie sam.
- Czas z lekcji (orientacyjnie): szary prototyp niecałe 6 minut, pierwsza część prototypu z design systemu 31 minut, persony kwadrans. Przebiegi agenta to prawie godzina, do tego Twoja mapa ekranów, odpowiedzi i sprawdzanie.

### Najpierw pytanie, na które prototyp odpowiada
- Zapisz jedno pytanie, zanim agent zbuduje choćby jeden ekran. Bez tego prototyp rośnie we wszystkie strony i na końcu nie wiadomo, co sprawdzał.
- Podział prototypów według pytań (Houde i Hill, 1997): rola (do czego to służy w życiu użytkownika), wygląd i odczucie (jak wygląda i jak się z tego korzysta), implementacja (czy da się to zbudować). Prototyp przepływu odpowiada na pierwsze pytanie, nie na trzecie (czy logowanie przez GitHub naprawdę zadziała, sprawdzi dopiero kod).
- Prototyp, który wygląda jak prawdziwa aplikacja, łatwo wziąć za gotowy produkt, szczególnie z design systemem i na spotkaniu z klientem. Mów głośno, czego prototyp nie sprawdza.
- Przepływ bierz z sekcji "Key flows" briefu: jedna rola, jeden cel, droga od pierwszego kroku do wyniku. Jeśli brief jej nie ma, poproś agenta o listę przepływów z briefu i backlogu (po jednym zdaniu) i wybierz jeden.

### Mapa ekranów (przed budową)
- Agent najpierw nic nie buduje, tylko rozpisuje mapę w pliku i zatrzymuje się do zatwierdzenia. To najtańszy moment, żeby zobaczyć, czego brakuje w specyfikacji.
- Zawartość mapy:
  - historie i kryteria akceptacji dotyczące przepływu, z numerami,
  - ekrany ze stałym identyfikatorem (s01, s02…), którego się nie zmienia, bo do niego przypina się komentarze,
  - stany każdego ekranu: domyślny, pusty, ładowanie, błąd, brak dostępu, konflikt (konto z tym mailem już istnieje) i wynik zewnętrznej usługi (GitHub niedostępny), przy każdym historia lub kryterium, z którego wynika,
  - role: kto widzi ekran i co zobaczy niezalogowany albo ktoś z inną rolą,
  - scenariusze do przełączania (link wygasł, sesja wygasła): to kontrolki prototypu, nie funkcje produktu,
  - konta i dane demo: fikcyjne, z briefu, ze stałym "teraz" dla zegara demo,
  - komponenty design systemu przy każdym ekranie, braki jako luki w design systemie,
  - luki w specyfikacji, czyli najważniejsza część: kryterium bez ekranu lub stanu, stan potrzebny w przepływie bez kryterium, sprzeczność między specyfikacją, briefem i design systemem, decyzja, której nikt nie podjął. Przy każdej luce pytanie do właściciela produktu.
- Agent nie dodaje funkcji, których nie ma w materiałach, nawet jeśli "zwykle są" w takich aplikacjach (kody rabatowe, rozmowy wideo, oceny). Jeśli uważa, że czegoś brakuje, zapisuje to jako pytanie.
- Przykład z lekcji: 8 ekranów, 44 stany, 8 luk w specyfikacji i 5 w design systemie. Typowa luka: nikt nie zdecydował, co pokazać na pustej liście. Agent tego nie wymyśla, tylko pyta o tytuł, opis i akcję.
- Na pytania o luki odpowiada człowiek. Jeśli pytanie jest zbyt abstrakcyjne, poproś agenta o wyjaśnienie prostym językiem i rekomendację, bez zmiany mapy. Zatwierdzenie mapy z odpowiedziami: agent wpisuje decyzję przy każdej luce i aktualizuje liczby, a specyfikacji, backlogu i design systemu nie zmienia. Sprawdź w pliku, czy każda luka ma decyzję.

### Szary prototyp i prototyp z design systemu
- Buduj w dwóch krokach. Najpierw szary prototyp (bez warstwy wizualnej) sprawdza, czy przepływ ma sens i nie łamie reguł z briefu. Potem ten sam zakres składasz z design systemu, ze szczegółami zachowania ze specyfikacji. Narzędzie do szarego prototypu nie bierze z design systemu wyglądu, więc wygląd jest zawsze szary.
- Skill do szarego prototypu (`om-mockup-prototype`) robi pięć rzeczy: czyta brief (przy każdej regule z "Business rules" zapisuje jej numer i zapisuje, czego brakuje), pokazuje plan, buduje plik HTML (ścieżka bez błędów, błędy, pusta lista, brak dostępu, reset symulacji), sprawdza w przeglądarce ze zrzutami ekranu i zapisuje wynik jako nową wersję w folderze z numerem (`revision-001`, kolejna przez `--refresh`).
- Plan skilla czytaj, zanim powiesz "tak": kto przechodzi przepływ i co jest sukcesem, czy na liście reguł są te, które mają być, jakie założenia przyjął (każde to coś, czego w briefie nie ma). Jeśli plan kłóci się z regułą z briefu, skill ma się zatrzymać i zapytać, nie rozstrzygać po cichu.
- Czego skill nie robi: nie zmienia briefu, nie dotyka kodu aplikacji, nie wymyśla reguł biznesowych. Brak briefu zatrzymuje go, brak podanego przepływu kończy się propozycją jednego (nie buduje wszystkich naraz), brak raportu person nie przeszkadza (wnioski oznacza jako hipotezy). Backlogu i specyfikacji nie czyta.
- Wynik sprawdzenia to `passed`, `incomplete` albo `not-run`. Bez przeglądarki jest `not-run` i lista kroków do sprawdzenia ręcznie w README. To poprawny wynik, ale nikt nie sprawdził wyglądu, kontrastu ani obsługi klawiaturą.
- Szary prototyp wystarcza na wczesnym etapie: gdy sprawdzasz, czy funkcja ma rację bytu i spełnia warunki biznesowe, nie masz design systemu albo nie chcesz angażować nikogo w warstwę UI, testujesz coś w zespole (np. dwa warianty logowania) albo testujący ma tylko dotrzeć do celu. Prototypy bywają też robione w gotowych narzędziach (np. Figma).
- Prototyp z design systemu buduj etapami z zatrzymaniem po każdym ("dalej"), z postępem w `POSTEP.md` w katalogu prototypu: etap 0 plan (technologia, kolejność ekranów, kontrolki scenariuszy, konta demo, komponenty i luki, niczego nie buduje), etap 1 szkielet z silnikiem przeglądu i ścieżką bez błędów, etap 2 stany, role i scenariusze (wpisane dane zostają po błędzie), etap 3 uczciwość i sprawdzenie (notatka przy ekranie: numery historii, co jest symulacją, czego prototyp nie rozstrzyga; README z sekcją "Ograniczenia symulacji"; testy nawigacji; sprawdzenie w przeglądarce 320 i 1440 px, oba motywy, klawiatura, każdy przycisk). Raport: co zbudował, co sprawdził, czego nie sprawdził, luki w design systemie i pytania do specyfikacji, które wyszły przy budowie.
- Zasady, których agent nie łamie przy prototypie:
  - ekrany tylko z komponentów i tokenów design systemu, brak elementu to najprostsza wersja z tokenów oznaczona w kodzie jako luka i wpisana do raportu,
  - identyfikatory ekranów z mapy się nie zmieniają,
  - dane fikcyjne, z briefu, bez wymyślonych liczb użytkowników, ocen i opinii, zegar demo ze stałym "teraz",
  - nic nie udaje prawdziwej usługi: płatność, mail i logowanie zewnętrzne to symulacje opisane na ekranie, bez zbierania prawdziwych danych kart i haseł,
  - kontrolki scenariuszy w pasku przeglądu, osobno od nawigacji produktu,
  - każdy przycisk coś robi albo ma dopisek, że w prototypie nie działa (żadnych martwych kliknięć),
  - reguły z briefu i specyfikacji mają pierwszeństwo przed tym, co "zwykle jest",
  - nie zmieniaj kodu aplikacji ani design systemu i niczego nie usuwaj. Prototyp żyje w swoim katalogu i nie jest importowany przez aplikację. Wynik budowania do podglądu nie jest kodem produktu, więc nie trafia do commita (dopisz go do `.gitignore` i do ignorowanych katalogów lintu).
- Silnik przeglądu: tryb komentarzy przypiętych do elementu, mapa ekranów, tryb prezentacji, eksport uwag (Markdown albo plik do repozytorium). Komentarze zapisują się w przeglądarce osoby, która je pisze, więc poproś ją o eksport i odesłanie pliku. Poprawka z komentarza: wklej wyeksportowaną treść agentowi z poleceniem "Wprowadź tę poprawkę w prototypie", odśwież i porównaj przed i po.

### Pokaż trzy wersje, a nie jedną
- W badaniu z 2006 roku (Tohidi i in.) uczestnicy, którzy widzieli jeden projekt, oceniali go wyżej i krytykowali rzadziej niż ci, którzy widzieli ten sam projekt obok dwóch innych. Z jednym projektem ludzie są grzeczni, z porównaniem mówią, co im nie pasuje.
- W badaniu z 2010 roku (Dow i in.) osoby robiące kilka wersji równolegle kończyły z lepszymi projektami niż te, które w kółko poprawiały jedną.
- Z agentem trzy wersje ekranu to trzy polecenia, a nie tydzień pracy: poproś o trzy układy jednego ekranu (różniące się układem, nie kolorem), każdy z komponentów design systemu, z przełącznikiem A, B i C w pasku przeglądu i bez zmian poza tym ekranem.

### Persony przechodzą prototyp
- Persony syntetyczne (skill `om-synthetic-users` w trybie `validate`) przechodzą gotowy prototyp, a nie tylko brief. Skill zna format prototypu ze skilla do szarego prototypu, więc w lekcji przechodzą szary prototyp.
- Jak to działa (od tego zależy, ile ufać wynikowi): główny agent otwiera prototyp w przeglądarce i robi zrzut, a bez przeglądarki mówi o tym wprost i przechodzi przepływ na papierze, z opisu w briefie lub specyfikacji. Każda persona to osobny agent bez przeglądarki, który nie wie, co powiedziały inne. Dostaje ekran i odpowiada: co zauważyła najpierw, czego się spodziewała, co dostała, gdzie się zawahała, co by teraz kliknęła. Główny agent wykonuje to kliknięcie i pokazuje następny ekran. Persony nie wpisują danych osobowych ani haseł, takie kroki trafiają do raportu jako niesprawdzone.
- Całość odbywa się dwa razy, za każdym razem z nowym składem panelu. Wnioskiem jest tylko to, co powtórzyło się w obu przebiegach, bo to, co pojawiło się raz, mogło być przypadkiem. W raporcie sprawdź sekcję o zakresie i ograniczeniach (czy persony przeszły prototyp, czy tylko przepływ na papierze).
- Persona to wciąż AI, nie człowiek. Porównanie wirtualnych użytkowników z prawdziwymi (Nielsen Norman Group) pokazało, że wirtualni twierdzili, że ukończyli kursy, które prawdziwi porzucali, chwalili fora, z których prawdziwi nie korzystali, i przejmowali się wszystkim po równo. Wynik person traktuj jak listę pytań do prawdziwych ludzi, nie jak badanie. Wszystko w raporcie ma etykietę `[SYNTHETIC]`.
- Skład panelu pochodzi z wywiadów w katalogu badań. Gdy wywiadów brak, cechy bez źródła są oznaczone `[ASSUMPTION]`. Skill zapisuje też plik person i kalibrację (porównanie wyników person z prawdziwymi wywiadami).
- Przykład z lekcji: dwa przebiegi po dwie persony dały 11 znalezisk powtórzonych w obu i 11 pytań do prawdziwych mentorów. Najmocniejsze znaleziska wskazały wszystkie persony (np. oceny wróciły do prototypu mimo reguły z briefu, która ich zabrania). Skill odrzucił to, co niepewne: tę samą personę zapytał dwa razy o to samo i dostał dwie sprzeczne odpowiedzi, obie wymyślone z przekonaniem, więc nie policzył tego jako wniosku. Persona brzmi wiarygodnie, nawet kiedy zmyśla. Skill odnotował też, że panel się nie nasycił (cztery wywiady, ostatni wciąż przynosił nowe tematy) i że bez przeglądarki nie sprawdził wyglądu, kontrastu ani klawiatury.

### Z prototypu z powrotem do specyfikacji
- To, na co trafiły persony i komentarze, wraca do specyfikacji przed kodem. Każdy problem przechodzi tę samą drogę: problem (na co trafiła persona lub komentarz), pytanie (czy to naprawdę problem, czy domysł persony), decyzja (rozstrzyga osoba odpowiedzialna za produkt, nie agent), kryterium (nowe kryterium akceptacji, które da się sprawdzić, albo zapisana decyzja, że tego nie robimy, i dlaczego).
- Przykład sprzeczności złapanej przed kodem: przypadek brzegowy, w którym użytkownik z niewłaściwą rolą otwiera cudzy ekran i trafia na swoją stronę startową, a API zwraca 403. Specyfikacja nie mówiła, co wtedy zobaczy, a design system miał gotowy komunikat odmowy, ale nikt nie zdecydował, kiedy go użyć. Agent zauważył to przy mapie ekranów i zapytał. Decyzja: przekierowanie zostaje, a na stronie startowej pojawia się baner z jednym zdaniem wyjaśnienia. Kryterium: użytkownik otwiera ekran, trafia na swoją stronę i widzi jedno zdanie, dlaczego tam trafił.
- Prompt do wpisania zmian: agent czyta mapę, uwagi z prototypu i raport person, dla każdej decyzji i uwagi proponuje zmianę w specyfikacji (kryterium do sprawdzenia albo zapisaną decyzję "nie robimy"), uwagi o innym przepływie przypisuje do właściwej specyfikacji, wyniki person wpisuje tylko jako pytania do sprawdzenia, przy kryteriach dopisuje identyfikator ekranu z mapy i ścieżkę prototypu na górze specyfikacji. Najpierw pokazuje listę zmian i czeka na zgodę, na końcu wypisuje ekrany bez kryterium.
- Brief odświeżaj po prototypie (w narzędziach z lekcji: `om-discover --refresh`), a wyniki person wpisuj do niego jako hipotezy.
- Prawdziwa osoba spoza projektu przeklikuje prototyp, zostawia komentarze tam, gdzie się zawahała, i eksportuje uwagi. Porównaj je z raportem person w krokach, które mają oba prototypy (np. w logowaniu).
- Co zabrać z lekcji: (1) najpierw pytanie i mapa ekranów, potem ekrany, bo rozpisanie ekranów i sytuacji z kryteriów od razu pokazuje, czego specyfikacja nie mówi, (2) pokaż każdą sytuację i powiedz, co jest na niby, bo ścieżka bez błędów przekona każdego, ale niczego nie sprawdzi, (3) to, co znajdziesz, wraca do specyfikacji przed kodem.


## Zasady ogólne dla designu i prototypu
- Agent zawsze coś narysuje. Tam, gdzie nie ma Twojej decyzji, narysuje średnią. Zapisz decyzję tak, żeby nie musiał zgadywać, i sprawdzaj wynik liczbą (kontrast, rozrzut wartości, lista luk), a nie okiem.
- Prototyp nie jest produktem i nie dowodzi, że coś działa technicznie. Mów, na jakie pytanie odpowiada i co jest symulacją, a jego wyniki wracaj do specyfikacji przed kodem.

## Checklista startu nowego projektu (ta część)
1. Design system przed ekranami produktu: referencje i antyreferencje zapisane jako decyzje, tokeny w trzech warstwach z kontrastem w obu motywach, wybrana i opisana baza komponentów, Storybook z fundamentami i skryptem kontroli wartości spoza tokenów.
2. Skrót design systemu dla agentów (`docs/design-system.md`) z odwołaniem w `AGENTS.md`.
3. W CI: job z kontrolą wartości spoza tokenów i job z testami dostępności Storybooka (włączone po poprawieniu istniejących naruszeń).
4. Test agentem zrobiony w nowej sesji, a każda luka ma zasadę albo wpis w "What is missing".
5. Dla pierwszego epiku: mapa ekranów z lukami w specyfikacji i zapisanymi decyzjami, szary prototyp sprawdzony (albo wiem, czego nie sprawdził), prototyp z design systemu z podpisanymi symulacjami.
6. Prototyp przeklikała co najmniej jedna prawdziwa osoba, a jej uwagi i wyniki person (jeśli były) wróciły do specyfikacji, tak że każdy ekran z mapy ma kryterium.

## Checklista przed zleceniem zadania agentowi (ta część)
- Przy ekranie UI: agent ma wskazany skrót design systemu i wie, że wolno używać tylko istniejących komponentów, tokenów i wzorców (a braki zgłasza jako luki).
- Dla funkcji z interfejsem: ekrany z mapy mają kryteria w specyfikacji (z identyfikatorem ekranu), a prototyp został przeklikany przed kodowaniem.

## Checklista przeglądu wyniku agenta (ta część)
- Dla UI: brak wartości spoza tokenów, wszystkie stany (ładowanie, pusto, błąd, brak wyników dla filtra) zbudowane, brak naruszeń dostępności, brak zmyślonych danych, etykiety widoczne (nie tylko placeholder), błędy mówią co zrobić, akcja główna i kolejność przycisków zgodne z design systemem.
- Dla prototypu: podany wynik sprawdzenia (`passed`, `incomplete`, `not-run`) i co nie zostało sprawdzone, symulacje podpisane na ekranie, brak martwych kliknięć, identyfikatory ekranów niezmienione, brak funkcji spoza mapy, luki w design systemie wypisane.

## Antywzorce (ta część)
- Zlecanie agentowi ekranów bez design systemu: dostajesz średnią (indygo, gradient, trzy identyczne karty z ikoną, zmyślone liczby i opinie).
- Moodboard z obrazkami zamiast zapisanych decyzji o wyglądzie.
- Ocena wyglądu na oko zamiast liczenia kontrastu, rozrzutu wartości i luk w dokumentacji.
- Domyślne tokeny biblioteki (np. shadcn) bez zmiany: to najczęstszy generyczny wygląd.
- Tokeny nazwane według wyglądu (`blue-500`, `bg-white-0`) zamiast przeznaczenia.
- Wartości wpisane na sztywno w komponentach i kolory z palety Tailwinda zamiast tokenów.
- Przyjmowanie propozycji agenta hurtem ("akceptuję twoje propozycje") zamiast osobnej decyzji o każdej.
- Dokumentacja komponentu bez sekcji "kiedy nie używać".
- Brak stanów komponentu i ekranu (pusty, błąd, ładowanie, brak wyników dla filtra, disabled z wyjaśnieniem).
- Placeholder zamiast etykiety pola, status oznaczony tylko kolorem, toast dla błędu wymagającego działania.
- Kontrola tokenów w CI zapisana jako samo `! grep ...` (w GitHub Actions nie zatrzymuje kroku) albo włączona przed poprawieniem istniejących naruszeń.
- Test agentem w tej samej sesji, w której powstała dokumentacja (agent zna odpowiedzi z rozmowy, nie z plików).
- Design system gotowy "na wiarę", bez testów dostępności kończących się błędem i bez testu agentem.
- Prototyp bez zapisanego pytania, na które odpowiada: rośnie we wszystkie strony i nikt nie wie, co sprawdzał.
- Prototyp wzięty za gotowy produkt albo za dowód, że coś działa technicznie (szczególnie z design systemem i na spotkaniu z klientem).
- Budowa ekranów bez mapy ekranów i stanów: luki w specyfikacji wychodzą dopiero w kodzie.
- Ścieżka bez błędów jako jedyna pokazana wersja: przekona każdego i niczego nie sprawdzi. Brakujące sytuacje (błąd, brak dostępu, wygasły link, brak konta w usłudze zewnętrznej) pokaż sam.
- Symulacja udająca prawdziwą usługę (płatność, mail, logowanie) bez podpisu na ekranie albo zbierająca prawdziwe dane.
- Przycisk w prototypie, który nic nie robi i nie ma dopisku (martwy klik).
- Pokazanie klientowi jednej wersji ekranu: dostajesz grzeczne uwagi. Pokaż trzy.
- Rozstrzyganie luk przez agenta: decyzję podejmuje człowiek odpowiedzialny za produkt, a agent zapisuje pytanie.
- Wnioski z person bez drugiego przebiegu albo bez sprawdzenia z prawdziwymi ludźmi, traktowane jak badanie.
- Uwagi z prototypu zostawione w komentarzach i rozmowie zamiast wpisania do specyfikacji jako kryteria albo decyzje.
