const ERROR_STATUS_CODES = {
    INTERNAL_SERVER_ERROR: 500,
    UNAUTHORIZED: 401,
    RESOURCE_NOT_FOUND: 404,
    BAD_REQUEST: 400,
    FORBIDDEN: 403,
};

const ERROR_MESSAGES = {
    LOGGING_FAILED_ERROR: () => "Failed to log request - ",
    UNEXPECTED_ERROR: (message?: string) => `Unexpected Error${!!message ? ` - ${message}` : ""}`,
};

export { ERROR_STATUS_CODES, ERROR_MESSAGES };
