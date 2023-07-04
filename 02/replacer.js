// apple banana apple -> apple cherry apple

const stream = require('stream');

class Replacer extends stream.Transform {
    static createReplacerStream(options) {
        return new Replacer(options);
    }

    constructor(options) {
        super();

        this.from = options.from;
        this.to = options.to;
    }

    _transform(chunk, encoding, callback) {
        const str = chunk.toString();
        callback(null, str.replaceAll(this.from, this.to));
    }
}

module.exports = Replacer;

// const r = Replacer.createReplacerStream({ from: 'apple', to: 'watermelon' });

// r.on('data', chunk => {
//     console.log(chunk.toString());
// });

// r.write('apple banana apple');