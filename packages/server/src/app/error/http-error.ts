export default class HttpError extends Error {

    public code: number;

    constructor(code: number, message: string) {
        super();
        this.message = message;
        this.code = code;
    }
}