"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = __importDefault(require("./AppError"));
class ErrorHandler {
    static handleError(err, _req, res, next) {
        console.error("[ErrorHandler] ", err);
        if (res.headersSent) {
            return next(err);
        }
        if (err instanceof AppError_1.default) {
            res.status(err.status).json({
                status: err.status,
                message: err.responseMsg,
                errorName: err.name,
                extras: err.extras,
                errorStack: err,
            });
        }
        else {
            const status = err.status || 500;
            res.status(status).json({
                status: status,
                message: "Error occurred!",
                extras: {},
                errorName: "Uncaught Error",
                errorStack: err,
            });
        }
    }
}
exports.default = ErrorHandler;
