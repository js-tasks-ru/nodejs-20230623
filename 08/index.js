const app = require('./app');
const socket = require('./socket');

// http server (net server)
const server = app.listen(3000, () => {
  console.log('App is running on http://localhost:3000');
});

socket(server);