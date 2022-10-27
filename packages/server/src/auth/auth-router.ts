import { Router } from "express";
import { OAuth2Client } from "google-auth-library";
import AuthHandler from "./auth-handler";

export default function AuthRouter(client: OAuth2Client) {

    const router = Router();    

    router.get("/authorize", AuthHandler(client).getAuthorizeUrl);
    router.get("/authenticate", AuthHandler(client).authenticateOAuth2Client);

    return router;
}