var flickrAppObjects = {}; // Object to contain global vars. In a larger project, a service or factory could be used to provide global vars within Angular.
flickrAppObjects.flickrBaseUrl = 'https://api.flickr.com/services/feeds/photos_public.gne?tags=potato&tagmode=all&format=json&jsoncallback=JSON_CALLBACK';

var flickrApp = angular.module('flickr-app', ['ui.router']);


flickrApp.config( ['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when("/", "/flickr/listing");
    $urlRouterProvider.otherwise("/"); // '/listing' is the only loadable route.

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

}]);