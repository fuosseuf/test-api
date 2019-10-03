import { PlayerController } from './player.controller';
import { PlayerDataservice } from '../dataservices/player.dataservice';
import { Response, Request } from 'express';
import { SinonStub } from 'sinon';

describe('PlayerController', () => {
    const controller: PlayerController = new PlayerController();
    const res: Response = { send: sin.stub() } as any;
    const req: Request = { params: { id: '9' } } as any;

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
