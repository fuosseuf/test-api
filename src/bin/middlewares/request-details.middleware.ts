import { NextFunction, Request, Response } from 'express';
import moment from 'moment';
import uniqid from 'uniqid';

export class RequestDetailsMiddleware {
    /**
     * Inits request details
     * @param req
     * @param res
     * @param next
     */
    public static init(req: Request, res: Response, next: NextFunction) {
        req.reqDetails = {
            headers: { 'X-Request-Id': uniqid() },
            startAt: moment()
        };
        next();
    }
}
