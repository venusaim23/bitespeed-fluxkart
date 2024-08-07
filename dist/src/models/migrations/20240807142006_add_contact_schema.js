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
const MigrationUtilities_1 = require("../utilities/MigrationUtilities");
function up(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        return knex.schema.withSchema(dbConstants_1.PUBLIC_SCHEMA)
            .createTable(dbConstants_1.DB_TABLE.CONTACT.TABLE_NAME, function (table) {
            table.increments(dbConstants_1.DB_TABLE.CONTACT.COLUMNS.ID.KEY);
            table.string(dbConstants_1.DB_TABLE.CONTACT.COLUMNS.PHONE_NUMBER.KEY);
            table.string(dbConstants_1.DB_TABLE.CONTACT.COLUMNS.EMAIL.KEY);
            table.integer(dbConstants_1.DB_TABLE.CONTACT.COLUMNS.LINKED_ID.KEY);
            table.foreign(dbConstants_1.DB_TABLE.CONTACT.COLUMNS.LINKED_ID.KEY)
                .references(`${dbConstants_1.DB_TABLE.CONTACT.TABLE_NAME}.${dbConstants_1.DB_TABLE.CONTACT.COLUMNS.ID.KEY}`);
            table.enum(dbConstants_1.DB_TABLE.CONTACT.COLUMNS.LINK_PRECEDENCE.KEY, dbConstants_1.DB_TABLE.CONTACT.COLUMNS.LINK_PRECEDENCE.OPTIONS).notNullable();
            (0, MigrationUtilities_1.addDefaultColumns)(table);
        });
    });
}
function down(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        return knex.schema.withSchema(dbConstants_1.PUBLIC_SCHEMA)
            // .dropTableIfExists(DB_TABLE.CONTACT.TABLE_NAME);
            .renameTable(dbConstants_1.DB_TABLE.CONTACT.TABLE_NAME, `old_${Math.floor(Date.now() / 1000)}_${dbConstants_1.DB_TABLE.CONTACT.TABLE_NAME}`);
    });
}
