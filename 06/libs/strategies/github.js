const Strategy = require('passport-github').Strategy;
const config = require('../../config');

module.exports = new Strategy(
  {
    clientID: config.providers.github.app_id,
    clientSecret: config.providers.github.app_secret,
    callbackURL: 'http://localhost:3000/oauth/github',
  },
  (accessToken, refreshToken, profile, done) => {
    console.log(accessToken, refreshToken, profile);
    
    done(null, null, 'Стратегия github еще не настроена');
  }
);
