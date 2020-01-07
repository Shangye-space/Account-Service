import Router from 'koa-router';
import { createAccountHandler, getAccountHandler } from './api/account';
import { authHandler, adminHandler } from './api/auth/auth';

const private_router = new Router();

private_router.routes();

private_router.post('/api/private/account/create/', async ctx =>
    createAccountHandler(ctx),
);

private_router.get('/api/private/account/', async ctx =>
    getAccountHandler(ctx),
);

private_router.post('/api/private/auth', async ctx => authHandler(ctx));

private_router.post('/api/private/admin/validate', async ctx =>
    adminHandler(ctx),
);

export default private_router;
