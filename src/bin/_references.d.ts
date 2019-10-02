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
    }
}
