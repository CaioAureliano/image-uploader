import * as dotenv from "dotenv";
import { OAuth2ClientOptions } from "google-auth-library";
dotenv.config();

export interface AppConfiguration {
    googleOAuth2ClientOptions: OAuth2ClientOptions
}

const config: AppConfiguration = {
    googleOAuth2ClientOptions: {
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        redirectUri: process.env.GOOGLE_REDIRECT_ENDPOINT,
    },
};

export default config;