import { OAuth2Client } from "google-auth-library";
import { GetTokenResponse } from "google-auth-library/build/src/auth/oauth2client";
import GoogleOAuth2Client from "../client";

export default function AuthService() {
    
    const generateGoogleAuthorizeUrl = (): string => {
        const client: OAuth2Client = GoogleOAuth2Client();
        return client.generateAuthUrl({
            access_type: "offline",
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
            console.error(error);
            throw new Error("error to authenticate");
        }
    };

    return { generateGoogleAuthorizeUrl, authenticate };
}