flickrApp.controller('photo-page-controller', ['$scope', '$state', 'flickr', function($scope, $state, flickr) {
    $scope.photoData = flickr.getSelectedPhoto() ;

    if ($scope.photoData === null) {
        $state.go("flickr.listing");
    } else {
        $scope.photoData.tagArray = $scope.photoData.tags.split(" ");
        console.log($scope.photoData.tagArray);
    }

}]);