"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PATHS = void 0;
const schemaConstants_1 = require("./schemaConstants");
/**
 * @swagger
 * paths:
 *   /identify:
 *     post:
 *       tags:
 *         - Identify
 *       security: []
 *       requestBody:
 *         $ref: '#/components/requestBodies/IDENTIFY_BODY_SCHEMA'
 *       responses:
 *         '200':
 *           $ref: '#/components/responses/IDENTIFY_RESPONSE_SCHEMA'
 *         '400':
 *           $ref: '#/components/responses/badRequest'
 *         '404':
 *           $ref: '#/components/responses/notFound'
 *         '405':
 *           $ref: '#/components/responses/notAllowed'
 */
const IDENTIFY_PATH = {
    "/identify": {
        ENDPOINT: "/identify",
        POST: {
            BODY: schemaConstants_1.IDENTIFY_BODY_SCHEMA,
            RESPONSE: schemaConstants_1.IDENTIFY_RESPONSE_SCHEMA
        }
    }
};
const PATHS = Object.assign({}, IDENTIFY_PATH);
exports.PATHS = PATHS;
