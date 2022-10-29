import { Request, Response } from "express";
import { OAuth2Client } from "google-auth-library";
import UploadService from "./upload-service";

export default function UploadHandler(client: OAuth2Client) {

    const uploadImage = async (req: Request, res: Response): Promise<void> => {

        await UploadService(client).uploadFileToDrive();

        res.send("created");
    };

    return { uploadImage };
}