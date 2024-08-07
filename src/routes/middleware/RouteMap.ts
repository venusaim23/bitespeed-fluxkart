import express, { Application } from "express";

// add controllers

const router = express.Router();

class RouteMap {
    public static setupRoutesAndAuth(app: Application): void {
        app.use("/identify", router);
    }
}

export default RouteMap;
