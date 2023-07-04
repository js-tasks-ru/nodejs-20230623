const path = require('path');
const Koa = require('koa');
const Router = require('koa-router');
const passport = require('./libs/passport');
const {login} = require('./controllers/login');

const app = new Koa();

app.use(require('koa-static')(path.join(__dirname, 'public')));
app.use(require('koa-bodyparser')());

app.use(async (ctx, next) => {
  // const key = ctx.cookies.get('session');
  const key = ctx.headers['authorization'];

  if (key.isAdmin) {
    // ...
  }
  
  // find session
  // ctx.user = user;
  
  return next();
});

const router = new Router({prefix: '/api'});

router.post('/login', login);

router.get('/oauth/:provider', async (ctx, next) => {
  await passport.authenticate(ctx.params.provider, { scope: 'email' })(ctx, next);
  
  ctx.status = 200;
  ctx.body = {
    location: ctx.response.get('Location'),
  };
});

router.post('/oauth_callback', async (ctx, next) => {
  await passport.authenticate(ctx.request.body.provider, async (err, user, info) => {
    if (err) throw err;

    if (!user) {
      ctx.status = 400;
      ctx.body = { error: info }; // 'стратегия еще не подключена'
      return;
    }

    // success
  })(ctx, next);
});

app.use(router.routes());

// this for HTML5 history in browser
const fs = require('fs');
const User = require('./models/User');
const { Session } = require('inspector');

const index = fs.readFileSync(path.join(__dirname, 'public/index.html'));
app.use(async (ctx) => {
  if (ctx.url.startsWith('/api') || ctx.method !== 'GET') return;
  
  ctx.set('content-type', 'text/html');
  ctx.body = index;
});

module.exports = app;
