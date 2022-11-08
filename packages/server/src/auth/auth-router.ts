import { Router } from "express";
import AuthHandler from "./auth-handler";

export const AuthRouter = (router: Router): void => {
    router.get("/authorize", AuthHandler().getAuthorizeUrl);
    router.get("/authenticate", AuthHandler().authenticateOAuth2Client);
};