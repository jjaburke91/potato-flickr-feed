flickrApp.filter('trustAsHtml', function($sce){
    return function(input){
        return $sce.trustAsHtml(input);
    }
});

flickrApp.filter('removeHtmlElementsByIndex', function() {
    /**
     * This is used to workaround the flickr description including author name and image. See end of file for indented sample content.
     * Made conditions flexible for sake and example of re-usability.
     **
     * input = text input to be have DOM elements removed from.
     * htmlElement = HTML tag to be checked for and have preceding text removed e.g. <p>, <div>, <ul>, <li>...
     * numberToRemove = number of occurrences of -htmlElement- to strip from.
     *
     */
    return function(input, htmlElement, numberToRemove) {

        // Changing htmlElement to the closing tag of the given element
        htmlElement = htmlElement.slice( 0, htmlElement.indexOf('<')+1)
                        + "/"
                        + htmlElement.slice(htmlElement.indexOf('<')+1, htmlElement.length);

        var htmlElementIndex = 0;

        for (var elementCounter = 0 ; elementCounter < numberToRemove && htmlElementIndex != -1; elementCounter++ ) {
            htmlElementIndex = input.indexOf(htmlElement);
            if (htmlElementIndex != -1) {
                input = input.slice(htmlElementIndex + htmlElement.length);
            }
        }

        return input;
    }
});



/* Sample description from flickr photo:

 <p>
     <a href="https://www.flickr.com/people/127275457@N05/">losespejoscocinagourmet
     </a>
     posted a photo:
 </p>
 <p>
     <a
     href="https://www.flickr.com/photos/127275457@N05/20301564158/" title="Mini Hamburguesa y Papa al Horno"><img
     src="https://farm1.staticflickr.com/543/20301564158_4bb5ef4530_m.jpg" width="240" height="240"
     alt="Mini Hamburguesa y Papa al Horno"/>
     </a>
 </p>
 <p> Mini Hamburguesa con Queso Americano, Tocino, Aderezo de
     Mostaza, Mix de Lechugas, Tomate, Aguacate y Pepinillos, acompañada de Papa al Horno con Mantequilla, Crema y
     Tocino.
     <br/> #LosEspejos pedidos 83367064
 </p>

 */