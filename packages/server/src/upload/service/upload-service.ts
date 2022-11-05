import { OAuth2Client } from "google-auth-library";
import { drive_v3 } from "googleapis";
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

export default function UploadService(client: OAuth2Client) {

    const uploadImageToDrive = async (image: UploadedImage): Promise<UploadedResponse> => {
        const driveService = DriveService();
        const drive: drive_v3.Drive = driveService.build(client);

        try {
            const imageResponse: ImageResponse = await driveService.sendImageToDrive(drive, image);
            const imageUploaded: ImageUploaded = await driveService.getUploadedImageFromDriveById(drive, imageResponse.id!);
            await UploadRepository().create(imageResponse.id!, driveService.getDriveImageLinkFromThumbnailLink(imageUploaded.thumbnailLink!));
            return { id: imageUploaded.id!, thumbnailLink: imageUploaded.thumbnailLink! };
        } catch (error) {
            console.error(error);
            throw new Error("error to upload file");
        }
    };

    const getUploadedImageLinkById = async (fileId: string): Promise<string> => {
        return await UploadRepository().get(fileId);
    };

    return { uploadImageToDrive, getUploadedImageLinkById };
}