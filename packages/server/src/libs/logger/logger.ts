import pino, { Logger, LoggerOptions } from "pino";

export const logger: Logger<LoggerOptions> = pino();