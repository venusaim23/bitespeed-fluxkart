"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const errorConstants_1 = require("../../errorhandlers/errorConstants");
class LogUtilities {
}
LogUtilities.createLog = (logFileName, type, data) => {
    const logFilePath = path_1.default.join(__dirname, `../${logFileName}`);
    const logData = `${type} ${Date.now()} - ${JSON.stringify(data)}\n\n-----\n\n`;
    fs_1.default.appendFile(logFilePath, logData, (e) => {
        if (e) {
            console.error(errorConstants_1.ERROR_MESSAGES.LOGGING_FAILED_ERROR(), e);
        }
    });
};
exports.default = LogUtilities;
