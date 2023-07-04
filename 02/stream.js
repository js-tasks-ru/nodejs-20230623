/**
 * Readable, Writable, Duplex/Transform
 */

const stream = require('stream');

// stream.Readable
// stream.Writable
// stream.Duplex, stream.Transform

const fs = require('fs');
const zlib = require('zlib');



// gzipStream.write('lalal');
// gzipStream.on('data', chunk => console.log(chunk));

const read = fs.createReadStream('bigimage.jpeg');
const write = fs.createWriteStream('gziped.gz');
const gzipStream = zlib.createGzip();

// .Readable, .Writable
// .on('end') .on('data')
// .write()

// fileIn -> gzip -> aaa -> ... -> ... -> fileOut
read.pipe(gzipStream).pipe(write);