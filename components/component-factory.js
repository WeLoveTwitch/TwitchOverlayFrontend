var components = {
    text: require('./text/text'),
    //cam: require('./cam/cam'),
    //chat: require('./chat/chat'),
    //followerAlert: require('./followerAlert/followerAlert'),
    //followers: require('./followers/followers'),
    logo: require('./logo/logo'),
    //newestFollower: require('./newestFollower/newestFollower')
};

function ComponentFactory() {

}

var proto = ComponentFactory.prototype;

proto.create = function(name, $compile) {
    if(!components[name]) {
        return console.log('trying to initialize an undefined component', name);
    }
    return new components[name]($compile);
};

module.exports = global.window.componentFactory = new ComponentFactory();