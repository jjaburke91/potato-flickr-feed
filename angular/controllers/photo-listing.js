flickrApp.controller('photo-listing-controller', ['$scope', 'flickr', 'feed', function($scope, flickr, feed) {
    $scope.pageTitle = "Photo Listing";
    $scope.feed = feed;

    $scope.refreshFeed = function() {
        $scope.feed = flickr.getAndRefreshFeed();
    };

}]);
