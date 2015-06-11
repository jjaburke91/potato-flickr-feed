var flickr_app = angular.module('flickr-app', ['ngRoute']);

flickr_app.config( ['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: '/angular/views/photo-listing.html',
            controller: 'photo-listing-controller'
        })
}]);
