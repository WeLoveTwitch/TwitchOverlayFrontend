TwitchOverlay.service('ComponentsService', [function () {

    var components = [];

    function find(id) {
        for (var i = 0; i < components.length; i++) {
            if (components[i]._id === id) {
                return components[i];
            }
        }

        return false;
    }

    return {
        add: function (component) {
            components.push(component);
        },
        fill: function (componentsFromServer) {
            components = componentsFromServer;
        },
        remove: function (id) {
            components = components.filter(function (component) {
                return component._id !== id;
            });
        },
        get: function () {
            return components;
        },
        update: function (componentName, eventName, componentId, data) {
            console.debug('ComponentsService::update', componentName, eventName, componentId, data);
            var component = find(componentId);

            if (!component) {
                console.warn('Warning! Trying to update an unknown component: ' + componentName, componentId);
                return false;
            }

            for (var key in data) {
                if (data.hasOwnProperty(key)) {
                    component.settings[key] = data[key];
                }
            }
        }
    }
}]);
