import { ApiError } from 'bin/api-error';
import { ErrorResponse } from 'bin/responses/error.response';
import { OkResponse } from 'bin/responses/ok.response';
import { Response, Router } from 'express';

export class Controller {
    public router: Router;
    public requestId: string;
    public basePath: string;
    public routes: IRoute[];

    constructor() {
        this.router = Router();
        this._initRoutes();
    }

    public handleError(error: ApiError, res: Response, reqDetails: IReqDetails) {
        const response = new ErrorResponse(reqDetails);
        return res.status(response.stattusCode).json(response.build(error.message));
    }

    public handleResponse(results: any, res: Response, reqDetails: IReqDetails) {
        const response = new OkResponse(reqDetails);
        return res.status(response.stattusCode).json(response.build(results));
    }

    /**
     * Inits routes
     */
    private _initRoutes() {
        this.routes.forEach((route: IRoute) => this.router[route.method](route.path, this[route.handler].bind()));
    }
}

export interface IRoute {
    method: 'get' | 'post' | 'put' | 'patch' | 'delete';
    handler: string;
    path: string;
}
