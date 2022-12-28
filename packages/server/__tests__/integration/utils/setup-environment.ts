import path from "node:path";
import compose from "docker-compose";
import { start } from "../../../src/app/server";
import { Server } from "http";

export const setup = async (): Promise<Server | void> => {
    compose.upOne("cache", { cwd: path.join(__dirname), log: true })
        .then(() => console.log("redis up"))
        .catch(console.error);

    return await start().catch(console.error);
};