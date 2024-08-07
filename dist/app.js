"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const http_errors_1 = __importDefault(require("http-errors"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const Swagger_1 = __importDefault(require("./src/routes/middleware/Swagger"));
const RouteMap_1 = __importDefault(require("./src/routes/middleware/RouteMap"));
const ErrorHandler_1 = __importDefault(require("./src/errorhandlers/ErrorHandler"));
const app = (0, express_1.default)();
// view engine setup
app.set("views", path_1.default.join(__dirname, "./src/views"));
app.set("view engine", "ejs");
let corsOptions;
if (process.env.NODE_ENV === "production") {
    // Implement dynamic origins to accommodate all internal and third-party domains by modifying the object below
    corsOptions = {
        origin: (_origin, callback) => {
            callback(null, true);
        },
        credentials: true,
        optionsSuccessStatus: 200
    };
}
else {
    corsOptions = {
        origin: (_origin, callback) => {
            callback(null, true);
        },
        credentials: true,
        optionsSuccessStatus: 200
    };
}
app.use((0, cors_1.default)(corsOptions));
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json({
    limit: "100mb",
    verify(req, _res, buf) {
        req.rawBody = buf;
    },
}));
app.use(express_1.default.urlencoded({ limit: "100mb" }));
app.use((0, cookie_parser_1.default)());
app.use((0, express_fileupload_1.default)({
    limits: { fileSize: 20 * 1024 * 1024 },
}));
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
Swagger_1.default.setup(app);
RouteMap_1.default.setupRoutesAndAuth(app);
// error handler
app.use(ErrorHandler_1.default.handleError);
// catch 404 and forward to error handler
app.use((_req, _res, next) => {
    next((0, http_errors_1.default)(404));
});
exports.default = app;
