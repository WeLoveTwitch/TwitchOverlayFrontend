function TwitchOverlayComponent($compile) {
    this._compile = $compile;
}

var proto = TwitchOverlayComponent.prototype;

proto.init = function (scope, elem) {
    console.debug('TwitchOverlayComponent::init', scope, elem);
    var that = this;
    this.data = scope.componentData;

    scope.$on(this._getEventName('setEditMode'), function (data) {
        console.debug('TwitchOverlayComponent::init', that.data.name, 'entering editMode');
        elem.addClass('edit-mode');
    });

    scope.$watch('componentData.settings', refreshStyles, true);

    function refreshStyles(newStyles, oldStyles) {
        console.debug('TwitchOverlayComponent::init::refresh', newStyles, oldStyles);
        for (var key in newStyles) {
            if (key != 'text' && newStyles.hasOwnProperty(key)) {
                var value = newStyles[key];

                elem.css(key, isNumber(value) ? +value : value);
            }
        }
    }

    function isNumber(value) {
        return !isNaN(parseFloat(value)) && isFinite(value);
    }

    var element = this._compile(this.template)(scope);
    elem.html(element);
};

proto._getEventName = function (eventName) {
    return this.data.name + ':' + eventName + ':' + this.data._id;
};

module.exports = TwitchOverlayComponent;
