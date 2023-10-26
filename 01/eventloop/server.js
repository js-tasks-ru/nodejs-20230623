const http = require('node:http');

const server = new http.Server();

// (macro)task queue : [req1, req2, req3]
server.on('request', (req, res) => {
    // const now = Date.now();
    // while (Date.now() < now + 3000) {}

    setTimeout(() => {
        res.end('hello');
    }, 3000);
    
});

server.listen(3000);