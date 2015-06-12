var flickrAppObjects = {}; // Object to contain global vars.
flickrAppObjects.flickrBaseUrl = 'https://api.flickr.com/services/feeds/photos_public.gne?tags=potato&tagmode=all&format=json&jsoncallback=JSON_CALLBACK';

var flickrApp = angular.module('flickr-app', ['ngRoute']);

flickrApp.config( ['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: '/angular/views/photo-listing.html',
            controller: 'photo-listing-controller',
            resolve: {
                feed: function (flickr) {
                    return flickr.getFeed();
                }
            }
        })
        .when('/error', {
            templateUrl: '/angular/views/error.html'
        })
        .otherwise({
            redirectTo: '/error'
        });
}]);
