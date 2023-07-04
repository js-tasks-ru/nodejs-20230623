/**
 * readable (file, network)
 * writable (file, network)
 * duplex, transform (gzip)
 */

const fs = require('node:fs');
const zlib = require('node:zlib');

const streamIn = fs.createReadStream('text.txt');
// const gzip = zlib.createGzip();
const streamOut1 = fs.createWriteStream('text_out1.txt');
const streamOut2 = fs.createWriteStream('text_out2.txt');

streamIn.pipe(streamOut1);
streamIn.pipe(streamOut2);