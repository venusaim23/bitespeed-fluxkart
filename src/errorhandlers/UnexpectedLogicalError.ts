import AppError from "./AppError";
import { ERROR_STATUS_CODES } from "./errorConstants";
import { GeneralObject } from "../globalconstants/interfaces";

class UnexpectedLogicalError extends AppError {
    constructor(message: string, extras: GeneralObject = {}) {
        super(new Error(message), ERROR_STATUS_CODES.INTERNAL_SERVER_ERROR, message, extras);
        this.name = this.constructor.name;
    }
}

export default UnexpectedLogicalError;
