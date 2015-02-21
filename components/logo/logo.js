var Component = require('../component');
var inherits = require('util').inherits;
var fs = require('fs');

function LogoComponent($scope, elem) {
    Component.call(this, $scope, elem);

    this.template = fs.readFileSync('components/logo/logo.html', 'utf8');
}

inherits(LogoComponent, Component);

var proto = LogoComponent.prototype;

module.exports = LogoComponent;