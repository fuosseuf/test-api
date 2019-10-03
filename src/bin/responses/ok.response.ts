import { Response } from 'bin/responses/response';

export class OkResponse extends Response {
    public results: any;
    public stattusCode: number = 200;

    /**
     * Builds ok response
     * @param results
     * @returns
     */
    public build(results: any) {
        this.results = results;
        return this._build();
    }
}
