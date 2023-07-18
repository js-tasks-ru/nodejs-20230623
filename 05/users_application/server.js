const Koa = require('koa');
const Router = require('koa-router');
const User = require('./models/User');
const mongoose = require('mongoose');

const app = new Koa();

app.use(require('koa-bodyparser')());

const router = new Router();

router.get('/users/:id', async (ctx, next) => {
});

router.get('/users', async (ctx, next) => {
});

router.post('/users', async (ctx, next) => {
});

app.use(router.routes());

module.exports = app;
