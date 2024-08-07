#!/usr/bin/env node

import path from "path";
import swaggerAutogen from "swagger-autogen";

const doc = {
    info: {
        title: "My API",
        description: "Description",
    },
    schemes: ["http"],
};

const outputFile = path.join(__dirname, "../swagger-output.json");
const endpointsFiles = [path.join(__dirname, "../src/routes/middleware/RouteMap.js")];

swaggerAutogen()(outputFile, endpointsFiles, doc).then(() => {
    require("./www"); // Your project's root file
});
