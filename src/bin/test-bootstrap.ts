import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

chai.should();
chai.use(chaiAsPromised);
chai.use(sinonChai);

global.expect = chai.expect;
global.sin = sinon.createSandbox();

expect = global.expect;
sin = global.sin;

afterEach('restore sandbox', () => {
    if(sin) {
        sin.restore();
    }
});
