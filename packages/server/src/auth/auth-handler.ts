import { Request, Response } from "express";
import { OAuth2Client } from "google-auth-library";
import AuthService from "./auth-service";

export default function AuthHandler(client: OAuth2Client) {
    
    const authService = AuthService(client);

    const getAuthorizeUrl = (req: Request, res: Response): void => {
        const authorizeUrl = authService.generateGoogleAuthorizeUrl();
        res.send({ authorizeUrl });
    };

    const authenticateOAuth2Client = async (req: Request, res: Response): Promise<void> => {
        const { code } = req.query;
        await authService.authenticate(code as string);
        res.send({ message: "Authentication successful" });
    };

    return { getAuthorizeUrl, authenticateOAuth2Client };
}