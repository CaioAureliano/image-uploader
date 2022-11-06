import { Router } from "express";
import { authMiddleware } from "../auth/auth-middleware";
import UploadHandler from "./upload-handler";

export default function UploadRouter() {

    const router = Router();

    router.post("/image", authMiddleware, UploadHandler().uploadImage);
    router.get("/image/:id", UploadHandler().getImage);

    return router;
}