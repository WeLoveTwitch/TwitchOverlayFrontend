TwitchOverlay.service('Socket', ['$rootScope', 'Tick', 'Emote', 'ComponentsService', function($rootScope, Tick, Emote, ComponentsService) {

  var socketConnected = false;
  var socket;
  var wait = false;

  $rootScope.remote = {
    host: 'localhost',
    port: '1337'
  };

  function loadSocketIO(host, port, cb) {
    // Check if already connected or trying to connect.
    if (socketConnected || wait === true) {
      return false;
    }

    // Set a flag to say we're busy/trying to connect.
    wait = true;

    // Fetch the socket script
    var promise = jQuery.getScript('http://' + host + ':' + port + '/socket.io/socket.io.js');

    // Got the script, let's continue.
    promise.done(function(script) {
      // The root of all evil :D
      (function() {
        eval(script)
      }).call(window);

      // Connect and initiate the callback
      initializeSocket(host, port);
      cb();

      // Done, reset the flag.
      wait = false;
    });

    // Unable to retrieve the script, get REKT.
    promise.fail(function() {
      console.error('Error! Failed to load socket.io.');
    });
  }

  function initializeSocket(host, port) {
    socket = io('http://' + host + ':' + port);
    socketConnected = true;

    $rootScope.remote.host = host;
    $rootScope.remote.port = port;

    bindEvents();

    apply();
  }

  function apply() {
    if (!$rootScope.$$phase) {
      $rootScope.$apply();
    }
  }

  // If socket.io is already in place, connect.
  if (typeof io !== 'undefined') {
    initializeSocket('127.0.0.1', 1337);
  }

  function bindEvents() {
    socket.on('componentUpdate', function(eventTag, data) {
      var eventParts = eventTag.split(':');
      var componentName = eventParts[0];
      var eventName = eventParts[1];
      var componentId = eventParts[2];

      console.debug('SocketService::bindEvents - on(\'componentUpdate\')', eventName, data);
      ComponentsService.update(componentName, eventName, componentId, data);
      apply();
    });

    socket.on('components', function(components) {
      console.debug('SocketService::bindEvents - on(\'components\')', components);
      ComponentsService.fill(components);
    });

    socket.on('newComponent', function(newComponent) {
      console.debug('SocketService::bindEvents - on(\'newComponent\')', newComponent);
      ComponentsService.add(newComponent);
    });


    socket.on('triggerFrontendEvent', function(eventName, data) {
      console.debug('SocketService::bindEvents - on(\'triggerFrontendEvent\')', eventName, data);
      $rootScope.$broadcast(eventName, data);
    });

    socket.on('emotes', function(emotesFromServer) {
      console.debug('SocketService::bindEvents - on(\'emotes\')');
      Emote.set(emotesFromServer);
    });
  }

  return {
    isConnected: function() {
      console.debug('SocketService::isConnected', socketConnected);
      return socketConnected;
    },
    connect: function(host, port, cb) {
      if (socketConnected || wait === true) {
        return false;
      }

      console.debug('SocketService::connect', host, port, cb);
      loadSocketIO(host, port, cb);
    }
  }
}]);
