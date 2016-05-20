'use strict';
var drone;
var button;
var forward;
var backward;
var left;
var right
var up;
var down;
var clockwise;
var anticlockwise;
var takeoff;
var land;
var hover;

$.ready(function (error) {
    if (error) {
        console.log(error);
        return;
    }
    drone = $('#drone');
    forward = $('#forward-button');
    backward = $('#backward-button');
    left = $('#left-button');
    right = $('#right-button');
    up = $('#up');
    down = $('#down-button');
    clockwise = $('#clockwise-button');
    anticlockwise = $('#anticlockwise-button');
    takeoff = $('#takeoff-button');
    land = $('#land-button');
    hover = $('#hover-button');
    
    var client = drone.createClient();
       
    takeoff.on('push', function () {
        console.log('takeoff');
        client.takeoff();
    });
    
    land.on('push', function () {
        console.log('land');
        client.land();
    });
    
    forward.on('push', function () {
        console.log('forward');
        client.front(1);
    });
    
    backward.on('push', function () {
        console.log('backward');
        client.back(1);
    });
    
    left.on('push', function () {
        console.log('left');
        client.left(1);
    });
    
    right.on('push', function () {
        console.log('right');
        client.right(1);
    });
    
    clockwise.on('push', function () {
        console.log('clockwise');
        client.clockwise(1);
    });
    
    anticlockwise.on('push', function () {
        console.log('anticlockwise');
        client.counterClockwise(1);
    });
    
    up.on('push', function () {
        console.log('up');
        client.up(1);
    });
    
    down.on('push', function () {
        console.log('down');
        client.down(1);
    });
    
    hover.on('push', function () {
        console.log('hover');
        client.stop();
    });
    
    $('#led-r').turnOn();
});

$.end(function () {
    $('#led-r').turnOff();
});
