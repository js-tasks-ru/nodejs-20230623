const { Transform } = require('node:stream');

class ReplacerStream extends Transform {
    static createReplacerStream(options) {
        return new ReplacerStream(options);
    }

    constructor(options) {
        super(options);

        this.from = options.from;
        this.to = options.to;
    }

    _transform(chunk, encoding, callback) {
        const str = chunk.toString();

        if (process.env.NODE_ENV === 'test' && str === 'throw error') {
            callback(new Error('replacer error'));
            return;
        }

        setTimeout(() => {
            callback(null, str.replaceAll(this.from, this.to));
        }, 100);
    }
}

module.exports = ReplacerStream;
