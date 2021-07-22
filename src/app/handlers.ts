import { Application } from "express";
import { runQuery } from "../db/query";

const welcomeHandler = (app: Application) => {
    app.get('/', (req, res) => {
        runQuery();
        res.send("Hellow world");
    })
};

export const handlers = () => [welcomeHandler];
