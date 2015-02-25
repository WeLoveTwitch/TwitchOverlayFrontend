var debug = false;

if (!debug) {
    console.debug = function() {};
}

var TwitchOverlay = angular.module('TwitchOverlay', ['ui.router']);

TwitchOverlay.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

    'use strict';

    $urlRouterProvider.otherwise('/connect');

    $stateProvider
        .state('overlay', {
            url: '/overlay',
            templateUrl: 'templates/overlay.html',
            controller: 'OverlayController'
        })
        .state('connectDirect', {
            url: '/connect/:host/:port',
            templateUrl: 'templates/connect.html',
            controller: 'ConnectController'
        })
        .state('connect', {
            url: '/connect',
            templateUrl: 'templates/connect.html',
            controller: 'ConnectController'
        })
}]);

TwitchOverlay.run(['$rootScope', 'Tick',function($rootScope, Tick) {

}]);
