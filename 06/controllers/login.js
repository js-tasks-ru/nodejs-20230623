const uuid = require('uuid/v4');

const passport = require('../libs/passport');
const Session = require('../models/Session');

module.exports.login = async function login(ctx, next) {  
  await passport.authenticate('local', async (err, user, info) => {
    if (err) {
      console.error(ctx, err);
      throw err;
    }

    if (!user) {
      ctx.status = 400;
      ctx.body = { error: info }; // 'стратегия еще не подключена'
      return;
    }
    
    // ctx.body = 'ok';

    // generate unique key

    // store in database
    // pass to the client

    const key = JSON.stringify({
      unique: uuid(),
      isAdmin: true,
      balance: 1000, // 800
    });
    await Session.create({
      key,
      user: user._id,
      ua: ctx.headers['user-agent'],
    });

    // ctx.cookies.set('session', key);
    ctx.body = key;

  })(ctx, next);
};