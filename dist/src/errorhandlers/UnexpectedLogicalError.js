"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = __importDefault(require("./AppError"));
const errorConstants_1 = require("./errorConstants");
class UnexpectedLogicalError extends AppError_1.default {
    constructor(message, extras = {}) {
        super(new Error(message), errorConstants_1.ERROR_STATUS_CODES.INTERNAL_SERVER_ERROR, message, extras);
        this.name = this.constructor.name;
    }
}
exports.default = UnexpectedLogicalError;
