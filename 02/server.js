const http = require('node:http');
const Replacer = require('./replacer');

const server = new http.Server();

// /?from=apple&to=banana
server.on('request', (req, res) => {
    const url = new URL(req.url, 'http://localhost:3000');

    const replacer = Replacer.createReplacerStream({
        from: url.searchParams.get('from'),
        to: url.searchParams.get('to'),
    });

    req.pipe(replacer).pipe(res);
});

server.listen(3000);
