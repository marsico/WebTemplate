const koa = require('koa');
const app = new koa();
const port = 3000;

const router = require('koa-router')({
    prefix: '/api'
});
const serve = require('koa-static');

router.get('/', async function(ctx, next) {
    ctx.status = 200;
    ctx.body = 'test';
    await next();
});

app.use(router.routes());
app.use(router.allowedMethods());
app.use(serve(`${__dirname}/../dist`));

app.listen(port);

console.log(`Server started on port: ${port}`);