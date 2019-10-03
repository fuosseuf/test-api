import { ERROR } from 'constants/error.constant';
import { OPEN_ENDPOINTS } from 'constants/open-endpoints.constant';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import sinon, { SinonStub } from 'sinon';
import { AuthorizationMiddleware } from './authorisation.middleware';

describe('AuthorizationMiddleware', () => {
    let req: Request;
    const res: Response = {} as any;
    const next: NextFunction = sin.stub() as any;

    beforeEach(() => {
        req = {
            method: 'GET',
            originalUrl: '/protected',
            headers: {}
        } as any;
    });

    it('should not block opened endpoints', async () => {
        OPEN_ENDPOINTS.GET.push('/public');
        req.originalUrl = '/public';
        await AuthorizationMiddleware.check(req, res, next);
        expect(next).to.have.been.calledOnceWith();
        OPEN_ENDPOINTS.GET.pop();
    });

    it('should block protected endpoints for no logged users', async () => {
        await AuthorizationMiddleware.check(req, res, next);
        expect(next as SinonStub).to.have.been.calledWith(sinon.match.has('message', ERROR.UNAUTHORIZED));
    });

    it('should not block protected endpoints for logged users', async () => {
        jwt.verify = sin.stub().returns({} as any);
        req.headers.authorization = 'xxx';
        await AuthorizationMiddleware.check(req, res, next);
        expect(jwt.verify).to.have.been.calledWith('xxx', undefined);
        expect((next as SinonStub).lastCall).to.be.calledWith();
    });

    it('should block protected endpoints for logged users with expired token', async () => {
        jwt.verify = sin.stub().throws({name: 'TokenExpiredError'});
        req.headers.authorization = 'xxx';
        await AuthorizationMiddleware.check(req, res, next);
        expect(jwt.verify).to.have.been.calledWith('xxx', undefined);
        expect(next as SinonStub).to.have.been.calledWith(sinon.match.has('message', ERROR.TOKEN_EXPIRED));
    });

    it('should block protected endpoints for logged users with invalid token', async () => {
        jwt.verify = sin.stub().throws({name: 'invalid'});
        req.headers.authorization = 'xxx';
        await AuthorizationMiddleware.check(req, res, next);
        expect(jwt.verify).to.have.been.calledWith('xxx', undefined);
        expect(next as SinonStub).to.have.been.calledWith(sinon.match.has('message', ERROR.TOKEN_INVALID));
    });

});
