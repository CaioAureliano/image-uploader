import { Request, Response, NextFunction } from "express";
import HttpError from "../error/http.error";
import { logger } from "../logger/logger";

export default function errorHandler(err: unknown, req: Request, res: Response, next: NextFunction): void {
    logger.error("middleware error");
    logger.error(err);

    if (err instanceof HttpError) {
        res.status(err.code).send({ message: err.name, error: err.message });
        return;
    }

    if (err instanceof Error) {
        res.status(500).send({ message: "Internal Server Error", error: err.message });
        return;
    }

    next(err);
}