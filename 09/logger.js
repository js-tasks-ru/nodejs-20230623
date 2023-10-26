const winston = require('winston'); // bunyan

// const logger = require('./logger');
// logger.info('payment started');
// logger.err('payment failed', err);

// module.exports = {
//   info(msg) {
//     const info = {ts: Date.now(), level: 'info', msg: msg};
//     console.log(info);
//   },
//   err(msg, err) {
//     const info = {ts: Date.now(), level: 'error', msg: msg, err: err.message, stack: err.stack};
//     console.log(info);
//   }
// };

module.exports = winston.createLogger({
  format: winston.format.combine(
    winston.format.label({ label: 'application' }),
    winston.format.timestamp(),
    winston.format.json(),
  ),
  transports: [
    new winston.transports.Console(),
    // new winston.transport.File()
  ],
}); // logger.{debug|info|warn|error}

// logger.log("user creates order") -> { "message": "user creates order", timestamp: "2021-01-12:05:42" }
 
// console