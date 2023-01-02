import { afterAll, beforeAll, describe, expect, test } from "@jest/globals";
import { Server } from "http";
import path from "node:path";
import request from "supertest";
import { destroy, setup } from "./utils/env/setup-environment";
import { getFileGoogleApiRequestMock, setupMockRequests, tokenGoogleApiRequestMock, uploadGoogleApiRequestMock } from "./utils/mock/http/googleapi.mock";

describe("Upload [Integration]", () => {
    describe("/image", () => {

        let api: Server;

        beforeAll(async () => {
            api = await setup();
            setupMockRequests();
        });

        afterAll(async () => {
            await destroy(api);
        });

        describe("POST", () => {

            test("when upload valid file should be return 201 status and cache image link", async () => {
                tokenGoogleApiRequestMock();
                uploadGoogleApiRequestMock();
                getFileGoogleApiRequestMock();

                const response = await request(api)
                    .post("/image")
                    .set("X-OAuth2-Code", "oauth2GoogleApiTest")
                    .attach("image", path.join(__dirname, "/utils/assets/jest.png"));

                expect(response.status).toBe(201);
            });
        });
    });    
});