const koa = require('koa');
const app = new koa();
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

app.listen(3000);
console.log('Server started...');