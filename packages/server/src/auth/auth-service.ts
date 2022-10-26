import { OAuth2Client } from "google-auth-library";

export default function AuthService(client: OAuth2Client) {
    
    const generateGoogleAuthorizeUrl = (): string => {
        return client.generateAuthUrl({
            access_type: "offline",
            scope: ["https://www.googleapis.com/auth/userinfo.profile"],
        });
    };

    return { generateGoogleAuthorizeUrl };
}