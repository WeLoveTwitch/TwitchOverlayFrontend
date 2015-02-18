TwitchOverlay.directive('newestFollower', ['Socket', 'Tick', function(Socket, Tick) {
    return {
        restrict: 'E',
        scope: {},
        templateUrl: paths.components + 'newest-follower/newest-follower.html',
        link: function($scope, elem, attrs) {
            var component = new TwitchOverlayComponent(Socket);

            component.register('update', function(newestFollower) {
                $scope.newestFollower = newestFollower;
            });

            component.init('newestFollower');
            component.get('update');
        }
    }
}]);