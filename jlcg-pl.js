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
    //                      definiowaniu początku dla jlcg_front_color, ALE TYLKO JEŚLI
    //                      jlcg_transparent_bgnd = false
    //      jlcg_front_color -> od <wartość_B> do <wartość_C> <- ustawiona przez użytkownika przy
    //                      definiowaniu końca dla jlcg_front_color
    //                      jeżeli <wartość_B> != <wartość_C> to pomiędzy nimi utworzy się gradient
    //      jlcg_bcgnd_color_outside -> od <wartość_D> do 100%
    //                      <wartość_D> jest to początkowa wartość dla jlcg_bcgnd_color_outside
    //                      jeżeli <wartość_C> != <wartość_D> to pomiędzy nimi utworzy się gradient
    //                      ALE TYLKO JEŚLI jlcg_transparent_bgnd = false
    // ----------------------------------------------------------------------------------------------------------------------
 * 
 * 
 */
// -----------------------------------------------------------------------------
// BIBLIOTEKA - START
// -----------------------------------------------------------------------------
// 
// Główny konstruktor klasy (biblioteki)
function jlcg(jlcg_id_or_class) {
    // public member variable(s)
    // declaration and initialization
    this.jlcg_id_or_class=jlcg_id_or_class;   
    this.jlcg_width="20%";    
    this.jlcg_height="20%";
    this.jlcg_pos_00_x="10%";
    this.jlcg_pos_00_y="10%";
    this.jlcg_shape="square"; // lub rectangle
    this.jlcg_gradient_type="no-gr"; 
    this.jlcg_angle_or_stoppoint="0deg";
    this.jlcg_front_color="green";
    this.jlcg_bcgnd_color_inside="red";     // tylko dla DrawCorner i tylko jeden kolor (nie gradient)
    this.jlcg_bcgnd_color_outside="blue";
    this.jlcg_transparent_bgnd="true";      // tylko dla DrawCorner
    this.jlcg_corner_edge_type="smooth";    // tylko dla DrawCorner - wyjaśnienie niżej
    this.jlcg_repeat="no-repeat";    
    
    // private member variables:
    // About object is returned if there is no 'JJid' parameter
    var jlcg_about = "Jaroslaw Lawniczak CSS Graphics Library = JLCG"+
           "Version: 0.1\n"+
           "Author: Jaroslaw Lawniczak\n"+
           "Created: Fall 2016\n"+
           "Updated: 26 October 2016\n\n\n"+
           "Hello Stranger!\nDid You set up \"jlcg_id\" / CSS \"id\" parameter? ;)";
 
    if  (jlcg_id_or_class) 
        { 
        // Avoid clobbering the window scope:
        // return a new JLibName object if we're in the wrong scope
        if (window === this) {
            return new jlcg(jlcg_id_or_class);
            }
 
        // We're in the correct object scope:
        // Init our element object and return the object
        this.e = jQuery(jlcg_id_or_class);
        return this;
        } else 
            {
            // No 'JJid' parameter was given, return the 'about' object
            //return JLibName_about;
            return alert(jlcg_about);
            }
};

// JLibName Prototype Functions - czyli metody (funkcje składowe) oraz pola (zmienne składowe)
// Tutaj także ustawiane są wartości domyślne

// funkcja rysująca prostokąt wypełniony gradientem
jlcg.prototype = {  
    DrawRectangle: function () {           
       
    // zamrożenie dotychczasowych własności css selektora lub klasy CSS    
    var pos_00_xy_before = this.e.css("background-position");        
    var width_height_before = this.e.css("background-size");
    var gasagcs_before = this.e.css("background-image");
    var repeat_before = this.e.css("background-repeat");   
    
    this.e.css("background-position", pos_00_xy_before +",\n"+this.jlcg_pos_00_x+" "+this.jlcg_pos_00_y);
    this.e.css("background-size", width_height_before +",\n"+this.jlcg_width+" "+this.jlcg_height);

    // wybranie odpowiedniego wypełnienia (jednolite lub gradient)
    if (this.jlcg_gradient_type==="no-gr") {
        
        // wypełnienie jednym kolorem    
        this.jlcg_front_color = this.jlcg_front_color + " 0%, "+this.jlcg_front_color+" 100%";        
        this.e.css("background-image", gasagcs_before +",\nlinear-gradient("+this.jlcg_angle_or_stoppoint+", "+this.jlcg_front_color+")");
        }
        else
    if (this.jlcg_gradient_type==="gr-lin") {
        // wypełnienie gradientem linearnym        
        this.e.css("background-image", gasagcs_before +",\nlinear-gradient("+this.jlcg_angle_or_stoppoint+", "+this.jlcg_front_color+")");
        }
        else
    if (this.jlcg_gradient_type==="gr-rad") {
        // wypełnienie gradientem radialnym
        this.e.css("background-image", gasagcs_before +",\nradial-gradient("+this.jlcg_angle_or_stoppoint+", "+this.jlcg_front_color+")");
        }

    // czy prostokąt ma być powielony (po osi x lub po osi y)?
    this.e.css("background-repeat", repeat_before +",\n"+this.jlcg_repeat);

    // czyszczenie niepotrzebnych danych z cache        
    delete pos_00_xy_before;
    delete width_height_before;
    delete gasagcs_before;
    delete repeat_before;
        
    return this;
    },    
    // --------------------------------------------------------------------------------------------------
    // DrawCorner - funkcja rysująca narożnik
    // --------------------------------------------------------------------------------------------------    
    DrawCorner: function () {       
            
    // zamrożenie dotychczasowych własności css selektora lub klasy CSS
    var pos_00_xy_before = this.e.css("background-position");    
    var width_height_before = this.e.css("background-size");
    var gasagcs_before = this.e.css("background-image");
    var repeat_before = this.e.css("background-repeat");

    this.e.css("background-position", pos_00_xy_before +",\n"+this.jlcg_pos_00_x+" "+this.jlcg_pos_00_y);    

    // ustalenie proporcji boków - jeżeli jlcg_shape="square":
    // bok wpisany jako ten dłuższy będzie stanowił długość boku kwadratu
    if (this.jlcg_shape==="square")
        {                 
        var width_units="";
        var height_units="";        
            
        // wyznaczanie width_units
        var czy_cyfra=false;                
        
        /*
        var czy_wartosc_sie_zawiera = this.jlcg_width.indexOf(".")!==-1;
        alert(czy_wartosc_sie_zawiera);
        */  
        var uciety_string = this.jlcg_width;                    
        while (czy_cyfra!==true)
            {                                   
            if ((jQuery.isNumeric( uciety_string.substr( (uciety_string.length-1),1 ) )) || ( uciety_string.indexOf(".")!==-1 ) )
                {                                
                czy_cyfra=true;                                
                if ( uciety_string.indexOf(".")!==-1 )
                    {                 
                    czy_cyfra=false; // trafiliśmy na ułamek
                    }
                }                    
                
            if ( ((jQuery.isNumeric( uciety_string.substr( (uciety_string.length-1),1 ) ) )===false) && ( uciety_string.indexOf(".", (uciety_string.length-1) )!==1 ) )
               {                                  
               width_units = uciety_string.substr( (uciety_string.length-1),1 ) + width_units;                                    
               }                        
            uciety_string = uciety_string.substr(0, (uciety_string.length-1) );            
            }        
    
        // wyznaczanie height_units
        var uciety_string = this.jlcg_height;         
        var czy_cyfra=false;
        while (czy_cyfra!==true)
            {               
            if ((jQuery.isNumeric( uciety_string.substr( (uciety_string.length-1),1 ) )) || ( uciety_string.indexOf(".")!==-1 ) )
                {                                
                czy_cyfra=true;                                
                if ( uciety_string.indexOf(".")!==-1 )
                    {                 
                    czy_cyfra=false; // trafiliśmy na ułamek
                    }
                }                
                
            if ( ((jQuery.isNumeric( uciety_string.substr( (uciety_string.length-1),1 ) ) )===false) && ( uciety_string.indexOf(".", (uciety_string.length-1) )!==1 ) )
                {                    
                height_units = uciety_string.substr( (uciety_string.length-1),1 ) + height_units;                                    
                }                        
            uciety_string = uciety_string.substr(0, (uciety_string.length-1) );            
            }               
    
    // jeśli są wprowadzone jednostki
    if (width_units!=="")
        {
        this.jlcg_width = this.jlcg_width.substr( 0, this.jlcg_width.length - width_units.length );
        this.jlcg_height = this.jlcg_height.substr( 0, this.jlcg_height.length - height_units.length );   
        }
    
    // wyrównywanie boków - brany jest pod uwagę dłuższy bok    
    if ( this.jlcg_width >= this.jlcg_height )
        {
        height_units = width_units; // na wypadek, gdyby ktoś niedbale wpisał lub nie wpisał poprawnych jednostek dla jlcg_height
        
        if (width_units!=="%")
            {                      
            // trzeba obliczyć jaką część jQuery(jlcg_id_or_class).width() stanowi jlcg_width
            this.jlcg_width = (this.jlcg_width * 100) / parseInt(this.e.width(), 10); 
            }
        if (this.jlcg_width>100) {this.jlcg_width=100;} // prevent to overload
            
        //this.jlcg_width = parseInt(this.jlcg_width, 10);
        this.jlcg_height=(parseInt(this.e.width(), 10)/parseInt(this.e.height(), 10)) * this.jlcg_width;
        
        if (this.jlcg_height>100) // wykroczenie poza zakres rysowania obrazka tła z css
            {
            // alert("height overload");
            this.jlcg_height=100;
            this.jlcg_width = (parseInt(this.e.height(), 10)/parseInt(this.e.width(), 10)) * this.jlcg_height;
            }        
            
        this.jlcg_width = this.jlcg_width + "%";
        this.jlcg_height = this.jlcg_height + "%";
        } 
        else 
            if ( this.jlcg_width < this.jlcg_height )
                {
                width_units = height_units; // na wypadek, gdyby ktoś niedbale wpisał lub nie wpisał poprawnych jednostek dla jlcg_height
                                        
                if (height_units!=="%")
                    {            
                    // trzeba obliczyć jaką część jQuery(jlcg_id_or_class).width() stanowi jlcg_width
                    this.jlcg_height = (this.jlcg_height * 100) / parseInt(this.e.height(), 10);
                    }
            if (this.jlcg_height>100) {this.jlcg_height=100;} // prevent to overload
            
            // this.jlcg_height = parseInt(this.jlcg_height, 10);
            this.jlcg_width=(parseInt(this.e.height(), 10)/parseInt(this.e.width(), 10)) * this.jlcg_height;
        
            if (this.jlcg_width>100) // wykroczenie poza zakres rysowania obrazka tła z css
                {
                // alert("width overload");
                this.jlcg_width=100;
                this.jlcg_height = (parseInt(this.e.width(), 10)/parseInt(this.e.height(), 10)) * this.jlcg_width;
                }        
            
            this.jlcg_width = this.jlcg_width + "%";
            this.jlcg_height = this.jlcg_height + "%";
            }            
    }        
    this.e.css("background-size", width_height_before +",\n"+this.jlcg_width+" "+this.jlcg_height);
                
    // ustawienie prawidłowej wartości domyślnej dla jlcg_angle_or_stoppoint dla DrawCorner
    if (this.jlcg_angle_or_stoppoint==="0deg") { this.jlcg_angle_or_stoppoint="top-left"; }
    
    if (this.jlcg_corner_edge_type==="smooth") {
        if (this.jlcg_angle_or_stoppoint==="top-left") {            
            if (this.jlcg_transparent_bgnd==="true") {            
                if (this.jlcg_gradient_type!=="no-gr")
                    {
                    this.e.css("background-image", 
                        gasagcs_before +",\nradial-gradient(farthest-side at 100% 100%, "+
                        "rgba(0,255,0,0) 0%, rgba(0,255,0,0) 49.9%, "+
                        this.jlcg_front_color+" 99.9%, rgba(255,255,0,0) 100%)");
                    }
                    else 
                    if (this.jlcg_gradient_type==="no-gr")
                        {
                        this.e.css("background-image", 
                            gasagcs_before +",\nradial-gradient(farthest-side at 100% 100%, "+
                            "rgba(0,255,0,0) 0%, rgba(0,255,0,0) 49.9%, "+
                            this.jlcg_front_color+" 50%, "+
                            this.jlcg_front_color+" 99.9%, rgba(255,255,0,0) 100%)");
                        }
            }
            else 
            if (this.jlcg_transparent_bgnd==="false")
                {   
                // dla front color został wybrany jakiś gradient, tło widoczne = jednokolorowe
                if (this.jlcg_gradient_type!=="no-gr")
                    {
                    this.e.css("background-image", 
                        gasagcs_before +",\nradial-gradient(farthest-side at 100% 100%, "+
                        this.jlcg_bcgnd_color_inside+" 0%, "+this.jlcg_bcgnd_color_inside+" 49.9%, "+
                        this.jlcg_front_color+" 99.9%, "+
                        this.jlcg_bcgnd_color_outside+" 100%)");
                    }
                    else 
                    // front color = jednokolorowy, tło widoczne = jednokolorowe
                    if (this.jlcg_gradient_type==="no-gr")
                        {
                        this.e.css("background-image", 
                            gasagcs_before +",\nradial-gradient(farthest-side at 100% 100%, "+
                            this.jlcg_bcgnd_color_inside+" 0%, "+this.jlcg_bcgnd_color_inside+" 49.9%, "+
                            this.jlcg_front_color+" 50%, "+
                            this.jlcg_front_color+" 99.9%, "+
                            this.jlcg_bcgnd_color_outside+" 100%)");
                        }        
                }
            } else        
        if (this.jlcg_angle_or_stoppoint==="top-right") {    
            if (this.jlcg_transparent_bgnd==="true") {            
                if (this.jlcg_gradient_type!=="no-gr")
                    {
                    this.e.css("background-image", 
                        gasagcs_before +",\nradial-gradient(farthest-side at 0% 100%, "+
                        "rgba(0,255,0,0) 0%, rgba(0,255,0,0) 49.9%, "+
                        this.jlcg_front_color+" 99.9%, rgba(255,255,0,0) 100%)");
                    }
                    else 
                    if (this.jlcg_gradient_type==="no-gr")
                        {
                        this.e.css("background-image", 
                            gasagcs_before +",\nradial-gradient(farthest-side at 0% 100%, "+
                            "rgba(0,255,0,0) 0%, rgba(0,255,0,0) 49.9%, "+
                            this.jlcg_front_color+" 50%, "+
                            this.jlcg_front_color+" 99.9%, rgba(255,255,0,0) 100%)");
                        }
            }
            else 
            if (this.jlcg_transparent_bgnd==="false")
                {   
                // dla front color został wybrany jakiś gradient, tło widoczne = jednokolorowe
                if (this.jlcg_gradient_type!=="no-gr")
                    {
                    this.e.css("background-image", 
                        gasagcs_before +",\nradial-gradient(farthest-side at 0% 100%, "+
                        this.jlcg_bcgnd_color_inside+" 0%, "+this.jlcg_bcgnd_color_inside+" 49.9%, "+
                        this.jlcg_front_color+" 99.9%, "+
                        this.jlcg_bcgnd_color_outside+" 100%)");
                    }
                    else 
                    // front color = jednokolorowy, tło widoczne = jednokolorowe
                    if (this.jlcg_gradient_type==="no-gr")
                        {
                        this.e.css("background-image", 
                            gasagcs_before +",\nradial-gradient(farthest-side at 0% 100%, "+
                            this.jlcg_bcgnd_color_inside+" 0%, "+this.jlcg_bcgnd_color_inside+" 49.9%, "+
                            this.jlcg_front_color+" 50%, "+
                            this.jlcg_front_color+" 99.9%, "+
                            this.jlcg_bcgnd_color_outside+" 100%)");
                        }        
                }
            } else
        if (this.jlcg_angle_or_stoppoint==="bottom-left") {
            if (this.jlcg_transparent_bgnd==="true") {            
                if (this.jlcg_gradient_type!=="no-gr")
                    {
                    this.e.css("background-image", 
                        gasagcs_before +",\nradial-gradient(farthest-side at 100% 0%, "+
                        "rgba(0,255,0,0) 0%, rgba(0,255,0,0) 49.9%, "+
                        this.jlcg_front_color+" 99.9%, rgba(255,255,0,0) 100%)");
                    }
                    else 
                    if (this.jlcg_gradient_type==="no-gr")
                        {
                        this.e.css("background-image", 
                            gasagcs_before +",\nradial-gradient(farthest-side at 100% 0%, "+
                            "rgba(0,255,0,0) 0%, rgba(0,255,0,0) 49.9%, "+
                            this.jlcg_front_color+" 50%, "+
                            this.jlcg_front_color+" 99.9%, rgba(255,255,0,0) 100%)");
                        }
            }
            else 
            if (this.jlcg_transparent_bgnd==="false")
                {   
                // dla front color został wybrany jakiś gradient, tło widoczne = jednokolorowe
                if (this.jlcg_gradient_type!=="no-gr")
                    {
                    this.e.css("background-image", 
                        gasagcs_before +",\nradial-gradient(farthest-side at 100% 0%, "+
                        this.jlcg_bcgnd_color_inside+" 0%, "+this.jlcg_bcgnd_color_inside+" 49.9%, "+
                        this.jlcg_front_color+" 99.9%, "+
                        this.jlcg_bcgnd_color_outside+" 100%)");
                    }
                    else 
                    // front color = jednokolorowy, tło widoczne = jednokolorowe
                    if (this.jlcg_gradient_type==="no-gr")
                        {
                        this.e.css("background-image", 
                            gasagcs_before +",\nradial-gradient(farthest-side at 100% 0%, "+
                            this.jlcg_bcgnd_color_inside+" 0%, "+this.jlcg_bcgnd_color_inside+" 49.9%, "+
                            this.jlcg_front_color+" 50%, "+
                            this.jlcg_front_color+" 99.9%, "+
                            this.jlcg_bcgnd_color_outside+" 100%)");
                        }        
                }
            } else
        if (this.jlcg_angle_or_stoppoint==="bottom-right") {
            if (this.jlcg_transparent_bgnd==="true") {            
                if (this.jlcg_gradient_type!=="no-gr")
                    {
                    this.e.css("background-image", 
                        gasagcs_before +",\nradial-gradient(farthest-side at 0% 0%, "+
                        "rgba(0,255,0,0) 0%, rgba(0,255,0,0) 49.9%, "+
                        this.jlcg_front_color+" 99.9%, rgba(255,255,0,0) 100%)");
                    }
                    else 
                    if (this.jlcg_gradient_type==="no-gr")
                        {
                        this.e.css("background-image", 
                            gasagcs_before +",\nradial-gradient(farthest-side at 0% 0%, "+
                            "rgba(0,255,0,0) 0%, rgba(0,255,0,0) 49.9%, "+
                            this.jlcg_front_color+" 50%, "+
                            this.jlcg_front_color+" 99.9%, rgba(255,255,0,0) 100%)");
                        }
            }
            else 
            if (this.jlcg_transparent_bgnd==="false")
                {   
                // dla front color został wybrany jakiś gradient, tło widoczne = jednokolorowe
                if (this.jlcg_gradient_type!=="no-gr")
                    {
                    this.e.css("background-image", 
                        gasagcs_before +",\nradial-gradient(farthest-side at 0% 0%, "+
                        this.jlcg_bcgnd_color_inside+" 0%, "+this.jlcg_bcgnd_color_inside+" 49.9%, "+
                        this.jlcg_front_color+" 99.9%, "+
                        this.jlcg_bcgnd_color_outside+" 100%)");
                    }
                    else 
                    // front color = jednokolorowy, tło widoczne = jednokolorowe
                    if (this.jlcg_gradient_type==="no-gr")
                        {
                        this.e.css("background-image", 
                            gasagcs_before +",\nradial-gradient(farthest-side at 0% 0%, "+
                            this.jlcg_bcgnd_color_inside+" 0%, "+this.jlcg_bcgnd_color_inside+" 49.9%, "+
                            this.jlcg_front_color+" 50%, "+
                            this.jlcg_front_color+" 99.9%, "+
                            this.jlcg_bcgnd_color_outside+" 100%)");
                        }        
                }
        } //
    }
    // brzeg wewnętrzny i brzeg zewnętrzny narożnika zakończone ostro (widoczne niewygładzone piksele)
    if (this.jlcg_corner_edge_type==="sharp") {
        if (this.jlcg_angle_or_stoppoint==="top-left") {            
            if (this.jlcg_transparent_bgnd==="true") {            
                if (this.jlcg_gradient_type!=="no-gr")
                    {
                    this.e.css("background-image", 
                        gasagcs_before +",\nradial-gradient(farthest-side at 100% 100%, "+
                        "rgba(0,255,0,0) 0%, rgba(0,255,0,0) 50%, "+
                        this.jlcg_front_color+" 100%, rgba(255,255,0,0) 100%)");
                    }
                    else 
                    if (this.jlcg_gradient_type==="no-gr")
                        {
                        this.e.css("background-image", 
                            gasagcs_before +",\nradial-gradient(farthest-side at 100% 100%, "+
                            "rgba(0,255,0,0) 0%, rgba(0,255,0,0) 50%, "+
                            this.jlcg_front_color+" 50%, "+
                            this.jlcg_front_color+" 100%, rgba(255,255,0,0) 100%)");
                        }
            }
            else 
            if (this.jlcg_transparent_bgnd==="false")
                {   
                // dla front color został wybrany jakiś gradient, tło widoczne = jednokolorowe
                if (this.jlcg_gradient_type!=="no-gr")
                    {
                    this.e.css("background-image", 
                        gasagcs_before +",\nradial-gradient(farthest-side at 100% 100%, "+
                        this.jlcg_bcgnd_color_inside+" 0%, "+this.jlcg_bcgnd_color_inside+" 50%, "+
                        this.jlcg_front_color+" 100%, "+
                        this.jlcg_bcgnd_color_outside+" 100%)");
                    }
                    else 
                    // front color = jednokolorowy, tło widoczne = jednokolorowe
                    if (this.jlcg_gradient_type==="no-gr")
                        {
                        this.e.css("background-image", 
                            gasagcs_before +",\nradial-gradient(farthest-side at 100% 100%, "+
                            this.jlcg_bcgnd_color_inside+" 0%, "+this.jlcg_bcgnd_color_inside+" 50%, "+
                            this.jlcg_front_color+" 50%, "+
                            this.jlcg_front_color+" 100%, "+
                            this.jlcg_bcgnd_color_outside+" 100%)");
                        }        
                }
            } else        
        if (this.jlcg_angle_or_stoppoint==="top-right") {    
            if (this.jlcg_transparent_bgnd==="true") {            
                if (this.jlcg_gradient_type!=="no-gr")
                    {
                    this.e.css("background-image", 
                        gasagcs_before +",\nradial-gradient(farthest-side at 0% 100%, "+
                        "rgba(0,255,0,0) 0%, rgba(0,255,0,0) 50%, "+
                        this.jlcg_front_color+" 100%, rgba(255,255,0,0) 100%)");
                    }
                    else 
                    if (this.jlcg_gradient_type==="no-gr")
                        {
                        this.e.css("background-image", 
                            gasagcs_before +",\nradial-gradient(farthest-side at 0% 100%, "+
                            "rgba(0,255,0,0) 0%, rgba(0,255,0,0) 50%, "+
                            this.jlcg_front_color+" 50%, "+
                            this.jlcg_front_color+" 100%, rgba(255,255,0,0) 100%)");
                        }
            }
            else 
            if (this.jlcg_transparent_bgnd==="false")
                {   
                // dla front color został wybrany jakiś gradient, tło widoczne = jednokolorowe
                if (this.jlcg_gradient_type!=="no-gr")
                    {
                    this.e.css("background-image", 
                        gasagcs_before +",\nradial-gradient(farthest-side at 0% 100%, "+
                        this.jlcg_bcgnd_color_inside+" 0%, "+this.jlcg_bcgnd_color_inside+" 50%, "+
                        this.jlcg_front_color+" 100%, "+
                        this.jlcg_bcgnd_color_outside+" 100%)");
                    }
                    else 
                    // front color = jednokolorowy, tło widoczne = jednokolorowe
                    if (this.jlcg_gradient_type==="no-gr")
                        {
                        this.e.css("background-image", 
                            gasagcs_before +",\nradial-gradient(farthest-side at 0% 100%, "+
                            this.jlcg_bcgnd_color_inside+" 0%, "+this.jlcg_bcgnd_color_inside+" 50%, "+
                            this.jlcg_front_color+" 50%, "+
                            this.jlcg_front_color+" 100%, "+
                            this.jlcg_bcgnd_color_outside+" 100%)");
                        }        
                }
            } else
        if (this.jlcg_angle_or_stoppoint==="bottom-left") {
            if (this.jlcg_transparent_bgnd==="true") {            
                if (this.jlcg_gradient_type!=="no-gr")
                    {
                    this.e.css("background-image", 
                        gasagcs_before +",\nradial-gradient(farthest-side at 100% 0%, "+
                        "rgba(0,255,0,0) 0%, rgba(0,255,0,0) 50%, "+
                        this.jlcg_front_color+" 100%, rgba(255,255,0,0) 100%)");
                    }
                    else 
                    if (this.jlcg_gradient_type==="no-gr")
                        {
                        this.e.css("background-image", 
                            gasagcs_before +",\nradial-gradient(farthest-side at 100% 0%, "+
                            "rgba(0,255,0,0) 0%, rgba(0,255,0,0) 50%, "+
                            this.jlcg_front_color+" 50%, "+
                            this.jlcg_front_color+" 100%, rgba(255,255,0,0) 100%)");
                        }
            }
            else 
            if (this.jlcg_transparent_bgnd==="false")
                {   
                // dla front color został wybrany jakiś gradient, tło widoczne = jednokolorowe
                if (this.jlcg_gradient_type!=="no-gr")
                    {
                    this.e.css("background-image", 
                        gasagcs_before +",\nradial-gradient(farthest-side at 100% 0%, "+
                        this.jlcg_bcgnd_color_inside+" 0%, "+this.jlcg_bcgnd_color_inside+" 50%, "+
                        this.jlcg_front_color+" 100%, "+
                        this.jlcg_bcgnd_color_outside+" 100%)");
                    }
                    else 
                    // front color = jednokolorowy, tło widoczne = jednokolorowe
                    if (this.jlcg_gradient_type==="no-gr")
                        {
                        this.e.css("background-image", 
                            gasagcs_before +",\nradial-gradient(farthest-side at 100% 0%, "+
                            this.jlcg_bcgnd_color_inside+" 0%, "+this.jlcg_bcgnd_color_inside+" 50%, "+
                            this.jlcg_front_color+" 50%, "+
                            this.jlcg_front_color+" 100%, "+
                            this.jlcg_bcgnd_color_outside+" 100%)");
                        }        
                }
            } else
        if (this.jlcg_angle_or_stoppoint==="bottom-right") {
            if (this.jlcg_transparent_bgnd==="true") {            
                if (this.jlcg_gradient_type!=="no-gr")
                    {
                    this.e.css("background-image", 
                        gasagcs_before +",\nradial-gradient(farthest-side at 0% 0%, "+
                        "rgba(0,255,0,0) 0%, rgba(0,255,0,0) 50%, "+
                        this.jlcg_front_color+" 100%, rgba(255,255,0,0) 100%)");
                    }
                    else 
                    if (this.jlcg_gradient_type==="no-gr")
                        {
                        this.e.css("background-image", 
                            gasagcs_before +",\nradial-gradient(farthest-side at 0% 0%, "+
                            "rgba(0,255,0,0) 0%, rgba(0,255,0,0) 50%, "+
                            this.jlcg_front_color+" 50%, "+
                            this.jlcg_front_color+" 100%, rgba(255,255,0,0) 100%)");
                        }
            }
            else 
            if (this.jlcg_transparent_bgnd==="false")
                {   
                // dla front color został wybrany jakiś gradient, tło widoczne = jednokolorowe
                if (this.jlcg_gradient_type!=="no-gr")
                    {
                    this.e.css("background-image", 
                        gasagcs_before +",\nradial-gradient(farthest-side at 0% 0%, "+
                        this.jlcg_bcgnd_color_inside+" 0%, "+this.jlcg_bcgnd_color_inside+" 50%, "+
                        this.jlcg_front_color+" 100%, "+
                        this.jlcg_bcgnd_color_outside+" 100%)");
                    }
                    else 
                    // front color = jednokolorowy, tło widoczne = jednokolorowe
                    if (this.jlcg_gradient_type==="no-gr")
                        {
                        this.e.css("background-image", 
                            gasagcs_before +",\nradial-gradient(farthest-side at 0% 0%, "+
                            this.jlcg_bcgnd_color_inside+" 0%, "+this.jlcg_bcgnd_color_inside+" 50%, "+
                            this.jlcg_front_color+" 50%, "+
                            this.jlcg_front_color+" 100%, "+
                            this.jlcg_bcgnd_color_outside+" 100%)");
                        }        
                }
        } //
    }
    
    // brzeg wewnętrzny i brzeg zewnętrzny narożnika, oraz front-color i bcgnd-color ustawione
    // przez użytkownika - programistę        
    // jlcg_bcgnd_color_inside -> od 0% do <wartość_A> <- ustawiona przez użytkownika przy
    //                      definiowaniu początku dla jlcg_front_color    
    // jlcg_front_color -> od <wartość_B> do <wartość_C> <- ustawiona przez użytkownika przy
    //                      definiowaniu końca dla jlcg_front_color
    //                      jeżeli <wartość_B> != <wartość_C> to pomiędzy nimi utworzy się gradient
    // jlcg_bcgnd_color_outside -> od <wartość_D> do 100%
    //                      <wartość_D> jest to początkowa wartość dla jlcg_bcgnd_color_outside
    //                      jeżeli <wartość_C> != <wartość_D> to pomiędzy nimi utworzy się gradient    
    var info_error = "Ta opcja jest dostępna tylko kiedy:\n"+
                     "jlcg_corner_edge_type = smooth\nLUB gdy\n"+
                     "jlcg_corner_edge_type = sharp\n\n"+
                     "Nie można stosować gdy:\n"+
                     "jlcg_gradient_type===\"no-gr\" AND jlcg_corner_edge_type===\"custom\"";
    if (this.jlcg_corner_edge_type==="custom") {
        if (this.jlcg_angle_or_stoppoint==="top-left") {            
            if (this.jlcg_transparent_bgnd==="true") {            
                if (this.jlcg_gradient_type!=="no-gr")
                    {
                    this.e.css("background-image", 
                        gasagcs_before +",\nradial-gradient(farthest-side at 100% 100%, "+
                        "rgba(0,255,0,0) 0%, rgba(0,255,0,0) "+
                        this.jlcg_front_color+", rgba(255,255,0,0) 100%)");
                        // np. jlcg_front_color = "40%, red 50%, green 75%, blue 90%";
                    }
                    else 
                    if (this.jlcg_gradient_type==="no-gr")
                        {
                        alert(info_error);
                        }
            }
            else 
            if (this.jlcg_transparent_bgnd==="false")
                {   
                // dla front color został wybrany jakiś gradient, tło widoczne = jednokolorowe
                if (this.jlcg_gradient_type!=="no-gr")
                    {
                    this.e.css("background-image", 
                        gasagcs_before +",\nradial-gradient(farthest-side at 100% 100%, "+
                        this.jlcg_bcgnd_color_inside+
                        this.jlcg_front_color+
                        this.jlcg_bcgnd_color_outside+")");
                        // np.  jlcg_bcgnd_color_inside     =   "red 0%, orange 30%, ";
                        //      jlcg_front_color            =   "yellow 40%, green 60%, ";
                        //      jlcg_bcgnd_color_outside    =   "blue 70%, purple 100%";
                    }
                    else 
                    // front color = jednokolorowy, tło widoczne = jednokolorowe
                    if (this.jlcg_gradient_type==="no-gr")
                        {
                        alert(info_error);
                        }
                }
            } else     
            // top-right = 0% 100%
            // bottom-left = 100% 0%
            // bottom-right = 0% 0%    
            
        if (this.jlcg_angle_or_stoppoint==="top-right") {            
            if (this.jlcg_transparent_bgnd==="true") {            
                if (this.jlcg_gradient_type!=="no-gr")
                    {
                    this.e.css("background-image", 
                        gasagcs_before +",\nradial-gradient(farthest-side at 0% 100%, "+
                        "rgba(0,255,0,0) 0%, rgba(0,255,0,0) "+
                        this.jlcg_front_color+", rgba(255,255,0,0) 100%)");
                        // np. jlcg_front_color = "40%, red 50%, green 75%, blue 90%";
                    }
                    else 
                    if (this.jlcg_gradient_type==="no-gr")
                        {
                        alert(info_error);
                        }
            }
            else 
            if (this.jlcg_transparent_bgnd==="false")
                {   
                // dla front color został wybrany jakiś gradient, tło widoczne = jednokolorowe
                if (this.jlcg_gradient_type!=="no-gr")
                    {
                    this.e.css("background-image", 
                        gasagcs_before +",\nradial-gradient(farthest-side at 0% 100%, "+
                        this.jlcg_bcgnd_color_inside+
                        this.jlcg_front_color+
                        this.jlcg_bcgnd_color_outside+")");
                        // np.  jlcg_bcgnd_color_inside     =   "red 0%, orange 30%, ";
                        //      jlcg_front_color            =   "yellow 40%, green 60%, ";
                        //      jlcg_bcgnd_color_outside    =   "blue 70%, purple 100%";
                    }
                    else 
                    // front color = jednokolorowy, tło widoczne = jednokolorowe
                    if (this.jlcg_gradient_type==="no-gr")
                        {
                        alert(info_error);
                        }
                }
            } else
        if (this.jlcg_angle_or_stoppoint==="bottom-left") {            
            if (this.jlcg_transparent_bgnd==="true") {            
                if (this.jlcg_gradient_type!=="no-gr")
                    {
                    this.e.css("background-image", 
                        gasagcs_before +",\nradial-gradient(farthest-side at 100% 0%, "+
                        "rgba(0,255,0,0) 0%, rgba(0,255,0,0) "+
                        this.jlcg_front_color+", rgba(255,255,0,0) 100%)");
                        // np. jlcg_front_color = "40%, red 50%, green 75%, blue 90%";
                    }
                    else 
                    if (this.jlcg_gradient_type==="no-gr")
                        {
                        alert(info_error);
                        }
            }
            else 
            if (this.jlcg_transparent_bgnd==="false")
                {   
                // dla front color został wybrany jakiś gradient, tło widoczne = jednokolorowe
                if (this.jlcg_gradient_type!=="no-gr")
                    {
                    this.e.css("background-image", 
                        gasagcs_before +",\nradial-gradient(farthest-side at 100% 0%, "+
                        this.jlcg_bcgnd_color_inside+
                        this.jlcg_front_color+
                        this.jlcg_bcgnd_color_outside+")");
                        // np.  jlcg_bcgnd_color_inside     =   "red 0%, orange 30%, ";
                        //      jlcg_front_color            =   "yellow 40%, green 60%, ";
                        //      jlcg_bcgnd_color_outside    =   "blue 70%, purple 100%";
                    }
                    else 
                    // front color = jednokolorowy, tło widoczne = jednokolorowe
                    if (this.jlcg_gradient_type==="no-gr")
                        {
                        alert(info_error);
                        }
                }
            } else
        if (this.jlcg_angle_or_stoppoint==="bottom-right") {            
            if (this.jlcg_transparent_bgnd==="true") {            
                if (this.jlcg_gradient_type!=="no-gr")
                    {
                    this.e.css("background-image", 
                        gasagcs_before +",\nradial-gradient(farthest-side at 0% 0%, "+
                        "rgba(0,255,0,0) 0%, rgba(0,255,0,0) "+
                        this.jlcg_front_color+", rgba(255,255,0,0) 100%)");
                        // np. jlcg_front_color = "40%, red 50%, green 75%, blue 90%";
                    }
                    else 
                    if (this.jlcg_gradient_type==="no-gr")
                        {
                        alert(info_error);
                        }
            }
            else 
            if (this.jlcg_transparent_bgnd==="false")
                {   
                // dla front color został wybrany jakiś gradient, tło widoczne = jednokolorowe
                if (this.jlcg_gradient_type!=="no-gr")
                    {
                    this.e.css("background-image", 
                        gasagcs_before +",\nradial-gradient(farthest-side at 0% 0%, "+
                        this.jlcg_bcgnd_color_inside+
                        this.jlcg_front_color+
                        this.jlcg_bcgnd_color_outside+")");
                        // np.  jlcg_bcgnd_color_inside     =   "red 0%, orange 30%, ";
                        //      jlcg_front_color            =   "yellow 40%, green 60%, ";
                        //      jlcg_bcgnd_color_outside    =   "blue 70%, purple 100%";
                    }
                    else 
                    // front color = jednokolorowy, tło widoczne = jednokolorowe
                    if (this.jlcg_gradient_type==="no-gr")
                        {
                        alert(info_error);
                        }
                }
        }
    }

    // czy prostokąt ma być powielony (po osi x lub po osi y)?
    this.e.css("background-repeat", repeat_before +",\n"+this.jlcg_repeat);
    
    // czyszczenie niepotrzebnych danych z cache        
    delete pos_00_xy_before;
    delete width_height_before;
    delete gasagcs_before;
    delete repeat_before;
        
    return this;
    }
};
//--------------------------------------------------------------------------------------------------------------------
// JLCG GRAPHICS - END
//--------------------------------------------------------------------------------------------------------------------