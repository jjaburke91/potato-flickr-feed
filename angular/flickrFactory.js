flickrApp.service('flickr', ['$http', function($http) {
    // Return promise so that on initial controller load, view will be automatically updated on it's resolve.
    return {
        getFeed : function() {
            return $http.jsonp(flickrAppObjects.flickrBaseUrl);
        }
    };
}]);
