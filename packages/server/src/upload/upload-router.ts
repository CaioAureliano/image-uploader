import { Router } from "express";
import { OAuth2Client } from "google-auth-library";
import UploadHandler from "./upload-handler";

export default function UploadRouter(client: OAuth2Client) {

    const router = Router();

    router.post("/upload", UploadHandler(client).uploadImage);
    router.get("/image", UploadHandler(client).getImage);

    return router;
}