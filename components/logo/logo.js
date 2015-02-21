TwitchOverlay.directive('logo', ['Socket', function(Socket) {
    return {
        restrict: 'E',
        scope: {
            componentData: '='
        },
        replace: true,
        templateUrl: paths.components + 'logo/logo.html',
        link: function($scope, elem, attrs) {
            var component = new TwitchOverlayComponent();
            component.init($scope, elem);
        }
    }
}]);