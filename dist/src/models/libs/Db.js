"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = __importDefault(require("knex"));
const knexfile_1 = __importDefault(require("../../../knexfile"));
const environment = process.env.NODE_ENV || "development";
class Db {
    constructor() {
        this.queryBuilder = this._initQueryBuilder();
    }
    _initQueryBuilder() {
        return (0, knex_1.default)(knexfile_1.default[environment]);
    }
    getQueryBuilder() {
        return this.queryBuilder;
    }
}
exports.default = new Db();
