import type {Config} from "jest";

export const config: Config = {
    preset: "ts-jest",
    testEnvironment: "node",
    testMatch: ["**/__tests__/**/**.test.ts?(x)"],
};

export default config;