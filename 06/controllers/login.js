const uuid = require('uuid/v4');
var jwt = require('jsonwebtoken');

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
    
    // 1. generate secret key & save in DB
    // 2. send secret key

    // const key = JSON.stringify({
    //   user: user.id,
    //   isAdmin: false,
    // });

    const key = jwt.sign({ user: user.id, isAdmin: user.isAdmin }, 'killer-is-jim');
    // await Session.create({...});

    ctx.body = key;

  })(ctx, next);
};