import { Request, Response, NextFunction } from "express";
import { RESPONSE_STATUS } from "./middleware/schemaConstants";
import { LOG_CONSTANTS } from "../globalconstants/constants";

import LogUtilities from "../logs/utilities/LogUtilities";

type Callback = (req: Request, res: Response, next: NextFunction) => Promise<void>;

const appWrapper = (callback: Callback) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            // implement access management middleware here if required
            await callback(req, res, next);
        } catch (e: any) {
            console.error(e);
            LogUtilities.createLog(LOG_CONSTANTS.ERROR.FILE_NAME, LOG_CONSTANTS.ERROR.TYPE, e.toString());
            next(e);
        }
    };
};

const successResponseAppWrapper = (callback: Callback) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            // implement access management middleware here if required
            await callback(req, res, next);
            res.json({
                [RESPONSE_STATUS.KEY]: RESPONSE_STATUS.VALUES.SUCCESS.KEY
            });
        } catch (e: any) {
            console.error(e);
            LogUtilities.createLog(LOG_CONSTANTS.ERROR.FILE_NAME, LOG_CONSTANTS.ERROR.TYPE, e.toString());
            next(e);
        }
    };
};

export { appWrapper, successResponseAppWrapper };
