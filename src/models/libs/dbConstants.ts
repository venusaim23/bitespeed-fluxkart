const PUBLIC_SCHEMA = "public";

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
}

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

const DB_TABLE = {
    CONTACT: {
        TABLE_NAME: "contact",
        COLUMNS: {
            ID: {
                KEY: "id",
                TYPE: FIELD_TYPE.INTEGER
            },
            PHONE_NUMBER: {
                KEY: "phoneNumber",
                TYPE: FIELD_TYPE.STRING
            },
            EMAIL: {
                KEY: "email",
                TYPE: FIELD_TYPE.STRING
            },
            LINKED_ID: {
                KEY: "linkedId",
                TYPE: FIELD_TYPE.INTEGER
            },
            LINK_PRECEDENCE: {
                KEY: "linkPrecedence",
                TYPE: FIELD_TYPE.ENUM,
                OPTIONS: [
                    "primary",
                    "secondary"
                ] as const
            },
            ...TABLE_DEFAULTS.COLUMNS
        }
    }
};

export {
    PUBLIC_SCHEMA,
    FIELD_TYPE,
    TABLE_DEFAULTS,
    DB_TABLE
};
