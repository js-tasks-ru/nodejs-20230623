const Strategy = require('passport-github').Strategy;
const config = require('../../config');

module.exports = new Strategy(
  {
    clientID: 'Iv1.f63f868286f9ac4a',
    clientSecret: 'fb259972dc3edcc8cb1ebf1884c5552ff2cd0c78',
    callbackURL: 'http://localhost:3000/oauth/github',
  },
  (accessToken, refreshToken, profile, done) => {
    console.log(accessToken, refreshToken, profile);
    
    done(null, null, 'Стратегия github еще не настроена');
  }
);
