"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NOT_ALLOWED_STATUS_SCHEMA = exports.NOT_FOUND_STATUS_SCHEMA = exports.BAD_REQUEST_STATUS_SCHEMA = exports.SUCCESS_STATUS_SCHEMA = exports.IDENTIFY_RESPONSE_SCHEMA = exports.IDENTIFY_BODY_SCHEMA = exports.RESPONSE_STATUS = exports.RESPONSE_TYPES = void 0;
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
exports.RESPONSE_TYPES = RESPONSE_TYPES;
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
exports.RESPONSE_STATUS = RESPONSE_STATUS;
const STRING_email = {
    email: {
        KEY: "email",
        TYPE: RESPONSE_TYPES.STRING
    }
};
const BIGINT_phoneNumber = {
    phoneNumber: {
        KEY: "phoneNumber",
        TYPE: RESPONSE_TYPES.BIGINT
    }
};
const INTEGER_primaryContactId = {
    primaryContactId: {
        KEY: "primaryContactId",
        TYPE: RESPONSE_TYPES.INTEGER
    }
};
const ARRAY_emails = {
    emails: {
        KEY: "emails",
        TYPE: RESPONSE_TYPES.ARRAY
    }
};
const ARRAY_phoneNumbers = {
    phoneNumbers: {
        KEY: "phoneNumbers",
        TYPE: RESPONSE_TYPES.ARRAY
    }
};
const ARRAY_secondaryContactIds = {
    secondaryContactIds: {
        KEY: "secondaryContactIds",
        TYPE: RESPONSE_TYPES.ARRAY
    }
};
const OBJECT_contact = {
    contact: {
        KEY: "contact",
        TYPE: RESPONSE_TYPES.OBJECT,
        FIELDS: Object.assign(Object.assign(Object.assign(Object.assign({}, INTEGER_primaryContactId), ARRAY_emails), ARRAY_phoneNumbers), ARRAY_secondaryContactIds)
    }
};
/**
 * @swagger
 * components:
 *   requestBodies:
 *     IDENTIFY_BODY_SCHEMA:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               phoneNumber:
 *                 type: integer
 *                 format: int64
 */
const IDENTIFY_BODY_SCHEMA = {
    TYPE: RESPONSE_TYPES.OBJECT,
    FIELDS: Object.assign(Object.assign({}, STRING_email), BIGINT_phoneNumber)
};
exports.IDENTIFY_BODY_SCHEMA = IDENTIFY_BODY_SCHEMA;
/**
 * @swagger
 * components:
 *   responses:
 *     IDENTIFY_RESPONSE_SCHEMA:
 *       description: Returns the consolidated contact object
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               contact:
 *                 type: object
 *                 properties:
 *                   primaryContactId:
 *                     type: integer
 *                   emails:
 *                     type: array
 *                     items:
 *                       type: string
 *                   phoneNumbers:
 *                     type: array
 *                     items:
 *                       type: string
 *                   secondaryContactIds:
 *                     type: array
 *                     items:
 *                       type: integer
 */
const IDENTIFY_RESPONSE_SCHEMA = {
    TYPE: RESPONSE_TYPES.OBJECT,
    FIELDS: Object.assign({}, OBJECT_contact)
};
exports.IDENTIFY_RESPONSE_SCHEMA = IDENTIFY_RESPONSE_SCHEMA;
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
exports.SUCCESS_STATUS_SCHEMA = SUCCESS_STATUS_SCHEMA;
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
exports.BAD_REQUEST_STATUS_SCHEMA = BAD_REQUEST_STATUS_SCHEMA;
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
exports.NOT_FOUND_STATUS_SCHEMA = NOT_FOUND_STATUS_SCHEMA;
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
exports.NOT_ALLOWED_STATUS_SCHEMA = NOT_ALLOWED_STATUS_SCHEMA;
