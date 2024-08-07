import express, { Application } from "express";
import { PATHS } from "./pathConstants";

import identify from "../controllers/identify";

const router = express.Router();

class RouteMap {
    public static setupRoutesAndAuth(app: Application): void {
        app.use("/", router);

        router.use(PATHS["/identify"].ENDPOINT, identify);
    }
}

export default RouteMap;
