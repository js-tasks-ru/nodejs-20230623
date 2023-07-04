const { Transform } = require('node:stream');

class ReplacerStream extends Transform {
    constructor(options) {
        super(options);

        this.from = options.from;
        this.to = options.to;
    }

    _transform(chunk, encoding, callback) {
        const str = chunk.toString();

        if (process.env.NODE_ENV === 'test' && str === 'throw') {
            return callback(new Error('test error'));
        }

        callback(null, str.replaceAll(this.from, this.to));
    }
}

module.exports = ReplacerStream;
