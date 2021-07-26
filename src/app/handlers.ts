import { Point } from "@influxdata/influxdb-client";
import { randomInt } from "crypto";
import { Application } from "express";

const welcomeHandler = (app: Application) => {
    app.get('/', (req, res) => {
        res.send("success..");
    })
};

export const handlers = () => [welcomeHandler];
