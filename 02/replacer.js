// apple cherry tomato watermelon banana pineapple
// apple lemon tomato watermelon banana pineapple

const stream = require('node:stream');

class ReplacerStream extends stream.Transform {
    constructor(options) {
        super(options);

        this.from = options.from;
        this.to = options.to;
        this.remaining = '';
    }

    _transform(chunk, encoding, callback) {
        let parts = this.remaining + chunk.toString();
        parts = parts.split(' ');
        
        this.remaining = parts.at(-1);

        this.push(parts.slice(0, -1).join(' ').replaceAll(this.from, this.to));

        callback();
    }

    _flush(callback) {
        if (this.remaining) {
            callback(null, ` ${this.remaining.replaceAll(this.from, this.to)}`);
        } else {
            callback();
        }
    }
}

module.exports = ReplacerStream;

// const replacer = new ReplacerStream({
//     from: 'cherry',
//     to: 'lemon'
// });

// replacer.on('data', chunk => {
//     console.log(chunk.toString());
// });

// replacer.write('apple cherry tomato watermelon banana pineapple cher');
// replacer.write('ry');
// replacer.end();