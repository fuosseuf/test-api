import { Request, Response, Router } from 'express';
import { PlayerDataservice } from '../dataservices/player.dataservice';

export class PlayerController {
    public basePath: string = '/';
    public router: Router;

    constructor() {
        this.router = Router();
        this.initRoutes();
    }

    /**
     * Gets players
     * @param req
     * @param res
     */
    public async getPlayers(req: Request, res: Response) {
        const results: any[] = await new PlayerDataservice().getPlayers();
        res.send({results});
    }

    /**
     * Gets player
     * @param req
     * @param res
     */
    public async getPlayer(req: Request, res: Response) {
        const results: any = await new PlayerDataservice().getPlayer(Number(req.params.id));
        res.send({results});
    }

    /**
     * Inits routes
     */
    public initRoutes() {
        this.router.get(`${this.basePath}players`, this.getPlayers);
        this.router.get(`${this.basePath}players/:id`, this.getPlayer);
    }
}
