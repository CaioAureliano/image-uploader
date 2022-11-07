import express, { Express } from "express";
import fileUpload from "express-fileupload";
import { sessionMiddleware } from "./app/middleware/session";
import { uncaughtErrorListener } from "./app/middleware/uncaught-error-listener";
import { router } from "./app/router/router";
    
const app: Express = express();

sessionMiddleware(app);

app.use(fileUpload({ useTempFiles: true, tempFileDir: "tmp" }));
app.use(router());

process.on("uncaughtException", uncaughtErrorListener);

export default app;