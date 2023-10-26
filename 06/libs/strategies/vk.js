const Strategy = require('passport-vkontakte').Strategy;
const config = require('../../config');

module.exports = new Strategy(
  {
    clientID: '51717135',
    clientSecret: 'LO2njlfo1vSlSN9jDDb1',
    callbackURL: 'http://localhost:3000/oauth/vkontakte',
  },
  (accessToken, refreshToken, params, profile, done) => {
    console.log(accessToken, refreshToken, params, profile);
    
    done(null, null, 'Стратегия vkontakte еще не настроена');
  }
);
