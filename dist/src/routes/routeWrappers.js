"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.successResponseAppWrapper = exports.appWrapper = void 0;
const schemaConstants_1 = require("./middleware/schemaConstants");
const constants_1 = require("../globalconstants/constants");
const LogUtilities_1 = __importDefault(require("../logs/utilities/LogUtilities"));
const appWrapper = (callback) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // implement access management middleware here if required
            yield callback(req, res, next);
        }
        catch (e) {
            console.error(e);
            LogUtilities_1.default.createLog(constants_1.LOG_CONSTANTS.ERROR.FILE_NAME, constants_1.LOG_CONSTANTS.ERROR.TYPE, e.toString());
            next(e);
        }
    });
};
exports.appWrapper = appWrapper;
const successResponseAppWrapper = (callback) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // implement access management middleware here if required
            yield callback(req, res, next);
            res.json({
                [schemaConstants_1.RESPONSE_STATUS.KEY]: schemaConstants_1.RESPONSE_STATUS.VALUES.SUCCESS.KEY
            });
        }
        catch (e) {
            console.error(e);
            LogUtilities_1.default.createLog(constants_1.LOG_CONSTANTS.ERROR.FILE_NAME, constants_1.LOG_CONSTANTS.ERROR.TYPE, e.toString());
            next(e);
        }
    });
};
exports.successResponseAppWrapper = successResponseAppWrapper;
