flickrApp.service('flickr', ['$http', function($http) {
    // Caching feed here so a request isn't sent to Flickr every time the photo-listing is loaded.
    var flickrFeed = null;

    var requestFlickrFeed = function() {
        return $http.jsonp(flickrAppObjects.flickrBaseUrl).then(
            function success(response) {
                return response.data.items;
            },
            function error() {
                console.error("flickr: Error retrieving flickr feed.");
            }
        );
    }

    return {
        getFeed : function() {
            if (flickrFeed === null) {
                console.info("flickr: Retrieving fresh feed.")
                flickrFeed = requestFlickrFeed();
                return flickrFeed;
            } else {
                console.info("flickr: Using cached feed.");
                return flickrFeed;
            }
        },
        getAndRefreshFeed: function() {
            flickrFeed = requestFlickrFeed();
            return flickrFeed;
        }
    };
}]);
