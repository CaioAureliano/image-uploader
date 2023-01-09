import cache from "../../../../src/libs/database/redis";

const cleanDatabase = async (): Promise<void> => {
    const client = await cache().connection();
    await client.sendCommand(["FLUSHALL"]);
    await client.disconnect();
};

const getByKey = async (key: string): Promise<string> => {
    const client = await cache().connection();
    const result: string = await client.get(key) as string;
    await client.disconnect();
    return result;
};

export const repositoryCacheTest = {
    cleanDatabase,
    getByKey,
};