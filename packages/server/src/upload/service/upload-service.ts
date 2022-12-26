import { OAuth2Client } from "google-auth-library";
import { drive_v3 } from "googleapis";
import { logger } from "../../app/logger/logger";
import AuthService from "../../auth/auth-service";
import UploadRepository from "../repository/upload-repository";
import DriveService, { ImageResponse, ImageUploaded } from "./drive-service";

export interface UploadedImage {
    name: string;
    mimetype: string;
    tempFilePath: string;
}

export interface UploadedResponse {
    id: string;
    thumbnailLink: string;
}

export default function UploadService() {

    const uploadImageToDrive = async (image: UploadedImage, oauth2code: string): Promise<UploadedResponse> => {
        const oauth2Client: OAuth2Client = await AuthService().authenticate(oauth2code);

        const driveService = DriveService();
        const drive: drive_v3.Drive = driveService.build(oauth2Client);

        try {
            const imageResponse: ImageResponse = await driveService.sendImageToDrive(drive, image);
            const imageUploaded: ImageUploaded = await driveService.getUploadedImageFromDriveById(drive, imageResponse.id!);
            await UploadRepository().create(imageResponse.id!, driveService.getDriveImageLinkFromThumbnailLink(imageUploaded.thumbnailLink!));
            return { id: imageUploaded.id!, thumbnailLink: imageUploaded.thumbnailLink! };
        } catch (error) {
            logger.error(error);
            throw new Error("error to upload file");
        }
    };

    const getUploadedImageLinkById = async (fileId: string): Promise<string> => {
        return await UploadRepository().get(fileId);
    };

    return { uploadImageToDrive, getUploadedImageLinkById };
}