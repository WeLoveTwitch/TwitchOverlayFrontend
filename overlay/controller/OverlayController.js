TwitchOverlay.controller('OverlayController', ['$scope', '$state', 'Socket', 'Components', function($scope, $state, Socket, Components) {

    if (!Socket.isConnected()) {
        $state.go('connect');
    }

    if (typeof require !== 'undefined') {
        var gui = require('nw.gui');
        var win = gui.Window.get();

        $scope.showDevTools = function() {
            win.showDevTools();
        };
    }

    $scope.getComponents = function() {
        return Components.get();
    };
}]);
