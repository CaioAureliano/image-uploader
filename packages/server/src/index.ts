import express from "express";
import fileUpload from "express-fileupload";
import GoogleOAuth2Client from "./client";
import AuthRouter from "./auth/auth-router";
import UploadRouter from "./upload/upload-router";
import errorHandler from "./app/middleware/error-handler";
import { uncaughtErrorListener } from "./app/middleware/uncaught-error-listener";
    
const app = express();
const client = GoogleOAuth2Client();

app.use(fileUpload({ useTempFiles: true, tempFileDir: "tmp" }));
app.use(AuthRouter(client));
app.use(UploadRouter(client));
app.use(errorHandler);

process.on("uncaughtException", uncaughtErrorListener);

export default app;