import session from "express-session";
import { Express } from "express";
import config from "../../config/environment.config";

declare module "express-session" {
    // eslint-disable-next-line no-unused-vars
    interface SessionData {
        oauth2code?: string | undefined;
    }
}

export const sessionMiddleware = (app: Express): void => {
    app.set("trust proxy", 1);
    app.use(session(config.sessionOptions));
};