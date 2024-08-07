const RESPONSE_TYPES = {
    ARRAY: "array",
    OBJECT: "object",
    STRING: "string",
    BOOLEAN: "boolean",
    INTEGER: "integer",
    BIGINT: "bigint",
    DOUBLE: "double",
    FILE: "file",
    DATETIME: "date-time",
    DATE: "date"
};

const RESPONSE_STATUS = {
    KEY: "status",
    VALUES: {
        SUCCESS: {
            KEY: "success",
            CODE: 200
        },
        BAD_REQUEST: {
            KEY: "bad_request",
            CODE: 400
        },
        NOT_FOUND: {
            KEY: "not_found",
            CODE: 404
        },
        NOT_ALLOWED: {
            KEY: "not_allowed",
            CODE: 405
        }
    }
};

/**
 * @swagger
 * components:
 *   responses:
 *     Success:
 *       description: Success
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 */
const SUCCESS_STATUS_SCHEMA = {
    TYPE: RESPONSE_TYPES.OBJECT,
    FIELDS: {
        [RESPONSE_STATUS.KEY]: {
            KEY: RESPONSE_STATUS.KEY,
            TYPE: RESPONSE_TYPES.STRING
        }
    }
};

/**
 * @swagger
 * components:
 *   responses:
 *     badRequest:
 *       description: Bad Request
 */
const BAD_REQUEST_STATUS_SCHEMA = {
    TYPE: RESPONSE_TYPES.OBJECT,
    FIELDS: {
        [RESPONSE_STATUS.KEY]: {
            KEY: RESPONSE_STATUS.KEY,
            TYPE: RESPONSE_TYPES.STRING
        }
    }
};

/**
 * @swagger
 * components:
 *   responses:
 *     notFound:
 *       description: Not found
 */
const NOT_FOUND_STATUS_SCHEMA = {
    TYPE: RESPONSE_TYPES.OBJECT,
    FIELDS: {
        [RESPONSE_STATUS.KEY]: {
            KEY: RESPONSE_STATUS.KEY,
            TYPE: RESPONSE_TYPES.STRING
        }
    }
};

/**
 * @swagger
 * components:
 *   responses:
 *     notAllowed:
 *       description: Not Allowed
 */
const NOT_ALLOWED_STATUS_SCHEMA = {
    TYPE: RESPONSE_TYPES.OBJECT,
    FIELDS: {
        [RESPONSE_STATUS.KEY]: {
            KEY: RESPONSE_STATUS.KEY,
            TYPE: RESPONSE_TYPES.STRING
        }
    }
};

export {
    RESPONSE_TYPES,
    RESPONSE_STATUS,
    SUCCESS_STATUS_SCHEMA,
    BAD_REQUEST_STATUS_SCHEMA,
    NOT_FOUND_STATUS_SCHEMA,
    NOT_ALLOWED_STATUS_SCHEMA
};
