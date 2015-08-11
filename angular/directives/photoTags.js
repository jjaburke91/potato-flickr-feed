flickrApp.directive('photoTags', function() {
    return {
        restrict: 'E',
        scope: {
            tags: '=tags'
        },
        templateUrl: 'angular/directives/views/photo-tags.html',
        controller: 'photo-tags-controller'
    }
});

flickrApp.controller('photo-tags-controller', ['$scope',  function($scope) {

    /* Error handling on no tags input */

    $scope.tagArray = $scope.tags.split(" ");
}]);