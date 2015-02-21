TwitchOverlay.service('Components', [function() {

    var components = [];

    function find(id) {
        for(var i = 0; i < components.length; i++) {
            if(components[i]._id === id) {
                return components[i];
            }
        }
        return;
    }

    return {
        add: function(component) {
            components.push(component);
        },
        fill: function(componentsFromServer) {
            components = componentsFromServer;
        },
        remove: function(id) {
            components = components.filter(function(component) {
                return component._id !== id;
            });
        },
        get: function() {
            return components;
        },
        update: function(componentName, eventName, componentId, data) {
            console.log(componentName, eventName, componentId, data);
            var component = find(componentId);
            if(!component) {
                console.log('trying to update a non-existing component', componentId);
                return;
            }
            for(var key in data) {
                component[key] = data[key];
            }
        }
    }
}]);