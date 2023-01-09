import { execSync } from "node:child_process";
import { Server } from "http";
import { start, stop } from "../../../../src/libs/application/server";

const DOCKER_COMPOSE_FILE = __dirname + "/docker-compose.test.yml";

export const setup = async (): Promise<Server> => {
    try {
        execSync(`docker compose -f ${DOCKER_COMPOSE_FILE} up --build -d cache`);
        return await start();
    } catch (error: any) {
        throw Error(error);
    }
};

export const destroy = async (api: Server): Promise<void> => {
    execSync(`docker compose -f ${DOCKER_COMPOSE_FILE} down`);
    await stop(api).catch((error) => console.log("error to try destroy server ", JSON.stringify(error)));
};