import request from 'request-promise';
import { PlayerDataservice } from './player.dataservice';

describe('PlayerDataservice', () => {
    const service: PlayerDataservice = new PlayerDataservice();

    it('should correctly fetch data from json file', () => {
        expect(service.datas.players).to.not.be.undefined;
        expect(service.datas.players.length).to.eql(5);
    });

    it('should fetch players', async () => {
        sin.stub(request, 'get').returns({ players: [] } as any);
        const datas: any = await service.getPlayers();
        expect(datas.length).to.eql(0);
    });

    it('should not fetch players', async () => {
        sin.stub(request, 'get').throws(new Error(''));
        try {
            await service.getPlayers();
        } catch (error) {
            expect(error.status).to.eql(500);
        }
    });

    it('should fetch an existing player', async () => {
        sin.stub(request, 'get').returns({ players: [{id: 12}, {id: 9}] } as any);
        const datas: any = await service.getPlayer(12);
        expect(datas.id).to.eql(12);
    });

    it('should returns 404 for non existing player', async () => {
        sin.stub(request, 'get').returns({ players: [{id: 12}, {id: 9}] } as any);
        try {
            await service.getPlayer(7);
        } catch (error) {
            expect(error.status).to.eql(404);
        }
    });
});
