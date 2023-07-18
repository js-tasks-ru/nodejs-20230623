const Koa = require('koa');
const Router = require('koa-router');
const bodyparser = require('koa-bodyparser');

const app = new Koa();
const router = new Router({ prefix: '/api' });
const bodyparser = require('./libs/bodyparser');

app.use(async (ctx, next) => {
    const requestStart = Date.now();
    await next();
    console.log('url', ctx.url, 'time taken:', Date.now() - requestStart, 'ms');
});

app.use(bodyparser());
// ctx.request.body

router.use(async (ctx, next) => {
    if (!ctx.headers.authorization) ctx.throw(401);
    const token = ctx.headers.authorization.split(' ')[1];
    const [username, password] = atob(token).split(':');

    if (username !== 'admin' || password !== 'passw0rd') ctx.throw(401);
    return next();
});

// status = 301 302
// headers.location = '/lala'

router.get('/redirect', (ctx, next) => {
    // ctx.status = 301;
    // ctx.set('location', 'https://google.com');
    ctx.redirect('https://google.com');
});

router.post('/upload', async (ctx, next) => {
    ctx.body = 'successfully uploaded';
});

router.get('/profile/:name', async (ctx, next) => {
    // ctx.params.name
    ctx.body = `hello, ${ctx.params.name}`;
});

app.use(router.routes());

app.use((ctx, next) => {
    console.log('lala');
});

app.listen(3000, () => {
    console.log('launched');
});