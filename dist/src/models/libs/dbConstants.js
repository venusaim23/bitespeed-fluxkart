"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB_TABLE = exports.TABLE_DEFAULTS = exports.FIELD_TYPE = exports.PUBLIC_SCHEMA = void 0;
const PUBLIC_SCHEMA = "public";
exports.PUBLIC_SCHEMA = PUBLIC_SCHEMA;
const FIELD_TYPE = {
    STRING: "string",
    INTEGER: "integer",
    BIGINT: "bigint",
    DOUBLE: "double",
    BOOLEAN: "boolean",
    ENUM: "enum",
    JSONB: "jsonb",
    DATE: "date",
    DATETIME: "date-time"
};
exports.FIELD_TYPE = FIELD_TYPE;
const TABLE_DEFAULTS = {
    COLUMNS: {
        CREATED_AT: {
            KEY: "createdAt",
            TYPE: FIELD_TYPE.DATETIME
        },
        UPDATED_AT: {
            KEY: "updatedAt",
            TYPE: FIELD_TYPE.DATETIME
        },
        DELETED_AT: {
            KEY: "deletedAt",
            TYPE: FIELD_TYPE.DATETIME
        }
    }
};
exports.TABLE_DEFAULTS = TABLE_DEFAULTS;
const DB_TABLE = {
    CONTACT: {
        TABLE_NAME: "contact",
        COLUMNS: Object.assign({ ID: {
                KEY: "id",
                TYPE: FIELD_TYPE.INTEGER
            }, PHONE_NUMBER: {
                KEY: "phoneNumber",
                TYPE: FIELD_TYPE.STRING
            }, EMAIL: {
                KEY: "email",
                TYPE: FIELD_TYPE.STRING
            }, LINKED_ID: {
                KEY: "linkedId",
                TYPE: FIELD_TYPE.INTEGER
            }, LINK_PRECEDENCE: {
                KEY: "linkPrecedence",
                TYPE: FIELD_TYPE.ENUM,
                OPTIONS: [
                    "primary",
                    "secondary"
                ]
            } }, TABLE_DEFAULTS.COLUMNS)
    }
};
exports.DB_TABLE = DB_TABLE;
