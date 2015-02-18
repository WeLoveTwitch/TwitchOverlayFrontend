(function (window) {

    function TwitchOverlayComponent(Socket) {
        this._socket = Socket;
        this._name = null;
        this._events = [];
        this._callbacks = {};
    }

    var proto = TwitchOverlayComponent.prototype;

    proto.init = function(name) {

        this._name = name;

        // bind events
        this._events.forEach(function(eventName) {
            this._socket.on(this._getEventName(eventName), this._call.bind(this, eventName));
        }.bind(this));

        this._socket.emit(this._getEventName('connected'))
    };

    proto._getEventName = function(eventName) {
        return this._name + ':' + eventName;
    };

    proto.register = function(name, callback) {
        this._events.push(name);
        this._callbacks[name] = callback;
    };

    proto.get = function(eventName) {
        this._socket.emit(this._getEventName(eventName));
    };

    proto._call = function() {
        var args = Array.prototype.slice.call(arguments);
        var eventName = args.shift();

        if(typeof this._callbacks[eventName] !== 'undefined') {
            this._callbacks[eventName].apply(this, args);
        }
    };

    window.TwitchOverlayComponent = TwitchOverlayComponent;

})(window);
