import express, { Express } from "express";
import fileUpload from "express-fileupload";
import errorHandler from "./app/middleware/error-handler";
import { sessionMiddleware } from "./app/middleware/session";
import { uncaughtErrorListener } from "./app/middleware/uncaught-error-listener";
import AuthRouter from "./auth/auth-router";
import UploadRouter from "./upload/upload-router";
    
const app: Express = express();

sessionMiddleware(app);

app.use(fileUpload({ useTempFiles: true, tempFileDir: "tmp" }));
app.use(AuthRouter());
app.use(UploadRouter());
app.use(errorHandler);

process.on("uncaughtException", uncaughtErrorListener);

export default app;