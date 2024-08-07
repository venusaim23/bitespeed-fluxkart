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
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
const dbConstants_1 = require("../libs/dbConstants");
function up(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        return knex.schema.withSchema(dbConstants_1.PUBLIC_SCHEMA)
            .alterTable(dbConstants_1.DB_TABLE.CONTACT.TABLE_NAME, function (table) {
            table.index(dbConstants_1.DB_TABLE.CONTACT.COLUMNS.EMAIL.KEY);
            table.index(dbConstants_1.DB_TABLE.CONTACT.COLUMNS.PHONE_NUMBER.KEY);
            table.index(dbConstants_1.DB_TABLE.CONTACT.COLUMNS.DELETED_AT.KEY);
            table.unique([
                dbConstants_1.DB_TABLE.CONTACT.COLUMNS.EMAIL.KEY,
                dbConstants_1.DB_TABLE.CONTACT.COLUMNS.PHONE_NUMBER.KEY,
                dbConstants_1.DB_TABLE.CONTACT.COLUMNS.DELETED_AT.KEY
            ]);
        });
    });
}
function down(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        return knex.schema.withSchema(dbConstants_1.PUBLIC_SCHEMA)
            .alterTable(dbConstants_1.DB_TABLE.CONTACT.TABLE_NAME, function (table) {
            table.dropIndex(dbConstants_1.DB_TABLE.CONTACT.COLUMNS.EMAIL.KEY);
            table.dropIndex(dbConstants_1.DB_TABLE.CONTACT.COLUMNS.PHONE_NUMBER.KEY);
            table.dropIndex(dbConstants_1.DB_TABLE.CONTACT.COLUMNS.DELETED_AT.KEY);
            table.dropIndex([
                dbConstants_1.DB_TABLE.CONTACT.COLUMNS.EMAIL.KEY,
                dbConstants_1.DB_TABLE.CONTACT.COLUMNS.PHONE_NUMBER.KEY,
                dbConstants_1.DB_TABLE.CONTACT.COLUMNS.DELETED_AT.KEY
            ]);
        });
    });
}
