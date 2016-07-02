'use strict';

var driver = require('ruff-driver');
var arDrone = exports;
exports.Client = require('./lib/Client');
exports.UdpControl = require('./lib/control/UdpControl');

module.exports = driver({
  attach: function (inputs) {
    //do init steps here
    //this._gpio = inputs.getRequired('gpio');
  },
  exports: {
    createClient:function (options) {
      var client = new arDrone.Client(options);
      client.resume();
      return client;
    },

    createUdpControl : function (options) {
      return new arDrone.UdpControl(options);
    }
  },

  detach: function () {
    //do clean work here
  }
});

