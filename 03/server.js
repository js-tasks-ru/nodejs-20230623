const http = require('node:http');
const ReplacerStream = require('./replacer');

const server = new http.Server();

server.on('request', async (req, res) => {
    
    const url = new URL(req.url, 'http://localhost:3000');
    
    const replacer = new ReplacerStream({
        from: url.searchParams.get('from'),
        to: url.searchParams.get('to'),
    });

    req.pipe(replacer).pipe(res);

});

module.exports = server;