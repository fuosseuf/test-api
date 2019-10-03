import { NextFunction, Request, Response } from 'express';
import { RequestDetailsMiddleware } from './request-details.middleware';

describe('RequestDetailsMiddleware', () => {
    const req: Request = {} as any;
    const res: Response = {} as any;
    const next: NextFunction = sin.stub() as any;

    it('should init reqDetails', () => {
        RequestDetailsMiddleware.init(req, res, next);
        expect(req.reqDetails.headers['X-Request-Id']).to.not.be.undefined;
        expect(req.reqDetails.startAt).to.not.be.undefined;
        expect(next).to.be.calledWith();
    });
});
