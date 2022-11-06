import { Router } from "express";
import AuthHandler from "./auth-handler";

export default function AuthRouter() {

    const router = Router();    

    router.get("/authorize", AuthHandler().getAuthorizeUrl);
    router.get("/authenticate", AuthHandler().authenticateOAuth2Client);

    return router;
}