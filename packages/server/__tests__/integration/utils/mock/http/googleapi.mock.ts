import nock from "nock";

const OAUTH_GOOGLE_API_URL = "https://oauth2.googleapis.com";
const GOOGLE_API_URL = "https://www.googleapis.com";

export const GOOGLE_RESPONSE_ID_MOCK = "1234KeYiDMGoOgLeReSpOnSeMoCk";

export const GOOGLE_RESPONSE_THUMBNAILLINK_MOCK = "mock://thumbnail.link";

export const setupMockRequests = () => {
    nock.disableNetConnect();
    nock.enableNetConnect("127.0.0.1");
};

export const tokenGoogleApiRequestMock = () => {
    nock(OAUTH_GOOGLE_API_URL)
        .post("/token")
        .reply(200, {
            access_token: "mock.BearerToken",
            expires_in: 3518,
            scope: "https://www.googleapis.com/auth/drive.appdata",
            token_type: "Bearer"
        });
};

export const uploadGoogleApiRequestMock = () => {
    nock(`${GOOGLE_API_URL}/upload/drive/v3`)
        .post("/files?fields=id&uploadType=multipart",)
        .reply(200, { id: GOOGLE_RESPONSE_ID_MOCK });
};

export const getFileGoogleApiRequestMock = () => {
    nock(`${GOOGLE_API_URL}/drive/v3/files`)
        .get(`/${GOOGLE_RESPONSE_ID_MOCK}?fields=id%2Cname%2CappProperties%2CthumbnailLink%2CimageMediaMetadata`)
        .reply(200, {
            id: "a4123",
            thumbnailLink: GOOGLE_RESPONSE_THUMBNAILLINK_MOCK + "=123",
        });
};