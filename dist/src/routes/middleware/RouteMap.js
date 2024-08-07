"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pathConstants_1 = require("./pathConstants");
const identify_1 = __importDefault(require("../controllers/identify"));
const router = express_1.default.Router();
class RouteMap {
    static setupRoutesAndAuth(app) {
        app.use("/", router);
        router.use(pathConstants_1.PATHS["/identify"].ENDPOINT, identify_1.default);
    }
}
exports.default = RouteMap;
