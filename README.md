# jlcg
JLCG = Jaroslaw Lawniczak CSS Graphics, Javascript library helping with CSS3 coding graphics.

/*
 * Biblioteka JLCG = Jaroslaw Lawniczak CSS Graphics
 * JLCG, ver.1.0
 * Author: Jaroslaw Lawniczak
 * Contact: jjlawniczak__at___scienceio.com
 * 
 * October 2016
 * All rights reserved by MIT License
 * https://github.com/jjlawniczak/jlcg/blob/master/LICENSE
 * 
 * 
 * Utworzono na podstawie tutoriala/biblioteki javascript:
 * http://www.mikedoesweb.com/2012/creating-your-own-javascript-library/
 * 
 * 
 * 
 * Opis: Biblioteka jlcg udostępnia funkcje rysujące grafikę wektorową 2D korzystającą z biblioteki JLCG i CSS3
 * Instrukcja użycia (porady):
    1.  Zaincludować bibliotekę do danego pliku html/php za pomocą znaczników <script>    
    2.  Dołączyć do projektu plik ze stylami CSS lub dodać style CSS za pomocą tagów HTML
    3.  Utworzyć tag HTML z id lub z nazwą klasy CSS, np.
        <div id="<my_id_css>"></div> lub <div class="<my_class_css>></div>
    4.  W pliku <moj_plik.js>, lub pomiędzy znacznikami <script> utworzyć obiekt poprzez:
        var <my_object> = new jlcg(<id_lub_klasa_selektora_css>);
        <id_lub_klasa_selektora_css> jest to nazwa id lub klasy CSS utworzonej w pliku HTML/PHP.
    5.  Następnie w pliku <moj_plik.js> wywołać funkcję (z wartościami domyślnymi) z biblioteki jlcg, np.
        <my_object>.DrawRectangle();
        lub
        <my_object>.DrawCorner();
    6.  Zapisać <moj_plik.js> i odświeżyć stronę www projektu. W zależności od wyboru funkcji jlcg.js
        powinien ukazać się prostokąt lub zaokrąglony narożnik - dodatkowy, dodany przez bibliotekę jlcg
        element tła CSS.
    
    7.  Biblioteka jlcg.min.js i jlcg.js dysponuje na chwilę obecną jedynie dwoma funkcjami składowymi:
    7.1. DrawRectangle() - funkcja rysująca prostokąt wypełniony określonym gradientem, lub kolorem jednolitym
    7.2. DrawCorner() - funkcja rysująca narożnik wypełniony gradientem lub kolorem jednolitym wraz
                        z możliwością zdefiniowania koloru "tła" narożnika. Wyraz "tło" został tu ujęty
                        w cudzysłów, ponieważ sama funkcja jlcg rysuje już niejako po tle CSS
                        (background-image).

    8.  Funkcje rysują dany element tym bliżej ekranu im wcześniej zostaną użyte.
        Oznacza to, że jeżeli narysujemy duży prostokąt i następnie jakiś punkt, 
        który znajdzie się w obrębie tego prostokąta, to wówczas prostokąt "przykryje" 
        narysowany punkt. Jeżeli zależy nam, żeby taki punkt nie został przykryty to 
        kolejność użycia funkcji jlcg w kodzie powinna być taka, że najpierw rysujemy punkt, 
        a później dopiero większy prostokąt (który, jako że został narysowany później 
        niż punkt, znajdzie się pod tymże punktem niejako tło punktu).

    9.  Funkcje biblioteki jlcg są raczej przeznaczone do używania w grafice statycznej.
        Do grafiki dynamicznej zaleca się zmodyfikowanie funkcji jlcg w oparciu o 
        technologię AJAX.

    10. Zmienne używane wspólnie dla DrawRectangle() i dla DrawCorner():
    // ----------------------------------------------------------------------------------------------------------------------
    // jlcg_id_or_class     =   id selektora lub id klasy CSS (już istniejącej w arkuszu styli CSS)    
    // jlcg_pos_00_x        =   pozycja wyjściowa X dla punktu 0,0 układu współrzędnych tła,
    //                          od tego miejsca następuje rysowanie na osi X - domyślnie równe: zero
    //                          Uwaga! - to nie jest właściwość CSS: background-origin
    // jlcg_pos_00_y        =   pozycja wyjściowa Y dla punktu 0,0 układu współrzędnych tła,
    //                          od tego miejsca następuje rysowanie na osi Y - domyślnie równe: zero
    //                          Uwaga! - to nie jest właściwość CSS: background-origin
    // jlcg_width           =   szerokość (oś X)
    // jlcg_height          =   wysokość (oś Y)
    // jlcg_gradient_type   =   typ wybranego gradientu, domyślnie: plain, oznaczenia:
    //                          1.  no-gr = bez gradientu, wypełnienie określonym kolorem
    //                              wówczas dla np. parametru jlcg_front_color wpisuje się
    //                              jedynie jakiś konkretny kolor, np. green
    //                          2. gr-lin = gradient linearny (ustawienia takie jak w css)
    //                          3. gr-rad = gradient radialny (ustawienia takie jak w css)
    //
    //                          Uwaga! Dla DrawCorner() istotne jest użycie (lub nie) "no-gr", ponieważ
    //                          każda inna wartość typu String będzie uznana za projektowanie z używaniem gradientu
    //                                         
    // jlcg_angle_or_stoppoint  =   kąt ustawienia gradientu, lub początek rysowania gradientu, np. at top left
    //                              domyślnie:  "0deg" = tworzenie gradientu liniowego poziomo (wzdłóż osi X od lewej do prawej), 
    //                                          kąt z osią X (poziomem) = 0
    //                              "0deg" = "top-left" -> dla DrawCorner()
    // jlcg_front_color         =   zestawienie kolorów wchodzących w skład gradientu, 
    //                              przedrostek "front_" jest w celu podreślenia, że chodzi
    //                              o gradient (lub jednolity kolor) rysowanego kształtu (narożnika)
    // jlcg_bcgnd_color_inside  =   wewnątrznarożnikowy kolor tła użyty w funkcji DrawCorner, 
    // jlcg_bcgnd_color_outside =   zewnątrznarożnikowy kolor tła użyty w funkcji DrawCorner, 
    //                              na chwilę obecną - TYLKO jako kolor jednolity (nie gradient)
    //                              
    // jlcg_repeat              =   czy dany obiekt (prostokąt lub narożnik) ma się ileś razy powtarzać?
    //                              domyślnie:  no-repeat = czyli ma być narysowany raz, ale
    //                                                      może być dodatkowo użyta wartość:
    //                              repeat-x = prostokąt powielony po osi X
    //                              repeat-y = prostokąt powielony po osi Y    
    // ----------------------------------------------------------------------------------------------------------------------
    //
    //
    //
    //
    // --------------------------------------------------------------------------------------------------
    // DrawCorner - funkcja rysująca narożnik
    // --------------------------------------------
    // Znaczenie zmiennych dla DrawCorner:
    // --------------------------------------------
    // jlcg_width, jlcg_height  =   szerokość i wysokość narożnika, jednostki możliwe do użycia
    //                              to procenty lub piksele, przy czym funkcja pracuje w ten sposób,
    //                              że i tak oblicza wszystkie wartości na podstawie danych procentowych
    // jlcg_shape               =   kształt narożnika, domyślnie: rectangle (kwadrat),
    //                              możliwe wartości:
    //                              - square    (kwadrat)   - obliczane na podstawie krótszego boku
    //                              - rectangle (prostokąt) - obliczane na podstawie dłuższego boku
    // jlcg_angle_or_stoppoint  =   w tej funkcji jako wybór narożnika,
    //                              domyślnie: bottom left,
    //                              możliwe wartości:
    //                              top-left = rysowany lewy górny narożnik
    //                              top-right = rysowany prawy górny narożnik
    //                              bottom-left = rysowany lewy dolny narożnik
    //                              bottom-right = rysowany prawy dolny narożnik
    // jlcg_transparent_bgnd    =   kolor tła narożnika, domyślnie: true -> transparent (przeźroczysty)
    //                              możliwe wartości: 
    //                              - true (kolor jest mieszany, tzn. transparent z gradientem)
    //                              - false (kolor jest pobierany bezpośrednio z jlcg_front_color)
    // jlcg_corner_edge_type    =   rodzaj wykończenia krawędzi wewnętrznej i zewnętrznej zaokrąglenia narożnika,
    //                              możliwe wartości:
    //                              - sharp - krawędzie ostre, brak wycieniowania
    //                              - smooth (domyślnie) - krawędzie gładkie cieniowanie automatyczne
    //                              - custom -  gładkość krawędzi a także rodzaj gradientu dla
    //                                          front-color i bcgnd-color ustawiana przez użytkownika
    //                                          na podstawie poniższego wzoru:
    //                                          
    //      jlcg_bcgnd_color_inside -> od 0% do <wartość_A> <- ustawiona przez użytkownika przy
    //                      definiowaniu początku dla jlcg_front_color
    //      jlcg_front_color -> od <wartość_B> do <wartość_C> <- ustawiona przez użytkownika przy
    //                      definiowaniu końca dla jlcg_front_color
    //                      jeżeli <wartość_B> != <wartość_C> to pomiędzy nimi utworzy się gradient
    //      jlcg_bcgnd_color_outside -> od <wartość_D> do 100%
    //                      <wartość_D> jest to początkowa wartość dla jlcg_bcgnd_color_outside
    //                      jeżeli <wartość_C> != <wartość_D> to pomiędzy nimi utworzy się gradient
    // ----------------------------------------------------------------------------------------------------------------------
