TwitchOverlay.directive('followerAlert', ['Socket', 'Tick', function(Socket, Tick) {
    return {
        restrict: 'E',
        replace: true,
        scope: {},
        templateUrl: paths.components + 'follower-alert/follower-alert.html',
        link: function($scope, elem, attrs) {
            var component = new TwitchOverlayComponent(Socket);

            // queued followers
            var queue = [];

            // timestamp of when the last alert started
            var followerAlertStarted = 0;

            // configurable time in ms
            var showAlertFor = 3000;

            component.register('update', function(newFollower) {
                // new follower alert
                queue.push(newFollower);
            });

            component.init('followerAlert', elem);

            /**
             * follower alerts are visible for `showAlertFor` ms.
             * They will be queued so every new follower gets its screen time.
             */
            Tick.register(function() {
                var now = new Date().getTime();
                if(!$scope.showAlert) {
                    if(queue.length === 0) {
                        return;
                    }
                    var user = queue.shift();
                    followerAlertStarted = now;
                    $scope.user = user;
                    $scope.showAlert = true;
                    return;
                }

                // theres still some time left to display the alert
                if(followerAlertStarted + showAlertFor > now) {
                    return;
                }

                // hide the follower alert
                $scope.showAlert = false;
            });
        }
    }
}]);