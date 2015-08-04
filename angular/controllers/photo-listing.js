flickrApp.controller('photo-listing-controller', ['$scope', '$state', 'flickr', 'feed', function($scope, $state, flickr, feed) {
    $scope.pageTitle = "Photo Listing";
    $scope.feed = feed;

    $scope.viewImage = function(photoObject) {
        flickr.setSelectedPhoto(photoObject);
        $state.go("flickr.photo");
    }

}]);
