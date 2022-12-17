import { NextFunction, Request, Response } from "express";

export const acceptHeaderMiddleware = (req: Request, res: Response, next: NextFunction) => {
    console.log("accept header");
    if (!req.accepts("application/json")) {
        res.status(406).send({ message: "Request not accept application/json MIME type in response" });
        return;
    }

    next();
};