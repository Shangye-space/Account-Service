import { expect, assert } from 'chai';
import { describe, it } from 'mocha';
import { stub } from 'sinon';

import proxyquire from 'proxyquire';

// import {} from '../../src/routes/private/api/auth/auth';

describe('src/helpers/auth.ts', () => {
    let stubs: any;
    let shouldSignWithToken: any;

    beforeEach(() => {
        stubs = {
            jsonwebtoken: {
                verify: stub().resolves(),
            },
            '../../../../helpers/auth': {
                credentialsMatch: stub().resolves(),
            },
        };

        shouldSignWithToken = proxyquire(
            '../../src/routes/private/api/auth/auth',
            stubs,
        ).shouldSignWithToken;
    });

    describe('shouldSignWithToken:', () => {
        it('shouldSignWithToken returns true', async () => {
            stubs['../../../../helpers/auth'].credentialsMatch.resolves(true);
            stubs['jsonwebtoken'].verify.resolves(true);
            const result = shouldSignWithToken('#@&*Y*@&G@@*');

            expect(await result).to.be.equal(true);
        });

        it('shouldSignWithToken returns false if token is invalid', async () => {
            stubs['../../../../helpers/auth'].credentialsMatch.resolves(true);
            stubs['jsonwebtoken'].verify.resolves(false);
            const result = shouldSignWithToken('#@&*Y*@&G@@*');

            expect(await result).to.be.equal(false);
        });

        it('shouldSignWithToken returns false if credentials dont match', async () => {
            stubs['../../../../helpers/auth'].credentialsMatch.resolves(false);
            stubs['jsonwebtoken'].verify.resolves(false);
            const result = shouldSignWithToken('#@&*Y*@&G@@*');

            expect(await result).to.be.equal(false);
        });
    });
});
