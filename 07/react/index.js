const { renderToStatisMarkup } = require('react-dom/server');
const Layout = require('./components/layout');

const Router = require('koa-router');
const router = new Router();

router.get('/', async (ctx, next) => {
    const markup = renderToStatisMarkup(<Layout user={ctx.state.user} />);
    ctx.body = markup;
});