import logger from "pino";

export const uncaughtErrorListener = (err: Error): void => {
    logger().error(err);
    process.exit(1);
};