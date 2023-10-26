const Koa = require('koa');
const UAParser = require('ua-parser-js');
const Router = require('koa-router');
const bodyparser = require('koa-bodyparser');

const application = new Koa();
const router = new Router({ prefix: '/api/v1' });

function log(ctx, next) {
    console.log(new Date(), 'method:', ctx.method, 'url:', ctx.url);
    return next();
}

function detectDevice(ctx, next) {
    // "http" - ctx.req | ctx.res
    const ua = new UAParser(ctx.headers['user-agent']);
    const type = ua.getDevice().type || 'desktop';
    console.log('device is:', type);

    ctx.state.deviceType = type;

    return next();
}

application.use(bodyparser({
    formLimit: '10kb'
}));

// application.use(async (ctx, next) => {
//     ctx.req.setEncoding('utf-8');
//     let body = '';
//     // for await (const chunk of ctx.req) {
//     //     body += chunk;
//     // }
//     await new Promise((resolve, reject) => {
//         ctx.req.on('data', chunk => body += chunk);
//         ctx.req.on('end', resolve);
//         ctx.req.on('error', reject);
//     });

//     ctx.request.body = JSON.parse(body || '{}');
//     return next();
// });

application.use(detectDevice);

application.use(log);

const users = [];
router.get('/users', async (ctx, next) => {
    ctx.body = users;
});

router.post('/users', async (ctx, next) => {
    users.push({
        id: `id_${users.length + 1}`,
        name: ctx.request.body.name,
    });
    ctx.status = 201;
    ctx.body = 'ok';
});

application.use(router.routes());

application.listen(3000, () => {
    console.log('application is listening on http://localhost:3000');
});