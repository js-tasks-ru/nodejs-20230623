const http = require('node:http');
const ReplacerStream = require('./replacer');

const server = new http.Server();

server.on('request', (req, res) => {
    const url = new URL(req.url, 'http://localhost:3000');

    const replacer = new ReplacerStream({ 
        from: url.searchParams.get('from'), 
        to: url.searchParams.get('to'),
    });

    replacer.on('error', error => {
        console.log(error);

        res.statusCode = 500;
        res.end('internal error');
    });

    req.pipe(replacer).pipe(res);
});

module.exports = server;
