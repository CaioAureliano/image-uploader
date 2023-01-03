import { afterAll, afterEach, beforeAll, describe, expect, test } from "@jest/globals";
import { Server } from "http";
import path from "node:path";
import request from "supertest";
import { Response } from "superagent";
import { destroy, setup } from "./utils/env/setup-environment";
import { getFileGoogleApiRequestMock, GOOGLE_RESPONSE_ID_MOCK, GOOGLE_RESPONSE_THUMBNAILLINK_MOCK, setupMockRequests, tokenGoogleApiRequestMock, uploadGoogleApiRequestMock } from "./utils/mock/http/googleapi.mock";
import { repositoryCacheTest } from "./utils/repository/repository-integration-test";

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

        afterEach(async () => {
            await repositoryCacheTest.cleanDatabase();
        });

        describe("POST", () => {

            test("when upload valid file should be return 201 status and cache image link", async () => {
                tokenGoogleApiRequestMock();
                uploadGoogleApiRequestMock();
                getFileGoogleApiRequestMock();

                const response: Response = await request(api)
                    .post("/image")
                    .set("X-OAuth2-Code", "oauth2GoogleApiTestMock")
                    .attach("image", path.join(__dirname, "/utils/assets/jest.png"));

                expect(response.status).toBe(201);
                expect(response.body.id).toBeDefined();
                expect(response.body.thumbnailLink).toBeDefined();
                expect(await repositoryCacheTest.getByKey(GOOGLE_RESPONSE_ID_MOCK)).toBe(GOOGLE_RESPONSE_THUMBNAILLINK_MOCK);
            });
        });
    });    
});