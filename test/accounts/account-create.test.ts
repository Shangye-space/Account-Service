import { expect, assert } from 'chai';
import { describe, it } from 'mocha';
import { stub } from 'sinon';

import proxyquire from 'proxyquire';

describe('src/helpers/auth.ts', () => {
    let stubs: any;
    let createAccount: any;

    beforeEach(() => {
        stubs = {
            '../../../../db': {
                db: {
                    query: stub().resolves(),
                },
            },
        };

        createAccount = proxyquire(
            '../../src/routes/private/api/account/account-create',
            stubs,
        ).createAccount;
    });

    describe('createAccount:', () => {
        it('makes query with right parameters', async () => {
            const email = 'test@gmail.com',
                salt = 'test_salt',
                hash = 'test_hash',
                name = 'Test';

            await createAccount(email, salt, hash, name);
            assert.equal(stubs['../../../../db'].db.query.callCount, 1);
            assert.equal(
                stubs['../../../../db'].db.query.lastCall.args[0],
                `INSERT INTO accounts(email, salt, hash, name) VALUES("${email}", "${salt}", "${hash}", "${name}")`,
            );
        });
    });
});
