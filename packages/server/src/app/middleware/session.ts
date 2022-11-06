import session from "express-session";
import { Express } from "express";

declare module "express-session" {
    // eslint-disable-next-line no-unused-vars
    interface SessionData {
        [k: string]: any;
        oauth2code?: string | undefined;
    }
}

export const sessionMiddleware = (app: Express): void => {
    app.set("trust proxy", 1);
    app.use(session({
        secret: "s3cr3t",
        name: "sessionId",
    }));
};