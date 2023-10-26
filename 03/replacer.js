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

        this.push(
            parts
                .slice(0, -1)
                .map(part => part === this.from ? this.to : part)
                .join(' ')
        );

        callback();
    }

    _flush(callback) {
        callback(null, this.remaining === this.from ? this.to : this.remaining);
    }
}

module.exports = ReplacerStream;