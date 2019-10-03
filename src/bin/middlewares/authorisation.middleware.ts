import { ApiError } from 'bin/api-error';
import { ERROR } from 'constants/error.constant';
import { OPEN_ENDPOINTS } from 'constants/open-endpoints.constant';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export class AuthorizationMiddleware {
    /**
     * Checks authorization
     * @param req
     * @param res
     * @param next
     */
    public static async check(req: Request, res: Response, next: NextFunction) {
        if (OPEN_ENDPOINTS[req.method].indexOf(req.originalUrl) !== -1) {
            return next();
        }
        if (!req.headers.authorization) {
            return next(new ApiError(401, ERROR.UNAUTHORIZED));
        } else {
            try {
                req.reqDetails.loggedUser = await jwt.verify(req.headers.authorization, process.env.SECRET);
                req.reqDetails.headers.authorization = req.headers.authorization;
                return next();
            } catch (error) {
                if (error.name === 'TokenExpiredError') {
                    return next(new ApiError(401, ERROR.TOKEN_EXPIRED));
                } else {
                    return next(new ApiError(401, ERROR.TOKEN_INVALID));
                }
            }
        }
    }
}
