TwitchOverlay.directive('followers', ['Socket', 'Tick', function(Socket, Tick) {
    return {
        restrict: 'E',
        replace: true,
        scope: {},
        templateUrl: paths.components + 'followers/followers.html',
        link: function($scope, elem, attrs) {
            var component = new TwitchOverlayComponent(Socket);

            $scope.followerCurrent = 0;
            $scope.followerTarget = 0;

            component.register('countUpdate', function(count) {
                $scope.followerCurrent = count;
            });

            component.register('newFollowerTarget', function(count) {
                $scope.followerTarget = count;
            });

            component.init('followers', elem);
            component.get('countUpdate');
            component.get('newFollowerTarget');
        }
    }
}]);