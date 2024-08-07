#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const swagger_autogen_1 = __importDefault(require("swagger-autogen"));
const doc = {
    info: {
        title: "My API",
        description: "Description",
    },
    schemes: ["http"],
};
const outputFile = path_1.default.join(__dirname, "../swagger-output.json");
const endpointsFiles = [path_1.default.join(__dirname, "../src/routes/middleware/RouteMap.js")];
(0, swagger_autogen_1.default)()(outputFile, endpointsFiles, doc).then(() => {
    require("./www"); // Your project's root file
});
