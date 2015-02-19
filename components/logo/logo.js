TwitchOverlay.directive('logo', ['Socket', function(Socket) {
    return {
        restrict: 'E',
        scope: {},
        replace: true,
        templateUrl: paths.components + 'logo/logo.html',
        link: function($scope, elem, attrs) {
            var component = new TwitchOverlayComponent(Socket);

            component.init('logo', elem);
        }
    }
}]);