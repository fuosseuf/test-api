import { Request, Response } from 'express';
import { SinonStub } from 'sinon';
import { PlayerDataservice } from '../dataservices/player.dataservice';
import { PlayerController } from './player.controller';

describe('PlayerController', () => {
    const controller: PlayerController = new PlayerController();
    const res: Response = { send: sin.stub() };
    const req: Request = { params: { id: '9' } };

    it('should init routes', () => {
        // console.log(controller.router.route('/players'));
        // expect(controller.router.get).to.have.been.calledTwice;
    });

    it('should get all players', async () => {
        const results: any[] = [{ id: 2 }, { id: 9 }];
        const stubService: SinonStub = sin.stub(PlayerDataservice.prototype, 'getPlayers').returns(Promise.resolve(results));
        await controller.getPlayers(req, res);
        expect(stubService).to.be.calledOnce;
        expect(res.send).to.be.calledWith({ results });
    });

    it('should get a player', async () => {
        const results: any = { id: 9 };
        const stubService: SinonStub = sin.stub(PlayerDataservice.prototype, 'getPlayer').returns(Promise.resolve(results));
        await controller.getPlayer(req, res);
        expect(stubService).to.be.calledWith(9);
        expect(res.send).to.be.calledWith({ results });
    });
});
