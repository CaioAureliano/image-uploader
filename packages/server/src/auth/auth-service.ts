import { OAuth2Client } from "google-auth-library";
import { GetTokenResponse } from "google-auth-library/build/src/auth/oauth2client";

export default function AuthService(client: OAuth2Client) {
    
    const generateGoogleAuthorizeUrl = (): string => {
        return client.generateAuthUrl({
            access_type: "offline",
            scope: [
                "https://www.googleapis.com/auth/drive.appdata",
            ],
        });
    };

    const authenticate = async (code: string): Promise<void> => {
        try {
            const tokenResponse: GetTokenResponse = await client.getToken(code);
            client.setCredentials(tokenResponse.tokens);
        } catch (error) {
            console.error(error);
        }
    };

    return { generateGoogleAuthorizeUrl, authenticate };
}