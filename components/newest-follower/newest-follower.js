TwitchOverlay.directive('newestFollower', ['Socket', 'Tick', function(Socket, Tick) {
    return {
        restrict: 'E',
        scope: {
            componentData: '='
        },
        replace: true,
        templateUrl: paths.components + 'newest-follower/newest-follower.html',
        link: function($scope, elem, attrs) {
            var component = new TwitchOverlayComponent();
            //
            //component.register('update', function(newestFollower) {
            //    $scope.newestFollower = newestFollower;
            //});
            //
            //component.init('newestFollower', elem);
            //component.get('update');

            component.init($scope, elem);
        }
    }
}]);