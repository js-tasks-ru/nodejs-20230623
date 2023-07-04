const Koa = require('koa');
const Router = require('koa-router');
const User = require('./models/User');
const mongoose = require('mongoose');

const app = new Koa();

app.use(require('koa-bodyparser')());

app.use(async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        if (err.status) {
            ctx.status = err.status;
            ctx.body = err.message;
            return;
        }

        console.log(err);
        ctx.status = 500;
        ctx.body = 'internal error';
    }
});

const router = new Router();

function validateObjectId(ctx, next) {
    if (!mongoose.isValidObjectId(ctx.params.id)) {
        ctx.throw(400, 'invalid id');
    }
    return next();
}

async function handleValidationError(ctx, next) {
    try {
        await next();
    } catch (err) {
        if (err.name !== 'ValidationError') 
            throw err;

        ctx.status = 400;
        ctx.body = err.errors['email'].message;
    }
}

router.get('/users/:id', validateObjectId, async (ctx, next) => {
    const user = await User.findById(ctx.params.id);
    if (!user) {
        ctx.throw(404, 'user not found');
    }

    ctx.body = user;
});

router.get('/users', async (ctx, next) => {
    const users = await User.find();
    ctx.body = users;
});

router.post('/users', handleValidationError, async (ctx, next) => {
    const user = await User.create({
        email: ctx.request.body.email,
        name: ctx.request.body.name,
    });
    ctx.body = user;
});

app.use(router.routes());

module.exports = app;
