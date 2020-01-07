import { expect, assert } from 'chai';
import { describe, it } from 'mocha';
import { stub } from 'sinon';

import proxyquire from 'proxyquire';
proxyquire.noCallThru();

import { passwordsAndConfirmMatch } from '../../src/helpers/accounts';

describe('src/helpers/accounts', () => {
    let stubs: any;
    let emailIsTaken: any;

    beforeEach(() => {
        stubs = {
            '../../db/db-connection': {
                db: {
                    query: stub().resolves(),
                },
            },
        };

        emailIsTaken = proxyquire('../../src/helpers/accounts', stubs)
            .emailIsTaken;
    });

    describe('passwordsAndConfirmMatch', () => {
        it('passwordsAndConfirmMatch positive', () => {
            expect(
                passwordsAndConfirmMatch('password', 'password'),
            ).to.be.equal(true);
        });
        it('passwordsAndConfirmMatch negative', () => {
            expect(passwordsAndConfirmMatch('password', 'other')).to.be.equal(
                false,
            );
        });
    });

    describe('emailIsTaken', () => {
        it('emailIsTaken call is made correctly', () => {
            const email = 'email';
            emailIsTaken(email);
            assert.equal(stubs['../../db/db-connection'].db.query.callCount, 1);
            assert.equal(
                stubs['../../db/db-connection'].db.query.lastCall.args[0],
                `SELECT * FROM accounts WHERE email = "${email}";`,
            );
        });
    });
});
