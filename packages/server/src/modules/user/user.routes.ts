import { Router } from "express";
import { UserController } from "./user.controller";

/**
 * @swagger
 *   tags:
 *     name: Auth
 *     description: authenticate and authorize Google account with Google API
 */
const resolve = (router: Router): void => {
    /**
     * @swagger
     *   /authorize:
     *     get:
     *       summary: get url to authenticate
     *       description: generate url with OAuth2 Google API to user connect your account from Google
     *       tags: [Auth]
     *       produces: 
     *         - application/json
     *       responses:
     *         200:
     *           description: get OAuth2 url Google authentication
     *           content:
     *             application/json:
     *               schema:
     *                 type: object
     *                 properties:
     *                    authorizeUrl:
     *                      description: OAuth2 Google API url to login
     *                      type: string
     */
    router.get("/authorize", UserController.getAuthorizeUrl);

    /**
     * @swagger
     *   /authenticate:
     *     get:
     *       summary: callback to OAuth2 Google
     *       description: Google API responses with code on callback after user login and authorize your account
     *       tags: [Auth]
     *       produces:
     *         - application/json
     *       responses:
     *         200:
     *           description: authentication code from OAuth Google to request Google API
     *           content:
     *             application/json:
     *               schema:
     *                 type: object
     *                 properties:
     *                   code:
     *                     description: code to request Google API 
     *                     type: string
     *         400:
     *             description: not found authentication code
     */
    router.get("/authenticate", UserController.authenticateOAuth2Client);
};

export const UserRouter = {
    resolve,
};