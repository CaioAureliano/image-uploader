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

    const uploadImageToDrive = async (image: UploadedImage): Promise<void> => {
        
        const driveService = DriveService();

        const drive: drive_v3.Drive = driveService.build(client);
    
        try {
            const driveResponse: GaxiosResponse<drive_v3.Schema$File> = await drive.files.create({
                requestBody: driveService.buildFileMetadata(image),
                media: driveService.buildMedia(image),
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

    const getUploadedImageFromDrive = async (id: string): Promise<void> => {
        
        const drive: drive_v3.Drive = DriveService().build(client);
        
        try {
            const file = await drive.files.get({
                fileId: id,
                fields: "id,name,contentHints,imageMediaMetadata,thumbnailLink,exportLinks,linkShareMetadata,webContentLink,webViewLink",
            });
    
            console.log(file);
        } catch (error) {
            console.error(error);
            throw new Error("not found file");
        }
    };

    return { uploadImageToDrive, getUploadedImageFromDrive };
}