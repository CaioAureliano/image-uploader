import { createClient, RedisClientType, RedisDefaultModules, RedisModules, RedisFunctions, RedisScripts } from "redis";
import logger from "pino";
import config from "../config/index";

export default function Database() {

    const connection = async (): Promise<RedisClientType<RedisDefaultModules & RedisModules, RedisFunctions, RedisScripts>>  => {
        const client = createClient(config.databaseOptions);
        client.on("error", handlerError);
        await client.connect();
        return client;
    };

    const handlerError = (...args: any[]): void => {
        logger().error(args);
        throw new Error("error to redis connection");
    };

    return { connection };
}