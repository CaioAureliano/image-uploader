import Database from "../../../app/database/redis";

const create = async (key: string, value: string): Promise<void> => {
    const client = await Database().connection();
    await client.set(key, value);
    await client.disconnect();
};

const get = async (key: string): Promise<string> => {
    const client = await Database().connection();
    const imageLink: string = await client.get(key) as string;
    await client.disconnect();
    return imageLink;
};

export const UploadRepository = {
    create, 
    get,
};