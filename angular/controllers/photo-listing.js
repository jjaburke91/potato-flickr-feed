flickrApp.controller('photo-listing-controller', ['$scope', 'flickr', function($scope, flickr) {
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
