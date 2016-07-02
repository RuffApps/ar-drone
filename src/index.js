'use strict';
var drone;

var forward;//水平面上前进
var backward;//水平面上后退
var left;//向左
var right;//向右
var up;//上升
var down;//下降
var clockwise;//顺时针旋转
var anticlockwise;//逆时针旋转
var takeoff;//起飞
var land;//降落
var hover;//悬停

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
    
    var client = drone.createClient();//创建无人机的一个客户端
       
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
