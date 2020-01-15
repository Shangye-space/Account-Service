import Router = require('koa-router');
import { ParameterizedContext } from 'koa';
import { credentialsMatch } from '../../../../helpers/auth';
import jwt from 'jsonwebtoken';
import { db } from '../../../../db';

export const authHandler = async (
    ctx: ParameterizedContext<any, Router.IRouterParamContext<any, {}>>,
) => {
    try {
        const { email, password, token } = ctx.request.body;
        if (token) {
            const result = await shouldSignWithToken(token);
            if (result) {
                const self: any = await returnAccountData(email);

                ctx.status = 200;
                ctx.body = {
                    id: self.id,
                    name: self.name,
                    email: self.email,
                };
            } else {
                ctx.status = 405;
            }
        } else {
            if (await credentialsMatch(email, password)) {
                const token = jwt.sign(
                    {
                        data: { email, password },
                    },
                    'secret',
                    { expiresIn: '1h' },
                );

                ctx.status = 200;
                ctx.body = {
                    token,
                };
                ctx.response.message = 'logged in';
            } else {
                ctx.status = 400;
                ctx.response.message = 'wrong credentials';
            }
        }
    } catch (err) {
        ctx.status = 401;
        ctx.response.message = 'no such email';
    }
};

export const shouldSignWithToken = async (token: any) => {
    return new Promise<any>((resolve, reject) => {
        resolve(
            jwt.verify(token, 'secret', async (err: any, decoder: any) => {
                const token_email = decoder.data.email;
                const token_password = decoder.data.password;

                const result = await credentialsMatch(
                    token_email,
                    token_password,
                );

                return result;
            }),
        );
    });
};

export const returnAccountData = (email: string): Promise<object> => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT * FROM accounts WHERE email = "${email}" LIMIT 1`,
            (err, result) => {
                resolve(result[0]);
            },
        );
    });
};

export const isAdmin = async (
    email: string,
    password: string,
): Promise<boolean> => {
    return new Promise(async (resolve, reject) => {
        const account: object | any = await returnAccountData(email);
        if (account.admin === 1) {
            resolve(true);
        }

        resolve(false);
    });
};

export const adminHandler = async (
    ctx: ParameterizedContext<any, Router.IRouterParamContext<any, {}>>,
) => {
    try {
        const { email, password, token } = ctx.request.body;
        if (token) {
            if (await isAdmin(email, password)) {
                ctx.status = 200;
                ctx.body = {
                    admin: true,
                };
            } else {
                ctx.status = 200;
                ctx.body = {
                    admin: false,
                };
            }
        }
    } catch (err) {
        ctx.status = 401;
        ctx.response.message = 'no such email';
    }
};
