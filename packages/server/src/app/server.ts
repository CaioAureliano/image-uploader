import app from "./app";
import config from "./config";
import { Server } from "http";
import { logger } from "./logger/logger";

export const start = (): Promise<Server> => {
    return new Promise((resolve, reject) => {
        try {
            const connection = app.listen(config.port, () => logger.info("Server started"));
            resolve(connection);
        } catch (error) {
            reject(error);
        }
    });
};

export const stop = (connection: Server): Promise<void> => {
    return new Promise((resolve, reject) => {
        try {
            connection.close(() => resolve());
        } catch (error) {
            reject(error);
        }
    });
};