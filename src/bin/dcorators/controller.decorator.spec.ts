import { ApiError } from 'bin/api-error';
import { Controller, IRoute } from 'controllers/controller';
import { Request, Response } from 'express';
import moment = require('moment');
import { SinonStub } from 'sinon';
import { controller, request } from './controller.decorator';

const basePath: string = 'test';
const routes: IRoute[] = [{ path: '/get', method: 'get', handler: 'fetch' }];
const req: Request = { reqDetails: { headers: { 'X-request-id': 10 }, startAt: moment() } } as any;
const res: Response = { status: sin.stub().returns({ json: sin.stub() }) } as any;

@controller({ basePath, routes })
class TestCtrl extends Controller {

    @request
    // tslint:disable-next-line: no-shadowed-variable
    public async fetch(req: Request, res: Response) {
        return 20;
    }

    @request
    // tslint:disable-next-line: no-shadowed-variable
    public async delete(req: Request, res: Response) {
        throw new ApiError(500, 'error');
    }
}

describe('ControllerDecorator', () => {
    const test: TestCtrl = new TestCtrl();

    it('should init basePath and routes', () => {
        expect(test.basePath).to.eql(basePath);
        expect(test.routes).to.eql(routes);
    });

    it('should return a ok response', async () => {
        await test.fetch(req, res);
        expect((res.status as SinonStub).lastCall.args).to.eql([200]);
    });

    it('should return a error response', async () => {
        await test.delete(req, res);
        expect((res.status as SinonStub).lastCall.args).to.eql([500]);
    });
});
