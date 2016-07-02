# AR drone 2.0 Driver

This is the driver for ar drone 2.0.

you can buy ar drone 2.0 from Parrot Tmall Store.

## Support Devices

[ar-drone](https://rap.ruff.io/raps/ar-drone)

## Usage

* create a control client.Returns a new *Client* object.

```javascript
    $('#ar-drone').createClient();
```

* take off

```javascript
    client.takeoff();
```

* land

```javascript
    client.land();;
```

* Sets all drone movement commands to 0, making it effectively hover in place.

```javascript
    client.stop();
```

* tMakes the drone gain or reduce altitude. speed can be a value from 0 to 1.

```javascript
    client.up(speed) / client.down(speed);
```

* Causes the drone to spin. speed can be a value from 0 to 1.

```javascript
    client.clockwise(speed) / client.counterClockwise(speed);
```

* Controls the pitch, which a horizontal movement using the camera as a reference point. speed can be a value from 0 to 1.

```javascript
    client.front(speed) / client.back(speed);
```

* client.left(speed) / client.right(speed);

```javascript
    Controls the roll, which is a horizontal movement using the camera as a reference point. speed can be a value from 0 to 1.
```

* Now you could write an autonomous program that does the same:

```javascript
    var arDrone = require('ar-drone');
    var client  = arDrone.createClient();

    client.takeoff();

    client
    .after(5000, function() {
        this.clockwise(0.5);
    })
    .after(3000, function() {
        this.stop();
        this.land();
    });
```

