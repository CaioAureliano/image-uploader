import { OAuth2Client } from "google-auth-library";
import config from "../../libs/config";

export default function GoogleOAuth2Client(): OAuth2Client {
    return new OAuth2Client(config.googleOAuth2ClientOptions);
}