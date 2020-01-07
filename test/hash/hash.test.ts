import { expect, assert } from 'chai';
import { describe, it } from 'mocha';
import { stub } from 'sinon';

import proxyquire from 'proxyquire';
proxyquire.noCallThru();

import {
    sha512,
    genRandomString,
    saltHashPassword,
} from '../../src/helpers/hash';

describe('src/helpers/hash.ts', () => {
    let stubs: any;

    beforeEach(() => {
        stubs = {
            '../../db/db-connection': {
                db: {
                    query: stub().resolves(),
                },
            },
        };
    });

    describe('sha512', () => {
        it('sha512 outputs hash', () => {
            const result = sha512('password', 'testsalt');
            const result2 = sha512('password', 'testsalt');
            const result3 = sha512('password', 'othersalt');

            expect(result.hash).to.exist;
            expect(result2.hash).to.exist;
            expect(result.hash).to.be.equal(result2.hash);
            expect(result.hash).to.not.be.equal(result3.hash);
        });
    });

    describe('genRandomString', () => {
        it('genRandomString return random string', () => {
            const string1 = genRandomString(16);
            const string2 = genRandomString(16);

            expect(string1).to.not.be.equal(string2);
        });
    });

    describe('saltHashPassword', () => {
        it('saltHashPassword validates password', () => {
            const result = saltHashPassword('password');

            const validation = sha512('password', result.salt);

            expect(result.hash).to.be.equal(validation.hash);
        });
    });
});
