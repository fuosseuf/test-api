import { Controller, IRoute } from 'controllers/controller';
import { Request, Response } from 'express';

class ControllerDecorator {
    /**
     * Controllers controller decorator
     * @param config
     * @returns
     */
    public static controller(config: { basePath: string, routes: IRoute[] }) {
        return <T extends typeof Controller>(constructor: T) => {
            constructor.prototype.basePath = config.basePath;
            constructor.prototype.routes = config.routes;
        };
    }

    /**
     * Requests controller decorator
     * @param target
     * @param propertyKey
     * @param descriptor
     * @returns
     */
    public static request(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
        const originalMethod = descriptor.value;
        return {
            value: async (...args: any[]) => {
                const req: Request = args[0];
                const res: Response = args[1];
                try {
                    const results: any = await originalMethod.apply(target, args);
                    return target.handleResponse(results, res, req.reqDetails);
                } catch (error) {
                    return target.handleError(error, res, req.reqDetails);
                }
            },
        };
    }
}

export const controller = ControllerDecorator.controller;
export const request = ControllerDecorator.request;
