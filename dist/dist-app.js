var flickrAppObjects = {}; // Object to contain global vars.
flickrAppObjects.flickrBaseUrl = 'https://api.flickr.com/services/feeds/photos_public.gne?tags=potato&tagmode=all&format=json&jsoncallback=JSON_CALLBACK';

var flickrApp = angular.module('flickr-app', ['ngRoute']);

flickrApp.config( ['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: '/angular/views/photo-listing.html',
            controller: 'photo-listing-controller'
        })
        .when('/error', {
            templateUrl: '/angular/views/error.html'
        })
        .otherwise({
            redirectTo: '/error'
        });
}]);
;flickrApp.service('flickr', ['$http', function($http) {
    // Return promise so that on initial controller load, view will be automatically updated on it's resolve.
    return {
        getFeed : function() {
            return $http.jsonp(flickrAppObjects.flickrBaseUrl);
        }
    };
}]);
;flickrApp.controller('photo-listing-controller', ['$scope', 'flickr', function($scope, flickr) {
    $scope.pageTitle = "Photo Listing";

    flickr.getFeed()
        .success( function(response) {
            $scope.feed = response.items;
            console.info($scope.feed);
        })
        .error( function() {
            console.error("photo-listing-controller: Error retrieving feed.");
        });

}]);
;