import moment = require('moment');
import { OkResponse } from './ok.response';

describe('OkResponse', () => {
    const reqDetails: IReqDetails = {
        headers: { 'X-Request-Id': 10 },
        startAt: moment()
    };
    const res: OkResponse = new OkResponse(reqDetails);

    it('should init status to 200', () => {
        expect(res.stattusCode).to.eql(200);
    });

    it('should build the response', () => {
        expect(res.build(10) instanceof OkResponse).to.be.true;
        expect(res.completedAt).to.not.be.undefined;
        expect(res.timeTaken).to.not.be.undefined;
        expect(res.results).to.eql(10);
    });
});
