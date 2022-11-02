import { GaxiosResponse } from "gaxios";
import { OAuth2Client } from "google-auth-library";
import { drive_v3 } from "googleapis";
import DriveService from "./drive-service";

export interface UploadedImage {
    name: string;
    mimetype: string;
    tempFilePath: string;
}

export interface ImageResponse {
    id?: string | undefined | null;
    name?: string | undefined | null;
    appProperties?: { [k: string]: string } | null;
    thumbnailLink?: string | null;
}

export default function UploadService(client: OAuth2Client) {

    const uploadImageToDrive = async (image: UploadedImage): Promise<ImageResponse> => {
        
        const driveService = DriveService();

        const drive: drive_v3.Drive = driveService.build(client);
    
        try {
            const driveResponse: GaxiosResponse<drive_v3.Schema$File> = await drive.files.create({
                requestBody: driveService.buildFileMetadata(image),
                media: driveService.buildMedia(image),
                fields: "id",
            });

            if (!driveResponse.status || driveResponse.status !== 200) {
                console.log(driveResponse);
                throw new Error("error to create file");
            }

            const id: string = driveResponse.data.id!;
            const imageUploaded = await getUploadedImageFromDriveById(drive, id);
            
            return imageUploaded.data;

        } catch (error) {
            console.error(error);
            throw new Error("error to upload file");
        }
    };

    const getUploadedImageFromDriveById = async (drive: drive_v3.Drive, id: string): Promise<GaxiosResponse<drive_v3.Schema$File>> => {
        try {
            return await drive.files.get({
                fileId: id,
                fields: "id,name,appProperties,thumbnailLink,imageMediaMetadata",
            });
        } catch (error) {
            console.error(error);
            throw new Error("not found file");
        }
    };

    return { uploadImageToDrive, getUploadedImageFromDriveById };
}