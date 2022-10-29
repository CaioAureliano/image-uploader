import express from "express";
import GoogleOAuth2Client from "./client";
import AuthRouter from "./auth/auth-router";
import UploadRouter from "./upload/upload-router";

const app = express();
const client = GoogleOAuth2Client();

app.use(AuthRouter(client));
app.use(UploadRouter(client));

export default app;