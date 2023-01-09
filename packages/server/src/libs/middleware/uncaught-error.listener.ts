import { logger } from "../logger/logger";


export const uncaughtErrorListener = (err: Error): void => {
    logger.error("uncaught error");
    logger.error(err);
    process.exit(1);
};