import Database from "../database/redis";

export default function UploadRepository() {

    const create = async (key: string, value: string): Promise<void> => {
        const client = await Database().connection();
        await client.set(key, value);
        await client.disconnect();
    };

    return { create };
}