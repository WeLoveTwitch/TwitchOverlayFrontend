TwitchOverlay.directive('newestFollower', ['Socket', 'Tick', function(Socket, Tick) {
    return {
        restrict: 'E',
        scope: {},
        replace: true,
        templateUrl: paths.components + 'newest-follower/newest-follower.html',
        link: function($scope, elem, attrs) {
            var component = new TwitchOverlayComponent(Socket);

            component.register('update', function(newestFollower) {
                $scope.newestFollower = newestFollower;
            });

            component.init('newestFollower', elem);
            component.get('update');
        }
    }
}]);