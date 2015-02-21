function TwitchOverlayComponent($compile) {
    this._compile = $compile;
}

var proto = TwitchOverlayComponent.prototype;

proto.init = function($scope, elem) {

    var that = this;
    this.data = $scope.componentData;

    console.log(this._getEventName('setEditMode'));

    $scope.$on(this._getEventName('setEditMode'), function(data) {
        console.log(that.data.name, 'entering editMode');
        elem.addClass('edit-mode');
    });

    var element = this._compile(this.template)($scope);
    console.log(element);
    elem.html(element);
};

proto._getEventName = function(eventName) {
    return this.data.name + ':' + eventName + ':' + this.data._id;
};

module.exports = TwitchOverlayComponent;