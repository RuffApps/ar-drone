var assert = require('assert');
var path = require('path');
var test = require('test');

var driverRunner = require('ruff-driver-runner');

var driverPath = path.join(__dirname, '..');

module.exports = {
    'test should build driver': function () {
        driverRunner.run(driverPath, function(device, context) {
            // ...
        });
    }
};

test.run(module.exports);
