TwitchOverlay.directive('chat', ['Socket', function(Socket) {
    return {
        restrict: 'E',
        scope: {
            chatData: '='
        },
        replace: true,
        templateUrl: paths.components + 'chat/chat.html',
        link: function($scope, elem, attrs) {

            $scope.lines = [];

            var component = new TwitchOverlayComponent(Socket);

            component.register('message', function(message) {
                $scope.lines.push(message);
            });

            component.init('chat');

            var _maxHeight = 331;

            $scope.showChatFrame = function() {
                if($scope.lines.length === 0) return false;
                var visibleLines = $scope.lines.filter(function(line) {
                    return $scope.showLine(line.ts);
                });
                return visibleLines.length > 0;
            };

            $scope.showLine = function(ts) {
                // only show lines if they are not older than 10 minutes
                return ts > +new Date().getTime() - 1000 * 60 * 10;
            };

            window.setInterval(function() {
                var markup = elem.find('.line-container');

                if (markup.height() < _maxHeight) {
                    elem.height(markup.height() + 6);
                } else {
                    elem.height(_maxHeight);
                }
            }, 100);
        }
    }
}]);
