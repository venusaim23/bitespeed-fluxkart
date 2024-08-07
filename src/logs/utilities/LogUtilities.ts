import fs from "fs";
import path from "path";
import { GeneralObject } from "../../globalconstants/interfaces";
import { ERROR_MESSAGES } from "../../errorhandlers/errorConstants";

class LogUtilities {
    static createLog = (logFileName: string, type: string, data: GeneralObject) => {
        const logFilePath = path.join(__dirname, `../${logFileName}`);
        const logData = `${type} ${Date.now()} - ${JSON.stringify(data)}\n\n-----\n\n`;

        fs.appendFile(logFilePath, logData, (e) => {
            if (e) {
                console.error(ERROR_MESSAGES.LOGGING_FAILED_ERROR(), e);
            }
        });
    };
}

export default LogUtilities;
