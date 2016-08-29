const koa = require('koa');
const app = koa();
const router = require('koa-router')({
    prefix: '/api'
});
const serve = require('koa-static');

router.get('/', function *(next) {
    this.status = 200;
    this.body = 'test';
});

app.use(router.routes());
app.use(router.allowedMethods());
app.use(serve(`${__dirname}/../dist`));

app.listen(3000);
console.log('Server started...');