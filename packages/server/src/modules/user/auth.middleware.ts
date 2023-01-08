import { Request, Response, NextFunction } from "express";
import HttpError from "../../app/error/http-error";

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const code: string | undefined = req.header("X-OAuth2-Code");
    if (!code) {
        throw new HttpError(401, "Unauthorized: not found oauth2 code in headers");
    }
    req.session.oauth2code = code;
    next();
};