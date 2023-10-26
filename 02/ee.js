const EventEmitter = require('node:events');

const ee = new EventEmitter();

ee.on('foo', () => {
    console.log('subscriber 1 on "foo"');
});

ee.once('foo', () => {
    console.log('subscriber 2 on "foo"');
});

ee.emit('foo');
ee.emit('foo');
ee.emit('foo');
ee.emit('foo');

ee.removeAllListeners('foo');

ee.emit('foo');
ee.emit('foo');
ee.emit('foo');
ee.emit('foo');