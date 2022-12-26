import { createClient, RedisClientType, RedisDefaultModules, RedisModules, RedisFunctions, RedisScripts } from "redis";
import config from "../config/index";
import { logger } from "../logger/logger";

export default function Database() {

    const connection = async (): Promise<RedisClientType<RedisDefaultModules & RedisModules, RedisFunctions, RedisScripts>>  => {
        const client = createClient(config.databaseOptions);
        client.on("error", handlerError);
        await client.connect();
        return client;
    };

    const handlerError = (...args: any[]): void => {
        logger.info(args);
        throw new Error("error to redis connection");
    };

    return { connection };
}