import { Request, Response } from "express";
import { FileArray, UploadedFile } from "express-fileupload";
import { OAuth2Client } from "google-auth-library";
import FileService from "./file-service";
import ImageService from "./image-service";
import UploadService from "./upload-service";

export default function UploadHandler(client: OAuth2Client) {

    const uploadImage = async (req: Request, res: Response): Promise<void> => {

        const filesUploaded: FileArray = req.files!;
        if (!filesUploaded.image) {
            throw new Error("not found file");
        }

        const imgUploaded: UploadedFile | UploadedFile[] = filesUploaded.image;
        if (Array.isArray(imgUploaded)) {
            throw new Error("bad request with multiple files, send only one at a time");
        }

        if (!ImageService().isValidTypeImage(imgUploaded)) {
            throw new Error("invalid file type, only image files are valid");
        }

        if (!FileService().isValidSize(imgUploaded)) {
            throw new Error("large file size, only allowed file size less than 5MB");
        }
        
        const imgToSave: UploadedFile = imgUploaded as UploadedFile;
        await UploadService(client).uploadImageToDrive(imgToSave);

        res.status(201).end();
    };

    return { uploadImage };
}