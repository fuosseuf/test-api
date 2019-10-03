import { controller, request } from 'bin/dcorators/controller.decorator';
import { Controller } from 'controllers/controller';
import { PlayerDataservice } from 'dataservices/player.dataservice';
import { Request, Response } from 'express';

@controller({
    basePath: '',
    routes: [
        {
            path: '/players',
            method: 'get',
            handler: 'getPlayers'
        }
    ]
})
export class PlayerController extends Controller {
    /**
     * Gets players
     * @param req
     * @param res
     */
    @request
    public async getPlayers(req: Request, res: Response) {
        return await new PlayerDataservice().getPlayers();
    }

    /**
     * Gets player
     * @param req
     * @param res
     */
    public async getPlayer(req: Request, res: Response) {
        const results: any = await new PlayerDataservice().getPlayer(Number(req.params.id));
        res.send({ results });
    }

}
