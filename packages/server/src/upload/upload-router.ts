import { Router } from "express";
import { authMiddleware } from "../auth/auth-middleware";
import UploadHandler from "./upload-handler";

export const UploadRouter = (router: Router): void => {
    router.post("/image", authMiddleware, UploadHandler().uploadImage);
    router.get("/image/:id", UploadHandler().getImage);
};