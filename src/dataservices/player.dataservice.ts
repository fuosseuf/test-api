import fs from 'fs';
import _ from 'lodash';
import path from 'path';
import request = require('request-promise');
import { ApiError } from '../bin/api-error';

export class PlayerDataservice {
    public datas: any;

    constructor() {
        const datasLocation: string = path.join(__dirname, '../datas/headtohead.json');
        const content: string = fs.readFileSync(datasLocation, 'utf8');
        this.datas = JSON.parse(content);
    }

    /**
     * Gets players
     * @returns players
     */
    public async getPlayers(): Promise<any[]> {
        const datas: any = await this.fetchDatas();
        return _.sortBy(datas.players, ['id']);
    }

    /**
     * Gets player
     * @param id
     * @returns player
     */
    public async getPlayer(id: number): Promise<any> {
        const datas: any = await this.fetchDatas();
        const player: any = _.find(datas.players, { id });
        if (!player) {
            throw new ApiError(404, 'Player not Found!');
        }

        return player;
    }

    /**
     * Fetchs datas
     */
    private async fetchDatas() {
        try {
            return await request.get({
                uri: 'https://eurosportdigital.github.io/eurosport-node-developer-recruitment/headtohead.json',
                json: true,
            });
        } catch (error) {
            throw new ApiError(500, 'Error remote server');
        }
    }

}
