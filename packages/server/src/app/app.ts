import express, { Express } from "express";
import pino from "pino-http";
import fileUpload from "express-fileupload";
import { sessionMiddleware } from "./middleware/session";
import { uncaughtErrorListener } from "./middleware/uncaught-error-listener";
import { router } from "./router/router";
import swaggerUI from "swagger-ui-express";
import { swaggerSpecs } from "../../docs/swagger";
import { acceptHeaderMiddleware } from "./middleware/accept-header";
    
const app: Express = express();

sessionMiddleware(app);

app.use(pino());
app.use(fileUpload({ useTempFiles: true, tempFileDir: "tmp" }));
app.use(acceptHeaderMiddleware);
app.use(router());
app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpecs));

process.on("uncaughtException", uncaughtErrorListener);

export default app;