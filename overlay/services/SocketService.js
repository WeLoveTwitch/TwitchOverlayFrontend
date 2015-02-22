TwitchOverlay.service('Socket', ['$rootScope', 'Tick', 'Emote', 'Components', function ($rootScope, Tick, Emote, Components) {

    var socketConnected = false;
    var socket;
    var wait = false;

    function loadSocketIO(host, port, cb) {
        if(socketConnected || wait === true) {
            return false;
        }
        wait = true;
        var promise = jQuery.getScript('http://' + host + ':' + port + '/socket.io/socket.io.js');
        promise.done(function (script) {

            // evil :D
            (function () {
                eval(script);
            }).call(window);

            initializeSocket(host, port);
			cb();
            wait = false;
        });
        promise.fail(function () {
            console.log('Failed to load socket.io');
        });
    }

    function initializeSocket(host, port) {
        socket = io('http://' + host + ':' + port);
        socketConnected = true;

        bindEvents();
    }

    function apply() {
        if (!$rootScope.$$phase) {
            $rootScope.$apply();
        }
    }

    // if socketio is already in place we just connect
    if (typeof io !== 'undefined') {
        initializeSocket('127.0.0.1', 1337);
    }

    function bindEvents() {
        socket.on('componentUpdate', function(eventName, data) {
            var eventNameParts = eventName.split(':');
            var componentName = eventNameParts[0];
            var eventName = eventNameParts[1];
            var componentId = eventNameParts[2];

            Components.update(componentName, eventName, componentId, data);
            apply();
        });

        socket.on('components', function(components) {
            console.log(components);
            Components.fill(components);
        });

        socket.on('newComponent', function(newComponent) {
            Components.add(newComponent);
        });

        socket.on('triggerFrontendEvent', function(eventName, data) {
            console.log(arguments);
            $rootScope.$broadcast(eventName, data);
        });

        socket.on('emotes', function(emotesFromServer) {
            Emote.set(emotesFromServer);
        });
    }

    return {
        isConnected: function() {
            return socketConnected;
        },
        connect: function(host, port, cb) {
            loadSocketIO(host, port, cb);
        }
    }
}]);