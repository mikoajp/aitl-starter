# Praktyki: produkt i discovery z agentami AI

Analiza wymagań i discovery, product brief, syntetyczni użytkownicy, backlog i specyfikacja dla agentów. Sekcje 9-13.

Część zbioru praktyk AI Tech Leaders. Indeks i tabela „gdy robisz X, czytaj Y”: `README.md` (ten katalog). Numeracja sekcji jest wspólna dla wszystkich plików (nie przenumerowana), żeby odwołania i notatki się nie gubiły.

---

## 9. Analiza wymagań i discovery z AI
- Przed zleceniem implementacji ustal: co budujesz, dla kogo, po co, co wiesz i skąd, czego nie wiesz, co wchodzi do pierwszej wersji, a co później. Nieznane zapisuj jako pytania razem ze sposobem ich wyjaśnienia.
- Discovery to ciągłe poznawanie kontekstu i sprawdzanie założeń, nie jednorazowy warsztat. Brief aktualizuj, gdy nowe informacje zmieniają ustalenia.
- Dobieraj metodę do pytania: interesariusze i RACI (kto decyduje), Product Vision Board (kierunek), Value Proposition Canvas (dopasowanie do odbiorcy), mapa ścieżki użytkownika (przeszkody), MoSCoW (zakres wydania). Wypełniony szablon nie potwierdza hipotezy.
- MoSCoW: "Must" znaczy, że bez tego wydanie nie działa, nie że bardzo zależy. "Won't this time" znaczy poza tym wydaniem, nie nigdy.
- Benchmark: AI pomaga znaleźć i zestawić rozwiązania, ale ceny, limity i funkcje weryfikujesz w źródle. Przy każdej pozycji zapisz źródło i datę sprawdzenia, a nieustalone oznacz "brak danych". Opinie klientów opisuj jako wypowiedzi konkretnych osób.
- Wywiady: pytaj o przeszłe zachowanie ("kiedy ostatnio utknąłeś, co zrobiłeś, ile czekałeś, jak się skończyło"), nie o to, czy pomysł się podoba. Dopytuj o szczegóły i sprawdzaj, czy problem został rozwiązany, czy tylko odsunięty.
- Notatki z badań: data, rola, sytuacja, działania, wynik, pytania bez odpowiedzi. Cytatem jest tylko prawdziwy cytat, resztę oznacz jako skrót lub parafrazę. Wywiady, benchmark i decyzje trzymaj jako osobne rodzaje źródeł. Przy decyzji zapisz, kto ją podjął, dlaczego i kiedy do niej wrócić.
- Protopersona z przekonań zespołu to hipoteza, nie wynik badań, nawet z imieniem i zdjęciem.
- Liczby ze źródeł przeliczaj na surowych danych. Notatki streszczające bywają niezgodne z plikiem.

## 10. Product brief
- Zawartość: produkt, odbiorcy, zakres pierwszej wersji, reguły działania, otwarte pytania. Z niego korzystają kolejne kroki (specyfikacje, backlog, review).
- Oddzielaj wizję od zakresu 1.0 i zapisuj status każdego pomysłu: teraz, później, świadomie nie budujemy. Bez tego agent potraktuje wszystkie jako równorzędne wymagania.
- Oznaczaj pochodzenie informacji: z wywiadu, z danych, z dokumentu, decyzja zespołu, `[ASSUMPTION]` (robocze założenie), `[SYNTHETIC]` (z symulacji). Brak sprzeciwu nie jest potwierdzeniem.
- Doprecyzuj słowa-wytrychy ("szybko", "prosto", "wygodnie"), jeśli od nich zależy funkcja. Długość sesji to nie czas oczekiwania na jej start.
- Decyzje i reguły mają identyfikator, właściciela, status (aktywna, propozycja) i ścieżkę zmiany (zastąpienie przez właściciela). Propozycja nie jest ustaleniem.
- Brief jest gotowy, gdy wiadomo, co robimy teraz i na jakich decyzjach się to opiera, a żadne otwarte pytanie nie blokuje opisu tego zakresu. Pytania o dalszą wizję mogą zostać otwarte.
- Odpowiedź "nie wiemy" jest lepsza niż wymyślony fakt. Luki mają być widoczne.
- Przegląd przez osobnego agenta-sceptyka jest dodatkową kontrolą, nie niezależnym badaniem rynku. Skrócony tryb robi to w tym samym kontekście.
- Sprawdź, czy dane wspierają wniosek: kilka wywiadów z własnej sieci i jedna ankieta to cienka podstawa. Zapisuj ograniczenia próby.
- Pokrycie źródłami (ile twierdzeń ma źródło) nie mierzy jakości poparcia.

## 11. Syntetyczni użytkownicy (symulacja AI)
- To model odgrywający osobę na podstawie przekazanych materiałów. Służy do wychwycenia obiekcji i niespójności oraz do przygotowania pytań do prawdziwych rozmów. Nie służy do wyznaczania popytu, ceny ani odsetka rezygnacji.
- Persony opisuj sytuacją i potrzebami z materiałów, nie odpowiedzią, której oczekujesz. Dopisana cecha bez podstawy w źródle (budżet, termin, priorytet) zmienia całą symulację, więc sprawdź profile względem notatek przed uruchomieniem.
- Błąd w profilu zauważony po uruchomieniu: wskaż odpowiedzi, które od niego zależały, i wygeneruj je ponownie. Poprawienie opisu nie naprawia wcześniejszych wyników.
- Trzy typowe pomyłki: dopisany szczegół staje się faktem, brak informacji staje się odmową, doświadczenie z innym produktem staje się oceną naszego.
- Pojedynczy przebieg to "seen once". Powtarzalność sprawdzaj kolejnymi przebiegami ze świeżymi panelami i weryfikacją poza modelem. Porównanie z jedną odłożoną notatką nie dowodzi ogólnej trafności.
- Wyniki wprowadzaj do briefu jako hipotezy: z oznaczeniem pochodzenia, założeniami scenariusza i pytaniem do sprawdzenia z człowiekiem.
- Badania pokazują, że symulacje bywają zgodne z ludźmi w wąskich zadaniach, ale zależą od sformułowania instrukcji i skłaniają się do pochlebnych uzasadnień. Nie przenoś wyników na inne zadania.

## 12. Backlog z briefu
- Najpierw podgląd (dry run): drzewo zadań bez zapisu i bez trackera. Tworzenie zgłoszeń jako osobny krok po zatwierdzeniu.
- Epik grupuje większy rezultat, story opisuje efekt z perspektywy użytkownika z kryteriami akceptacji (Given/When/Then), task to praca techniczna. "Dodaj komponent kalendarza" jest taskiem, nie wymaganiem.
- Przed utworzeniem zgłoszeń przeczytaj pełne treści i sprawdź, czy wynikają z zakresu "teraz", nie dopisują reguł i uwzględniają zależności. Nieznane nie staje się twardym wymaganiem.
- Gdy problem i odbiorcy opierają się na założeniach lub symulacji, backlog powinien zawierać zadania badawcze (rozmowa z grupą, zebranie danych), nie implementację.
- Story oparte na nieustalonej decyzji lub otwartym pytaniu oznacz jako zablokowane i nazwij blokadę. Zmiany dotykające pieniędzy, uprawnień, migracji i kontraktów mają wyższe ryzyko i wymagają testów na granicy (odmowa dostępu, ponowienie, idempotentność).
- Zadania z płatnościami: integracja najpierw w trybie testowym, webhooki idempotentne, weryfikacja podpisu, testy integracyjne dla duplikatów.
- Kolejność tworzenia zgłoszeń wynika z zależności, nie z numeracji.

## 13. Specyfikacja dla agentów (context engineering)
- Wymaganie mówi, co chcemy osiągnąć. Specyfikacja mówi, jak to zrobić w tym konkretnym systemie: z istniejącą architekturą, stosowanymi wzorcami i wcześniejszymi decyzjami.
- To dokument dla agenta i dla zespołu jednocześnie. Człowiek, jego kolega i agent patrzą na to samo i zgadzają się co do tego samego, zanim ktokolwiek dotknie kodu. Specyfikacja nie jest dokumentacją pisaną po implementacji.
- Sens specyfikacji to zarządzanie kontekstem: research robi jeden agent, wynik trafia do jednego dokumentu, a agent kodujący nie powtarza tej pracy. W małej aplikacji będzie to nadmiar, w dużym systemie trudno bez niej kontrolować większe funkcje.
- Heurystyka review: czy to jest kontekst, który chciałbym przekazać agentowi kodującemu, czy jest w nim wszystko, czego potrzebuje, i czy nie ma rzeczy zbędnych? To działa lepiej niż ocena "czy merytorycznie poprawne".
- Dłuższa nie znaczy lepsza. Do dokumentu nie trafia opis każdej linii kodu. Pytaj przy review odwrotnie niż zwykle: czy czegoś nie ma tu za dużo?
- Zawartość: zakres zmiany, miejsce w istniejącej architekturze, istotne części systemu, komponenty i wzorce do użycia, zmieniane przepływy, ważne decyzje implementacyjne, ryzyka i ograniczenia, user stories.
- User stories są najważniejszym elementem. Bez nich agent zbuduje CRUD: poprawny technicznie, płaski produktowo (formularz z tabelką). Dobra story mówi: kto, w jakiej sytuacji, co chce zrobić, jaki efekt ma zobaczyć, co system robi po drodze i co dzieje się dalej.
- Story wywołuje pytania architektoniczne, które inaczej by nie padły (skąd kontekst, co przechowujemy między krokami, co użytkownik widzi po powrocie). Są tanie przed implementacją i drogie po.
- Miejsce w procesie: wymagania, specyfikacja, mockupy, kod. Mockup weryfikuje specyfikację, a specyfikacja karmi mockup.
- Pełny przepływ: backlog, analiza codebase, pytania do człowieka, draft, review innym modelem, przepytanie przez agenta (grill me), poprawki, zatwierdzona specyfikacja, dalszy pipeline.
- Człowiek czyta specyfikację sam. Nieprzeczytana i zatwierdzona oznacza, że architektem jest agent. Przeczytana staje się Twoją architekturą.
- Review przez inny model niż autor: autor rzadziej podważa to, co przed chwilą wymyślił. Szukaj niespójności z architekturą, błędnych założeń, pominiętych przypadków, niepotrzebnych abstrakcji i nadmiernych szczegółów.
- Grill me (agent przepytuje człowieka o każdą niejednoznaczność) wyciąga pytania także z dokumentu po review. Niejasności są najtańsze przed implementacją, a błędne założenie odkryte w połowie kodowania kosztuje wielokrotnie więcej.
- Review innym modelem warto ustawić tak, żeby czytał też kod i standardy repo. Najcenniejsze uwagi dotyczą konfliktów z realnym projektem (próg pokrycia a umiejscowienie pliku, ścisły kontener DI, bundling frameworka, brak runnera dla skryptu), a nie stylu dokumentu.
- Przy pracy nieinteraktywnej agent zatrzymuje się na pytaniach. Odpowiedzi przyjęte jako rekomendacje zapisuj w specyfikacji jako założenia do potwierdzenia przez właściciela produktu i ustaw status "zablokowana do zatwierdzenia". Nie udawaj zatwierdzenia.
- Specyfikacja nie powinna mieć faz "zablokowanych do czasu" innej, jeszcze nieistniejącej specyfikacji. Wynieś taką pracę do kryteriów gotowości tamtego zadania.
- Kryteria akceptacji kopiuj do specyfikacji i numeruj, bo agent nie ma dostępu do backlogu, który je zawiera.
- Na końcu sam przejdź dokument i zdecyduj, które uwagi przyjmujesz, które ignorujesz i co jest przekombinowane. Nie przyjmuj uwag review hurtem.
- Przerabiając skill do pisania specyfikacji, nie usuwaj kroków analizy kodu i pytań do człowieka. Własny prompt dokładaj oszczędnie, bo dobry skill już prowadzi proces.
- Specyfikację poprawiaj po prototypie: ekrany i stany z mapy, komentarze i wyniki person wracają do niej jako sprawdzalne kryteria z identyfikatorem ekranu albo jako zapisane decyzje "nie robimy" (`praktyki-design.md`, sekcja 17).


## Checklista startu nowego projektu (ta część)
1. Brief z zakresem 1.0 oddzielonym od wizji, źródła i założenia oznaczone, pytania otwarte z planem wyjaśnienia.
2. Backlog zatwierdzony po podglądzie.
3. Specyfikacje do zadań po review innym modelem i przepytaniu (grill me), przeczytane przez człowieka.

## Antywzorce (ta część)
- Wizja i zakres pierwszej wersji w jednym zdaniu bez statusów.
- Tworzenie zgłoszeń z briefu, którego decyzje są jeszcze propozycjami.
- Traktowanie odpowiedzi symulowanego użytkownika jako badania.
- Przyjmowanie liczb z notatek streszczających bez sprawdzenia w danych.
- Zatwierdzanie specyfikacji, której człowiek nie przeczytał.
- Specyfikacja jako lista encji i endpointów bez user stories (wychodzi CRUD).
- Specyfikacja opisująca każdą linię kodu zamiast dostarczać kontekst.
- Review specyfikacji tym samym modelem, który ją napisał.
