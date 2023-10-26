const { KoaPassport } = require('koa-passport');
const passport = new KoaPassport();

const localStrategy = require('./strategies/local');
const githubStrategy = require('./strategies/github');
const vkontakteStrategy = require('./strategies/vk');
// const facebookStrategy = require('./strategies/facebook');

passport.use(localStrategy);
passport.use(githubStrategy);
passport.use(vkontakteStrategy);
// passport.use(facebookStrategy);

module.exports = passport;
