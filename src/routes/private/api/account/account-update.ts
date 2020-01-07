import { db } from '../../../../db';
import {ParameterizedContext} from "koa";
import { passwordsAndConfirmMatch } from "../../../../helpers/accounts";

import Router = require('koa-router');

async function updateAccountHandler (ctx: ParameterizedContext<any, Router.IRouterParamContext<any, {}>>) {
    try {
        const { old_password ,new_password, new_password_c } = ctx.request.body;
        if (passwordsAndConfirmMatch(new_password, new_password_c)) {

            updatePassword(old_password, new_password,);
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

function updatePassword (old_password :string, new_password :string) {
    const q = `UPDATE `;
}


export default updateAccountHandler;