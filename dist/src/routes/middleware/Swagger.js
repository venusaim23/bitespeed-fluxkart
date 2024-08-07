"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
class Swagger {
    static setup(app) {
        const options = {
            failOnErrors: true,
            definition: {
                openapi: "3.0.0",
                info: {
                    title: "My API",
                    description: "Description",
                    version: "1.0.0"
                },
                security: [
                    {
                        BearerAuth: [],
                        IdTokenAuth: []
                    }
                ]
            },
            apis: [`${__dirname}/schemaConstants.js`, `${__dirname}/pathConstants.js`]
        };
        try {
            const openapiSpecification = (0, swagger_jsdoc_1.default)(options);
            app.use("/swagger-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(openapiSpecification));
        }
        catch (e) {
            console.error("Swagger setup error: ", e);
        }
    }
}
exports.default = Swagger;
