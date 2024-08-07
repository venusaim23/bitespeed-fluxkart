import { Application } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc, { Options } from "swagger-jsdoc";

class Swagger {
    static setup(app: Application) {
        const options: Options = {
            failOnErrors: true,
            definition: {
                openapi: "3.0.0",
                info: {
                    title: "My API",
                    description: "Description",
                    version: "1.0.0",
                },
                security: [
                    {
                        BearerAuth: [],
                        IdTokenAuth: []
                    }
                ]
            },
            apis: ["./schemaConstants.js", "./pathConstants.js"],
        };

        try {
            const openapiSpecification = swaggerJsDoc(options);
            app.use("/swagger-docs", swaggerUi.serve, swaggerUi.setup(openapiSpecification));
        } catch (e) {
            console.error("Swagger setup error: ", e);
        }
    }
}

export default Swagger;
