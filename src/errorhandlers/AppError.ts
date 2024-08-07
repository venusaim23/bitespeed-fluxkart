import { GeneralObject } from "../globalconstants/interfaces";

class AppError extends Error {
    status: number;
    responseMsg: string;
    extras: GeneralObject;

    constructor(e: Error, status: number, responseMsg: string, extras: GeneralObject = {}) {
        super(e.message);
        this.name = "AppError";
        this.status = status;
        this.responseMsg = responseMsg;
        this.extras = extras;

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export default AppError;
