
import config from "../../config/environment.config";
import { Server } from "http";
import { logger } from "../logger/logger";
import app from "./application.base";

export const start = (): Promise<Server> => {
    return new Promise((resolve, reject) => {
        try {
            const connection = app.listen(config.port, () => logger.info("Server started"));
            resolve(connection);
        } catch (error) {
            logger.error(error);
            reject(error);
        }
    });
};

export const stop = (connection: Server): Promise<void> => {
    return new Promise((resolve, reject) => {
        try {
            logger.info("Server stopping...");
            connection.close(() => resolve());
        } catch (error) {
            logger.error(error);
            reject(error);
        }
    });
};