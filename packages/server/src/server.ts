import app from "./app/app";
import config from "./app/config";
import logger from "pino";
import { Server } from "http";

export const init = (): Promise<Server> => {
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