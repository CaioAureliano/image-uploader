import { GaxiosResponse } from "gaxios";
import { OAuth2Client } from "google-auth-library";
import { drive_v3 } from "googleapis";
import DriveService from "./drive-service";

export interface UploadedImage {
    name: string;
    mimetype: string;
    tempFilePath: string;
}

export default function UploadService(client: OAuth2Client) {

    const uploadFileToDrive = async (image: UploadedImage): Promise<void> => {

        const driveService: drive_v3.Drive = DriveService().build(client);
    
        try {
            const driveResponse: GaxiosResponse<drive_v3.Schema$File> = await driveService.files.create({
                requestBody: DriveService().buildFileMetadata(image),
                media: DriveService().buildMedia(image),
                fields: "id,name,appProperties",
            });

            if (driveResponse.status !== 200) {
                throw new Error("error to create file");
            }

        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    return { uploadFileToDrive };
}