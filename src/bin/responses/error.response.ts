import { Response } from 'bin/responses/response';
import { isArray } from 'util';

export class ErrorResponse extends Response {
    public error: boolean = true;
    public errorMessages: string[];
    public stattusCode: number = 500;

    /**
     * Builds error response
     * @param messages
     * @returns
     */
    public build(messages: string[] | string) {
        this.errorMessages = isArray(messages) ? messages : [messages];
        return this._build();
    }
}
