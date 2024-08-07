import { IDENTIFY_BODY_SCHEMA, IDENTIFY_RESPONSE_SCHEMA } from "./schemaConstants";

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
            BODY: IDENTIFY_BODY_SCHEMA,
            RESPONSE: IDENTIFY_RESPONSE_SCHEMA
        }
    }
};

const PATHS = {
    ...IDENTIFY_PATH
};

export { PATHS };
