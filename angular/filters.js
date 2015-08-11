flickrApp.filter('trustAsHtml', function($sce){
    return function(input){
        return $sce.trustAsHtml(input);
    }
});

flickrApp.filter('stripRedundantContent', function() {
    // Following filter returns the index of the end of the second <p> tag in the input.
    // This is used to workaround the flickr description including author name and image. See end of file for indented sample content.
    return function(input) {
        var searchString = "</p>";
        var secondPTagClose = input.indexOf(searchString, input.indexOf(searchString)+searchString.length );
        return input.slice(secondPTagClose);
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