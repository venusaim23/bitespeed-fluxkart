"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AppError extends Error {
    constructor(e, status, responseMsg, extras = {}) {
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
exports.default = AppError;
