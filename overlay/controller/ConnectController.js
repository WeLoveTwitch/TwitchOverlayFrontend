TwitchOverlay.controller('ConnectController', ['$scope', '$rootScope', 'Socket', '$state', '$stateParams', function($scope, $rootScope, Socket, $state, $stateParams) {

  // add system tray icon
  // hide window by position it somewhere where the user doesn't see it
  // add hide and show option to system tray icon

  $rootScope.remote.host = $stateParams.host || $rootScope.remote.host;
  $rootScope.remote.port = $stateParams.port || $rootScope.remote.port;

  $scope.connect = function(host, port) {
    Socket.connect(host, port, function() {
      $state.go('overlay');
    });
  };

  $scope.connect($scope.remote.host, $scope.remote.port);

  if (Socket.isConnected()) {
    setTimeout(function() {
      $state.go('overlay');
    }, 1000);
  }

  setInterval(function() {
    $scope.connect($scope.remote.host, $scope.remote.port);
  }, 5000);

}]);
