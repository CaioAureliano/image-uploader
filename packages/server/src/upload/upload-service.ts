import { OAuth2Client } from "google-auth-library";
import { drive_v3, google } from "googleapis";
import { v4 as uuid } from "uuid";
import fs from "node:fs";
import { GaxiosResponse } from "gaxios";

export interface UploadedImage {
    name: string;
    mimetype: string;
    tempFilePath: string;
}

export default function UploadService(client: OAuth2Client) {

    const uploadFileToDrive = async (image: UploadedImage): Promise<void> => {
        const driveService = google.drive({ version: "v3", auth: client });
        const fileMetadata = {
            name: new Date().getMilliseconds().toString(),
            parents: ["appDataFolder"],
            appProperties: {
                "_id": uuid(),
                "originalName": image.name,
            },
        };

        const media = {
            mimeType: image.mimetype,
            body: fs.createReadStream(image.tempFilePath),
        };
    
        try {
            const driveResponse: GaxiosResponse<drive_v3.Schema$File> = await driveService.files.create({
                requestBody: fileMetadata,
                media: media,
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