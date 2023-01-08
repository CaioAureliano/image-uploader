import { OAuth2Client } from "google-auth-library";
import { GetTokenResponse } from "google-auth-library/build/src/auth/oauth2client";
import { logger } from "../../../app/logger/logger";
import GoogleOAuth2Client from "../google-oauth2.client";

const generateGoogleAuthorizeUrl = (): string => {
    const client: OAuth2Client = GoogleOAuth2Client();
    return client.generateAuthUrl({
        scope: [
            "https://www.googleapis.com/auth/drive.appdata",
        ],
    });
};

const authenticate = async (code: string): Promise<OAuth2Client> => {
    try {
        const oauth2Client: OAuth2Client = GoogleOAuth2Client();
        const tokenResponse: GetTokenResponse = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(tokenResponse.tokens);
        return oauth2Client;
    } catch (error) {
        logger.error(error);
        throw new Error("error to authenticate");
    }
};

export const UserService = {
    generateGoogleAuthorizeUrl,
    authenticate,
};