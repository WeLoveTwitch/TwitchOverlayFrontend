var Component = require('../component');
var inherits = require('util').inherits;
var fs = require('fs');

function NewestFollowerComponent($scope, elem) {
    Component.call(this, $scope, elem);

    this.template = fs.readFileSync('components/newestFollower/newestFollower.html', 'utf8');

}

inherits(NewestFollowerComponent, Component);

var proto = NewestFollowerComponent.prototype;

module.exports = NewestFollowerComponent;