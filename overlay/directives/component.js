TwitchOverlay.directive('component', ['$compile', function($compile) {
    return {
        restrict: 'E',
        scope: {
            componentData: '='
        },
        replace: true,
        templateUrl: paths.templates + 'directives/component.html',
        link: function($scope, elem, attrs) {
            var component = componentFactory.create($scope.componentData.name, $compile);
            if(!component) return;
            component.init($scope, elem);
        }
    }
}]);