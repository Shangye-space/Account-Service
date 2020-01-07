import Koa from 'koa';
import Router from 'koa-router';
import mount from 'koa-mount';
import serve from 'koa-static';
import cors from '@koa/cors';

import private_router from './src/routes/private/routes_private';

const app = new Koa();
app.use(cors());
const router = new Router();
import koaBody from 'koa-body';

app.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept',
    );
    ctx.set('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    await next();
});

app.use(koaBody());
app.use(private_router.routes());
app.use;
app.use(mount('/temp', serve('./temp')));

const port = process.env.PORT || 3000;

app.listen(port, () =>
    console.log(`Account Service has started on port ${port}!`),
);
