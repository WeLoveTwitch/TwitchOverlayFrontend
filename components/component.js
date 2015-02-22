function TwitchOverlayComponent($compile) {
    this._compile = $compile;
}

var proto = TwitchOverlayComponent.prototype;

proto.init = function($scope, elem) {

    var that = this;
    this.data = $scope.componentData;

    $scope.$on(this._getEventName('setEditMode'), function(data) {
        console.log(that.data.name, 'entering editMode');
        elem.addClass('edit-mode');
    });

    $scope.$watch('componentData.position', function(newPos, oldPos) {
        $(elem).css({
            left: +newPos.x,
            top: +newPos.y
        });
    });

    var element = this._compile(this.template)($scope);
    elem.html(element);
};

proto._getEventName = function(eventName) {
    return this.data.name + ':' + eventName + ':' + this.data._id;
};

module.exports = TwitchOverlayComponent;