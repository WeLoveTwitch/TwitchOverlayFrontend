TwitchOverlay.controller('OverlayController', ['$scope', '$state', 'Socket', function ($scope, $state, Socket) {

    Socket.on('update', function(data) {
        $scope.loaded = true;
        $scope.data = data;
    });

    if(!Socket.isConnected()) {
        $state.go('connect');
    }

    if(typeof require !== 'undefined') {
        var gui = require('nw.gui');
        var win = gui.Window.get();

        $scope.showDevTools = function() {
            win.showDevTools();
        };
    }
}]);
