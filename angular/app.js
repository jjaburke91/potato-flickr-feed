var flickrAppObjects = {}; // Object to contain global vars.
flickrAppObjects.flickrBaseUrl = 'https://api.flickr.com/services/feeds/photos_public.gne?tags=potato&tagmode=all&format=json&jsoncallback=JSON_CALLBACK';

var flickrApp = angular.module('flickr-app', ['ui.router']);



flickrApp.config( ['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when("", "/flickr/listing");
    $urlRouterProvider.when("/", "/flickr/listing");
    $urlRouterProvider.when("/flickr", "/flickr/listing");
    //$urlRouterProvider.when("/error", { templateUrl: '/angular/views/error.html' });
    //$urlRouterProvider.otherwise( { redirectTo: "/error"});

    $stateProvider
        .state('flickr', {
            abstract: true,
            url: "/flickr",
            templateUrl: '/angular/flickr.html',
            resolve: {
                feed: function (flickr) {
                    return flickr.getFeed();
                }
            }
        })
        .state('flickr.listing', {
            url: "/listing",
            templateUrl: "/angular/views/photo-listing.html",
            controller: "photo-listing-controller"
        })
        .state('flickr.photo', {
            url: "/photo-viewer",
            templateUrl: "/angular/views/photo-page.html",
            controller: "photo-page-controller"
        });

}]);


/** TODOs:

 * Safe URL routing (if we're routing on URL at all)
 * Restructure Angular files
 * Make the routerProvider catchers safer and less explicit
 * Initialise flickr feed in well defined map? Means IDs can be used...
 * Create Directive for photo listing
 *
**/