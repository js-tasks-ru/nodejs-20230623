const Koa = require('koa');
const Router = require('koa-router');
const bodyparser = require('koa-bodyparser');
const serve = require('koa-static');
const fs = require('node:fs');

const app = new Koa();
const router = new Router();

const users = [];

// ctx.request.body = {name: "Alex", ...}
app.use(bodyparser());
app.use(serve('public'));

// ctx - context
app.use(async (ctx, next) => {
    const now = Date.now();
    
    ctx.state.foo = 'bar';

    await next();

    const timeElapsed = Date.now() - now;
    console.log('time elapsed', timeElapsed, 'ms');
});

app.use(async (ctx, next) => {
    await new Promise(resolve => {
        setTimeout(resolve, 1000);
    });
    return next();
});

function checkChrome(ctx, next) {
    if (!ctx.headers['user-agent'].includes('Postman')) {
        // ctx.status = 400;
        // ctx.body = 'please use chrome';
        // return;
        ctx.throw(400, 'please use chrome');
    }

    return next();
}

router.get('/users', async (ctx, next) => {
    ctx.body = users;
});

// /users/alex
router.get('/users/:name', async (ctx, next) => {
    ctx.body = `hello ${ctx.params.name} from GET /users/:name endpoint`;
});

router.post('/users', checkChrome, async (ctx, next) => {
    users.push({
        id: users.length,
        name: ctx.request.body.name,
        planet: ctx.request.body.planet,
    });
    ctx.body = users[users.length - 1];
});

app.use(router.routes());

// app.use(...)

app.listen(3000);
