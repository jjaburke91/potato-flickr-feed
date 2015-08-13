var flickrAppObjects = {}; // Object to contain global vars. In a larger project, a service or factory could be used to provide global vars within Angular.
flickrAppObjects.flickrBaseUrl = 'https://api.flickr.com/services/feeds/photos_public.gne?tags=potato&tagmode=all&format=json&jsoncallback=JSON_CALLBACK';

var flickrApp = angular.module('flickr-app', ['ui.router']);


flickrApp.config( ['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when("/", "/flickr/listing");
    $urlRouterProvider.otherwise("/flickr/listing");

    $stateProvider
        .state('flickr', {
            abstract: true,
            url: "/flickr",
            templateUrl: '/angular/flickr.html'
        })
        .state('flickr.listing', {
            url: "/listing",
            templateUrl: "/angular/photo-listing/photo-listing.html",
            controller: "photo-listing-controller",
            resolve: {
                feed: function (flickr) {
                    return flickr.getFeed();
                }
            }
        })
        .state('flickr.photo', {
            url: "/photo-viewer",
            templateUrl: "/angular/photo-page/photo-page.html",
            controller: "photo-page-controller"
        });

}]);;/**
 * Allows HTML data to be used within views.
 */
flickrApp.filter('trustAsHtml', function($sce){
    return function(input){
        return $sce.trustAsHtml(input);
    }
});

flickrApp.filter('removeHtmlElementsByIndex', function() {
    /**
     * Filter will search until the end of the nth occurrence of an HTML tag, and remove all preceding content.
     *
     * This is used to workaround the flickr description including author name and image. See end of file for sample content.
     * Made conditions flexible for sake and example of re-usability.
     **
     * input = text input to be have DOM elements removed from.
     * htmlElement = HTML tag to be checked for and have preceding text removed e.g. '<p>', '<div>', '<ul>', '<li>'...
     * numberToRemove = number of occurrences of -htmlElement- to strip from.
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

 */;flickrApp.service('flickr', ['$http', function($http) {
    // Caching feed here so a request isn't sent to Flickr every time the photo-listing is loaded.
    var flickrFeed = null;
    var selectedPhoto = null;

    var requestFlickrFeed = function() {
        console.info("flickr: Retrieving from URL " + flickrAppObjects.flickrBaseUrl + ".");
        return $http.jsonp(flickrAppObjects.flickrBaseUrl).then(
            function success(response) {
                return response.data.items;
            },
            function error() {
                console.error("flickr: Error retrieving flickr feed.");
            }
        );
    };  

    return {
        getFeed : function() {
            if (flickrFeed === null) {
                flickrFeed = requestFlickrFeed();
                return flickrFeed;
            } else {
                console.info("flickr: Using cached feed.");
                return flickrFeed;
            }
        },
        getSelectedPhoto : function() {
            return selectedPhoto;
        },
        setSelectedPhoto : function(photo) {
            selectedPhoto = photo;
        }

    };
}]);
;flickrApp.directive('photoListingItem', function() {
    return {
        restrict: 'E',
        scope: {
            post: '=post'
        },
        templateUrl: 'angular/directives/photo-listing-item/photo-listing-item.html',
        controller: 'photo-listing-item-controller'
    }
});

flickrApp.controller('photo-listing-item-controller', ['$scope', '$state', 'flickr', function($scope, $state, flickr) {
    $scope.viewImage = function(photoObject) {
        flickr.setSelectedPhoto(photoObject);
        $state.go("flickr.photo");
    }

}]);
;flickrApp.directive('photoTags', function() {
    return {
        restrict: 'E',
        scope: {
            tags: '=tags'
        },
        templateUrl: 'angular/directives/photo-tags/photo-tags.html',
        controller: 'photo-tags-controller'
    }
});

flickrApp.controller('photo-tags-controller', ['$scope',  function($scope) {

    if ($scope.tags != undefined) {
        $scope.tagArray = $scope.tags.split(" ");
    }

}]);
;flickrApp.controller('photo-listing-controller', ['$scope', 'feed', function($scope, feed) {
    $scope.feed = feed;
}]);
;flickrApp.controller('photo-page-controller', ['$scope', '$state', 'flickr', function($scope, $state, flickr) {
    $scope.photoData = flickr.getSelectedPhoto() ;

    if ($scope.photoData === null) {
        $state.go("flickr.listing");
    } else {
        $scope.photoData.tagArray = $scope.photoData.tags.split(" ");
    }

}]);