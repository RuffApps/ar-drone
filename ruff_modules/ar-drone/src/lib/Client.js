var EventEmitter = require('events').EventEmitter;
var util         = require('util');

Client.UdpControl       = require('./control/UdpControl');

module.exports = Client;
util.inherits(Client, EventEmitter);
function Client(options) {
  EventEmitter.call(this);

  options = options || {};

  this._options           = options;
  this._udpControl        = options.udpControl || new Client.UdpControl(options);

  this._interval          = null;
  this._ref               = {};
  this._pcmd              = {};
  this._repeaters         = [];
  this._afterOffset       = 0;
  this._disableEmergency  = false;
  this._lastState         = 'CTRL_LANDED';
  this._lastBattery       = 100;
  this._lastAltitude      = 0;
}

Client.prototype.after = function(duration, fn) {
  setTimeout(fn.bind(this), this._afterOffset + duration);
  this._afterOffset += duration;
  return this;
};

Client.prototype.resume = function() {
  // Reset config ACK.
  this._udpControl.ctrl(5, 0);
  // request basic navdata by default
  this.config('general:navdata_demo', 'TRUE');
  this.disableEmergency();
  this._setInterval(30);
};





Client.prototype._setInterval = function(duration) {
  clearInterval(this._interval);
  this._interval = setInterval(this._sendCommands.bind(this), duration);
};

Client.prototype._sendCommands = function() {
  this._udpControl.ref(this._ref);
  this._udpControl.pcmd(this._pcmd);
  this._udpControl.flush();

  this._repeaters
    .forEach(function(repeat) {
      repeat.times--;
      repeat.method();
    });

  this._repeaters = this._repeaters.filter(function(repeat) {
    return repeat.times > 0;
  });
};

Client.prototype.disableEmergency = function() {
  this._disableEmergency = true;
};

Client.prototype.takeoff = function(cb) {
  this.once('hovering', cb || function() {});
  this._ref.fly = true;
  return true;
};

Client.prototype.land = function(cb) {
  this.once('landed', cb || function() {});
  this._ref.fly = false;
  return true;
};

Client.prototype.stop = function() {
  this._pcmd = {};
  return true;
};

Client.prototype.calibrate = function(device_num) {
  this._udpControl.calibrate(device_num);
};

Client.prototype.ftrim = function() {
  // @TODO Figure out if we can get a ACK for this, so we don't need to
  // repeat it blindly like this

  if(this._ref.fly) {
    console.trace("You can’t ftrim when you fly");
    return false;
  }

  var self = this;
  this._repeat(10, function() {
    self._udpControl.ftrim();
  });
};

Client.prototype.config = function(key, value, callback) {
  this._udpControl.config(key, value, callback);
};

Client.prototype.ctrl = function(controlMode, otherMode) {
  this._udpControl.ctrl(controlMode, otherMode);
};

Client.prototype.animate = function(animation, duration) {
  // @TODO Figure out if we can get a ACK for this, so we don't need to
  // repeat it blindly like this
  var self = this;
  this._repeat(10, function() {
    self._udpControl.animate(animation, duration);
  });
};

Client.prototype.animateLeds = function(animation, hz, duration) {
  // @TODO Figure out if we can get a ACK for this, so we don't need to
  // repeat it blindly like this
  var self = this;
  this._repeat(10, function() {
    self._udpControl.animateLeds(animation, hz, duration);
  });
};

Client.prototype.battery = function() {
  return this._lastBattery;
};

Client.prototype._repeat = function(times, fn) {
  this._repeaters.push({times: times, method: fn});
};

var pcmdOptions = [
  ['up', 'down'],
  ['left', 'right'],
  ['front', 'back'],
  ['clockwise', 'counterClockwise'],
];

pcmdOptions.forEach(function(pair) {
  Client.prototype[pair[0]] = function(speed) {
    if (isNaN(speed)) {
      return;
    }
    speed = parseFloat(speed);

    this._pcmd[pair[0]] = speed;
    delete this._pcmd[pair[1]];

    return speed;
  };

  Client.prototype[pair[1]] = function(speed) {
    if (isNaN(speed)) {
      return;
    }

    speed = parseFloat(speed);

    this._pcmd[pair[1]] = speed;
    delete this._pcmd[pair[0]];

    return speed;
  };
});
