import express, { Application } from 'express';

export const initServer = (handlers: Array<(app: Application) => void>) => {
    const app = express();
    app.use(express.static('static'));
    const port = 5000;
    handlers.map((handler) => handler(app));
    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`)
    });
    return app;
}
