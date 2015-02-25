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

    scope.$watch('componentData.settings', function (newSettings, oldSettings) {
        console.debug('TwitchOverlayComponent::init - $watch', newSettings, oldSettings);
        for (var key in newSettings) {
            if (newSettings.hasOwnProperty(key)) {
                if (key != 'text') {
                    elem.css(key, newSettings[key]);
                }
            }
        }
    }, true);

    var element = this._compile(this.template)(scope);
    elem.html(element);
};

proto._getEventName = function (eventName) {
    return this.data.name + ':' + eventName + ':' + this.data._id;
};

module.exports = TwitchOverlayComponent;
