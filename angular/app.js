var flickrAppObjects = {}; // Object to contain global vars.
flickrAppObjects.flickrBaseUrl = 'https://api.flickr.com/services/feeds/photos_public.gne?tags=potato&tagmode=all&format=json&jsoncallback=JSON_CALLBACK';

var flickrApp = angular.module('flickr-app', ['ui.router']);



flickrApp.config( ['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when("", "/flickr/listing");
    $urlRouterProvider.when("/", "/flickr/listing");
    $urlRouterProvider.when("/flickr", "/flickr/listing");
    // Better way to catch bad URLs?

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
            templateUrl: "/angular/photo-listing/photo-listing.html",
            controller: "photo-listing-controller"
        })
        .state('flickr.photo', {
            url: "/photo-viewer",
            templateUrl: "/angular/photo-page/photo-page.html",
            controller: "photo-page-controller"
        });

}]);