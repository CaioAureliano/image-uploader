import { Request, Response } from "express";
import HttpError from "../../libs/error/http.error";
import { UserService } from "./service/user.service";

const getAuthorizeUrl = (req: Request, res: Response): void => {
    const authorizeUrl = UserService.generateGoogleAuthorizeUrl();
    res.send({ authorizeUrl });
};

const authenticateOAuth2Client = async (req: Request, res: Response): Promise<void> => {
    const { code } = req.query;
    if (!code) {
        throw new HttpError(400, "Not Found authentication code from callback");
    }
    res.send({ code });
};

export const UserController = {
    getAuthorizeUrl, 
    authenticateOAuth2Client,
};