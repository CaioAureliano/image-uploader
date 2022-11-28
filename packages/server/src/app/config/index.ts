import * as dotenv from "dotenv";
import { OAuth2ClientOptions } from "google-auth-library";
dotenv.config();

export interface AppConfiguration {
    port: number;
    googleOAuth2ClientOptions: OAuth2ClientOptions;
    sessionOptions: SessionConfiguration;
    databaseOptions: { url: string | undefined };
}

export interface SessionConfiguration {
    name: string | undefined;
    secret: string | string[];
    resave?: boolean | undefined;
    saveUninitialized?: boolean | undefined;
}

const config: AppConfiguration = {
    port: Number(process.env.PORT),
    googleOAuth2ClientOptions: {
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        redirectUri: process.env.GOOGLE_REDIRECT_ENDPOINT,
    },
    sessionOptions: {
        name: process.env.SESSION_NAME,
        secret: process.env.SESSION_SECRET!,
        resave: false,
        saveUninitialized: true
    },
    databaseOptions: {
        url: process.env.REDIS_URL,
    },
};

export default config;