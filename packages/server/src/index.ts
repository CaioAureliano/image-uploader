import express from "express";
import GoogleOAuth2Client from "./client";
import authRouter from "./auth/auth-router";

const app = express();
const client = GoogleOAuth2Client();

app.use(authRouter(client));

export default app;