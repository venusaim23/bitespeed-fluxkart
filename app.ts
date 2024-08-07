import dotenv from "dotenv";

dotenv.config();

import createError from "http-errors";
import express, { Request, Response, NextFunction } from "express";
import path from "path";
import cors, { CorsOptions } from "cors";
import cookieParser from "cookie-parser";
import logger from "morgan";
import fileUpload from "express-fileupload";
import Swagger from "./src/routes/middleware/Swagger";
import RouteMap from "./src/routes/middleware/RouteMap";
import ErrorHandler from "./src/errorhandlers/ErrorHandler";

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "./src/views"));
app.set("view engine", "ejs");

let corsOptions: CorsOptions;
if (process.env.NODE_ENV === "production") {
    // Implement dynamic origins to accommodate all internal and third-party domains by modifying the object below
    corsOptions = {
        origin: (_origin, callback) => {
            callback(null, true);
        },
        credentials: true,
        optionsSuccessStatus: 200
    };
} else {
    corsOptions = {
        origin: (_origin, callback) => {
            callback(null, true);
        },
        credentials: true,
        optionsSuccessStatus: 200
    };
}

app.use(cors(corsOptions));

app.use(logger("dev"));
app.use(express.json({
    limit: "100mb",
    verify(req: Request, _res: Response, buf: Buffer) {
        (req as any).rawBody = buf;
    },
}));
app.use(express.urlencoded({ limit: "100mb" }));

app.use(cookieParser());
app.use(fileUpload({
    limits: { fileSize: 20 * 1024 * 1024 },
}));
app.use(express.static(path.join(__dirname, "public")));

Swagger.setup(app);
RouteMap.setupRoutesAndAuth(app);

// error handler
app.use(ErrorHandler.handleError);

// catch 404 and forward to error handler
app.use((_req: Request, _res: Response, next: NextFunction) => {
    next(createError(404));
});

export default app;
