/**
 * IN: banana apple peach strawberry
 * OUT: banana pineapple peach strawberry
 * 
 * apple -> pineapple
 */

const stream = require('node:stream'); // { Transform: class  }

class ReplacerStream extends stream.Transform {
  constructor(options) {
    super(options);
    this.from = options.from;
    this.to = options.to;
  }

  _transform(chunk, encoding, callback) {
    callback(null, chunk.toString().replaceAll(this.from, this.to));
  }
}

module.exports = ReplacerStream;

// const replacerStream = new ReplacerStream({
//     from: 'banana',
//     to: 'pineapple'
// });

// replacerStream.on('data', chunk => {
//     console.log('data:', chunk.toString());
// });

// replacerStream.write('banana apple peach strawberry apple banana apple peach');
// replacerStream.end();