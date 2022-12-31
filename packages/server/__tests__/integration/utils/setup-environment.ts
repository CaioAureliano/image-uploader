import { exec } from "node:child_process";
import { Server } from "http";
import { start, stop } from "../../../src/app/server";

export const setup = async (): Promise<Server> => {
    try {
        exec("docker compose up --build -d cache");
        return await start();
    } catch (error: any) {
        throw Error(error);
    }
};

export const destroy = async (api: Server): Promise<void> => {
    exec("docker compose down");
    await stop(api);
};