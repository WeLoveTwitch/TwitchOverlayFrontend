var Component = require('../component');
var inherits = require('util').inherits;
var fs = require('fs');

function TextComponent($scope, elem) {
    Component.call(this, $scope, elem);

    this.template = fs.readFileSync('components/text/text.html', 'utf8');
}

inherits(TextComponent, Component);

var proto = TextComponent.prototype;

module.exports = TextComponent;