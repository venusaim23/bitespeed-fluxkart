"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ERROR_MESSAGES = exports.ERROR_STATUS_CODES = void 0;
const ERROR_STATUS_CODES = {
    INTERNAL_SERVER_ERROR: 500,
    UNAUTHORIZED: 401,
    RESOURCE_NOT_FOUND: 404,
    BAD_REQUEST: 400,
    FORBIDDEN: 403,
};
exports.ERROR_STATUS_CODES = ERROR_STATUS_CODES;
const ERROR_MESSAGES = {
    LOGGING_FAILED_ERROR: () => "Failed to log request - ",
    UNEXPECTED_ERROR: (message) => `Unexpected Error${!!message ? ` - ${message}` : ""}`,
};
exports.ERROR_MESSAGES = ERROR_MESSAGES;
