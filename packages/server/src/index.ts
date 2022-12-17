import express, { Express } from "express";
import pino from "pino-http";
import fileUpload from "express-fileupload";
import { sessionMiddleware } from "./app/middleware/session";
import { uncaughtErrorListener } from "./app/middleware/uncaught-error-listener";
import { router } from "./app/router/router";
import swaggerUI from "swagger-ui-express";
import { swaggerSpecs } from "../docs/swagger";
import { acceptHeaderMiddleware } from "./app/middleware/accept-header";
    
const app: Express = express();

sessionMiddleware(app);

app.use(pino());
app.use(fileUpload({ useTempFiles: true, tempFileDir: "tmp" }));
app.use(acceptHeaderMiddleware);
app.use(router());
app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpecs));

process.on("uncaughtException", uncaughtErrorListener);

export default app;