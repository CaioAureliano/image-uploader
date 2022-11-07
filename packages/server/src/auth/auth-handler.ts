import { Request, Response } from "express";
import HttpError from "../app/error/http-error";
import AuthService from "./auth-service";

export default function AuthHandler() {
    
    const getAuthorizeUrl = (req: Request, res: Response): void => {
        const authorizeUrl = AuthService().generateGoogleAuthorizeUrl();
        res.send({ authorizeUrl });
    };

    const authenticateOAuth2Client = async (req: Request, res: Response): Promise<void> => {
        const { code } = req.query;
        if (!code) {
            throw new HttpError(400, "Not Found authentication code from callback");
        }
        res.send({ code });
    };

    return { getAuthorizeUrl, authenticateOAuth2Client };
}