import { ParameterizedContext } from 'koa';
import { db } from '../../../../db';
import Router = require('koa-router');

async function getAccountHandler(
    ctx: ParameterizedContext<any, Router.IRouterParamContext<any, {}>>,
) {
    try {
        // const result :object = await getAccountById(account_id);

        ctx.status = 200;
        ctx.response.body = 'hey';
    } catch (err) {
        ctx.status = 400;
        ctx.response.message = err.message;
    }
}

async function getAccountById(account_id: number): Promise<object> {
    const q: string = `SELECT * 
        FROM accounts 
        WHERE accounts.id = ${account_id} 
        LIMIT 1`;

    const result = await db.query(q);

    return result;
}

export default getAccountHandler;
