flickrApp.directive('photoListingItem', function() {
    return {
        restrict: 'E',
        scope: {
            post: '=post'
        },
        templateUrl: 'angular/directives/photo-listing-item/photo-listing-item.html',
        controller: 'photo-listing-item-controller'
    }
});

flickrApp.controller('photo-listing-item-controller', ['$scope', '$state', 'flickr', function($scope, $state, flickr) {
    $scope.viewImage = function(photoObject) {
        flickr.setSelectedPhoto(photoObject);
        $state.go("flickr.photo");
    }

}]);
