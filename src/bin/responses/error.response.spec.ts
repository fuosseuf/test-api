import moment = require('moment');
import { ErrorResponse } from './error.response';

describe('ErrorResponse', () => {
    const reqDetails: IReqDetails = {
        headers: { 'X-Request-Id': 10 },
        startAt: moment()
    };
    const res: ErrorResponse = new ErrorResponse(reqDetails);

    it('should init status to 200', () => {
        expect(res.stattusCode).to.eql(500);
    });

    it('should build the response', () => {
        expect(res.build('error') instanceof ErrorResponse).to.be.true;
        expect(res.completedAt).to.not.be.undefined;
        expect(res.timeTaken).to.not.be.undefined;
        expect(res.errorMessages).to.eql(['error']);
    });
});
