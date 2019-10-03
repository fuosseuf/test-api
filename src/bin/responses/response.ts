import moment = require('moment');

export class Response {
    public requestId: string;
    public startedAt: moment.Moment;
    public completedAt: moment.Moment;
    public timeTaken: number;
    public stattusCode: number;

    constructor(reqDetails: IReqDetails) {
        this.requestId = reqDetails.headers['X-Request-Id'];
        this.startedAt = reqDetails.startAt;
    }

    /**
     * Builds response
     * @returns
     */
    protected _build() {
        this.completedAt = moment();
        this.timeTaken = this.completedAt.diff(this.startedAt, 'ms');

        return this;
    }
}
