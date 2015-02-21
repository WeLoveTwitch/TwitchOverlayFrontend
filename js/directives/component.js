TwitchOverlay.directive('component', [function() {
    return {
        restrict: 'E',
        scope: {
            componentData: '='
        },
        replace: true,
        templateUrl: paths.templates + 'directives/component.html',
        link: function($scope, elem, attrs) {
            var component = new TwitchOverlayComponent();
            component.init($scope, elem);
        }
    }
}]);