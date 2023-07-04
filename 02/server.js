const http = require('node:http');
const ReplacerStream = require('./replacer');

// POST /replace?from=apple&to=pineapple
//      BODY banana apple peach strawberry apple banana apple peach

const server = new http.Server();


server.on('request', (req, res) => {
    // req.url -> '/replace?from=apple&to=pineapple'
    const url = new URL(req.url, 'http://localhost:3000');
    // console.log(url.pathname, url.searchParams.get('from'), url.searchParams.get('to'));

    const replacer = new ReplacerStream({
        from: url.searchParams.get('from'),
        to: url.searchParams.get('to')
    });

    req.pipe(replacer).pipe(res);
});

server.listen(3000);
