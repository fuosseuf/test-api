/* tslint:disable */
declare let expect: Chai.ExpectStatic;
declare let sin: sinon.SinonSandbox;

declare namespace NodeJS {
    interface Global {
        expect: Chai.ExpectStatic;
        sin: sinon.SinonSandbox;
    }

    interface ProcessEnv {
        ENV: string;
        SECRET: string;
    }
}

interface IReqDetails {
    loggedUser?: any;
    headers: any;
    startAt: moment.Moment;
}

declare namespace Express {
    export interface Request extends core.Request { reqDetails: IReqDetails; }
}