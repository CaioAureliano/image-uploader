import { Request, Response } from "express";
import { FileArray, UploadedFile } from "express-fileupload";
import FileService from "./service/file-service";
import ImageService from "./service/image-service";
import UploadService, { UploadedResponse } from "./service/upload-service";
import logger from "pino";
import HttpError from "../app/error/http-error";

export default function UploadHandler() {

    const uploadImage = async (req: Request, res: Response): Promise<void> => {

        const filesUploaded: FileArray = req.files!;
        if (!filesUploaded.image) {
            throw new HttpError(400, "not found uploaded file");
        }

        const uploadedFile: UploadedFile | UploadedFile[] = filesUploaded.image;
        if (Array.isArray(uploadedFile)) {
            throw new HttpError(400, "Bad Request: multiple files, send only one at a time");
        }

        if (!FileService().isValidSize(uploadedFile)) {
            throw new HttpError(400, "large file size, only allowed file size less than 5MB");
        }

        if (!ImageService().isValidTypeImage(uploadedFile)) {
            throw new HttpError(400, "invalid file type, only image files are valid");
        }

        const code: string = req.session.oauth2code!;        
        const image: UploadedFile = uploadedFile as UploadedFile;

        const uploadedResponse: UploadedResponse = await UploadService().uploadImageToDrive(image, code);

        req.session.destroy(logger().error);
        res.status(201).send(uploadedResponse);
    };

    const getImage = async (req: Request, res: Response): Promise<void> => {

        if (!req.params || !req.params.id) {
            throw new HttpError(400, "bad request: not found file id");
        }

        const imageUrl: string = await UploadService().getUploadedImageLinkById(req.params.id);
        if (!imageUrl || imageUrl === "") {
            throw new HttpError(404, `not found image with id: ${req.params.id}`);
        }
        
        res.send({ imageUrl });
    };

    return { uploadImage, getImage };
}