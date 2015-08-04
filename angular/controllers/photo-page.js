flickrApp.controller('photo-page-controller', ['$scope', '$state', 'flickr', 'feed', function($scope, $state, flickr) {
    $scope.photoData = flickr.getSelectedPhoto() ;

    if ($scope.photoData === null) {
        $state.go("flickr.listing");
    }


}]);