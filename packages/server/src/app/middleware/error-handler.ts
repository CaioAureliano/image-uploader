import { Request, Response, NextFunction } from "express";
import HttpError from "../error/http-error";

export default function errorHandler(err: unknown, req: Request, res: Response, next: NextFunction): void {
    console.log(req);

    if (err instanceof HttpError) {
        console.error(err);
        res.status(err.code).send({ message: err.name, error: err.message });
        return;
    }

    next(err);
}