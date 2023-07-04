const Strategy = require('passport-local').Strategy;
const User = require('../../models/User');

module.exports = new Strategy(
  {
    usernameField: 'email', 
    session: false
  },
  async function(email, password, done) {
    // done(err) -> no db connection
    // done(null, user) -> success
    // done(null, null, "wrong password") -> failed
    
    console.log(email, password);

    /**
     * 1. findOne({ email })
     * 2. checkPassword(password)
     * 3. success/failure
     */

    return done(null, null, 'стратегия еще не настроена');
  }
);
