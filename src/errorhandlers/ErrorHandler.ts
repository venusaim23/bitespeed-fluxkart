import { Request, Response, NextFunction } from "express";
import AppError from "./AppError";

class ErrorHandler {
    static handleError(err: any, _req: Request, res: Response, next: NextFunction) {
        console.error("[ErrorHandler] ", err);

        if (res.headersSent) {
            return next(err);
        }

        if (err instanceof AppError) {
            res.status(err.status).json({
                status: err.status,
                message: err.responseMsg,
                errorName: err.name,
                extras: err.extras,
                errorStack: err,
            });
        } else {
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

export default ErrorHandler;
