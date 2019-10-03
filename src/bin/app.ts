import express, { Application, NextFunction, Request, Response, Router } from 'express';
import { PlayerController } from '../controllers/player.controller';
import { ApiError } from './api-error';

export class App {
    public app: Application;

    constructor(private readonly port: number, private readonly serverName: string) {
        this.app = express();
        this.app.use('/', Router());
        const playerCtrl: PlayerController = new PlayerController();
        this.app.use(playerCtrl.basePath, playerCtrl.router);
        this.app.use(this.handleNotFoundRoutes);
        this.app.use(this.handleError);
    }

    public start() {
        this.app.listen(this.port, () => {
            console.log(`Server ${this.serverName} launched...`);
        });
    }

    /**
     * Handles not found routes
     * @param req 
     * @param res 
     * @param next 
     */
    private handleNotFoundRoutes(req: Request, res: Response, next: NextFunction) {
        next(new ApiError(404, 'Ressource not found!'));
    }

    /**
     * Handles error
     * @param err 
     * @param req 
     * @param res 
     * @param next 
     */
    private handleError(err: ApiError, req: Request, res: Response, next: NextFunction) {
        res.status(err.status || 500).json({ error: true, message: err.message, status: err.status });
    }

}
