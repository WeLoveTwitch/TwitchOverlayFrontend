TwitchOverlay.directive('logo', [function() {
    return {
        restrict: 'E',
        scope: {},
        templateUrl: paths.components + 'logo/logo.html',
        link: function($scope, elem, attrs) {

        }
    }
}]);