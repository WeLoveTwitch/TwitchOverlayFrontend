TwitchOverlay.directive('component', ['$compile', function($compile) {
    return {
        restrict: 'E',
        scope: {
            componentData: '='
        },
        replace: true,
        templateUrl: paths.templates + 'directives/component.html',
        link: function(scope, element, attrs) {
            console.debug('TwitchOverlay::directive:component', scope.componentData);
            var component = componentFactory.create(scope.componentData.name, $compile);

            if(!component) return false;

            component.init(scope, element);
        }
    }
}]);
