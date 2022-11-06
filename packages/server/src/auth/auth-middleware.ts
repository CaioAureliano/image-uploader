import { Request, Response, NextFunction } from "express";

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const code: string | undefined = req.header("X-OAuth2-Code");
    if (!code) {
        throw new Error("unauthorized");
    }
    req.session.oauth2code = code;
    next();
};