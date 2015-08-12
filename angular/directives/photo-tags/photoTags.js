flickrApp.directive('photoTags', function() {
    return {
        restrict: 'E',
        scope: {
            tags: '=tags'
        },
        templateUrl: 'angular/directives/photo-tags/photo-tags.html',
        controller: 'photo-tags-controller'
    }
});

flickrApp.controller('photo-tags-controller', ['$scope',  function($scope) {

    if ($scope.tags != undefined) {
        $scope.tagArray = $scope.tags.split(" ");
    }

}]);
