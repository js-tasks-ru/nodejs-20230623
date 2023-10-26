const Koa = require('koa');
const Router = require('koa-router');
const User = require('./models/User');
const mongoose = require('mongoose');
const mapUser = require('./mappers/user');
const handleMongooseValidationErrors = require('./lib/handleMongooseValidationError');

const app = new Koa();

app.use(require('koa-bodyparser')());

const router = new Router();

// REST API
router.get('/users', async (ctx, next) => {
    const users = await User.find({});
    ctx.body = users.map(mapUser);
});

router.get('/users/:id', async (ctx, next) => {
    if (!mongoose.isValidObjectId(ctx.params.id)) 
        ctx.throw(400, 'invalid user id');

    const user = await User.findById(ctx.params.id);
    if (!user) ctx.throw(404, 'user not found');
    
    ctx.body = mapUser(user);
});

router.post('/users', handleMongooseValidationErrors, async (ctx, next) => {
    const user = await User.create({
        email: ctx.request.body.email,
        name: ctx.request.body.name,
    });

    ctx.body = mapUser(user);
});

app.use(router.routes());

module.exports = app;
