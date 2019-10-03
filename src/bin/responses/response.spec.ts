import moment = require('moment');
import { Response } from './response';

describe('Response', () => {
    const reqDetails: IReqDetails = {
        headers: { 'X-Request-Id': 10 },
        startAt: moment()
    };
    const res: Response = new Response(reqDetails);

    it('should init requestId and startAt', () => {
        expect(res.requestId).to.eql(reqDetails.headers['X-Request-Id']);
        expect(res.startedAt).to.eql(reqDetails.startAt);
    });
});
