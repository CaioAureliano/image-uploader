import { OAuth2Client } from "google-auth-library";
import { google } from "googleapis";
import fs from "node:fs";

export default function UploadService(client: OAuth2Client) {

    const uploadFileToDrive = async () => {
        const driveService = google.drive({ version: "v3", auth: client });
        const fileMetadata = {
            name: "test.json",
            parents: ["appDataFolder"],
        };

        const pathFile = __dirname + "/test.json";

        const media = {
            mimeType: "application/json",
            body: fs.createReadStream(pathFile),
        };
    
        try {
            await driveService.files.create({
                requestBody: fileMetadata,
                media: media,
                fields: "id",
            });            
        } catch (error) {
            console.error(error);
            throw error;
        }
    };


    return { uploadFileToDrive };
}