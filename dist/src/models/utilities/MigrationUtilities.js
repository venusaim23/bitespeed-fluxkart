"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addDefaultColumns = void 0;
const dbConstants_1 = require("../libs/dbConstants");
const addDefaultColumns = (table) => {
    table.timestamps(true, true, true);
    table.datetime(dbConstants_1.TABLE_DEFAULTS.COLUMNS.DELETED_AT.KEY);
};
exports.addDefaultColumns = addDefaultColumns;
