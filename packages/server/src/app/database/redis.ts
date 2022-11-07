import { createClient, RedisClientType, RedisDefaultModules, RedisModules, RedisFunctions, RedisScripts } from "redis";
import logger from "pino";

export default function Database() {

    const connection = async (): Promise<RedisClientType<RedisDefaultModules & RedisModules, RedisFunctions, RedisScripts>>  => {
        const client = createClient();
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