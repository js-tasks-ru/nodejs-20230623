// const http = require('node:http');
// const handler = require('./handler');
import http from 'node:http';
import handler from './handler.mjs';

const server = new http.Server();

server.on('request', handler);

server.listen(3000);