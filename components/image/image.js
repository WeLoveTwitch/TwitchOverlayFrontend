var Component = require('../component');
var inherits = require('util').inherits;
var fs = require('fs');

function ImageComponent($scope, elem) {
    Component.call(this, $scope, elem);

    this.template = fs.readFileSync('components/image/image.html', 'utf8');
}

inherits(ImageComponent, Component);

var proto = ImageComponent.prototype;

module.exports = ImageComponent;