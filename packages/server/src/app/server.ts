import app from "./app";
import config from "./config";
import logger from "pino";
import { Server } from "http";

export const start = (): Promise<Server> => {
    return new Promise((resolve, reject) => {
        try {
            const connection = app.listen(config.port, () => logger().info("server started"));
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