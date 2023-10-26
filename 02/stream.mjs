/**
 * Writable, Duplex/Transform, Readable
 */

import fs from 'node:fs';
// import path from 'node:path';

// __dirname, __filename
// import.meta.url - es modules
// file:///Users/..../....../..../stream.js (new URL)

const file = fs.createReadStream('text.txt', {
    highWaterMark: 9,
    // encoding: 'utf-8'
});

let str = '';

for await (const chunk of file) {
    console.log(chunk.toString());
    str += chunk;
}
console.log('все прочитано', str);

// .on
// .once
// .emit
// .off

// file.on('data', chunk => {
//     console.log(chunk);
// });
// file.once('end', () => {
//     console.log('все прочитано', str);
// });