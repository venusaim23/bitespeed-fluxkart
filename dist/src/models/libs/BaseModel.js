"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Db_1 = __importDefault(require("./Db"));
const dbConstants_1 = require("./dbConstants");
class BaseModel {
    constructor() {
        this.queryBuilder = Db_1.default.getQueryBuilder();
    }
    updateStatement(updateObj) {
        return Object.assign(Object.assign({}, updateObj), { [dbConstants_1.TABLE_DEFAULTS.COLUMNS.UPDATED_AT.KEY]: this.queryBuilder.fn.now() });
    }
    getDefinedObject(object) {
        const definedObject = {};
        for (const key in object) {
            if (object[key] !== undefined) {
                definedObject[key] = object[key];
            }
        }
        return definedObject;
    }
}
exports.default = BaseModel;
