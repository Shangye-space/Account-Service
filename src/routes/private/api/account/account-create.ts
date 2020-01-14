import { db } from '../../../../db';
import {
    passwordsAndConfirmMatch,
    emailIsTaken,
} from '../../../../helpers/accounts';
import { ParameterizedContext } from 'koa';
import Router = require('koa-router');

import { saltHashPassword } from '../../../../helpers/hash';

async function createAccountHandler(
    ctx: ParameterizedContext<any, Router.IRouterParamContext<any, {}>>,
) {
    try {
        const { name, email, password, password_c } = ctx.request.body;
        if (passwordsAndConfirmMatch(password, password_c)) {
            if (await emailIsTaken(email))
                throw Error('This email address is already taken');

            const passwordData = saltHashPassword(password);
            const { salt, hash } = passwordData;

            createAccount(email, salt, hash, name);
            ctx.status = 200;
        } else {
            ctx.status = 400;
            ctx.response.message =
                "password and confirmation password don't match";
        }
    } catch (err) {
        ctx.status = 400;
        ctx.response.message = err.message;
    }
}

export async function createAccount(
    email: string,
    salt: string,
    hash: string,
    name: string,
) {
    const q = `INSERT INTO accounts(email, salt, hash, name) VALUES("${email}", "${salt}", "${hash}", "${name}")`;
    await db.query(q);
}

export default createAccountHandler;
