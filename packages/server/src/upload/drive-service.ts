import { UploadedImage } from "./upload-service";
import { v4 as uuid} from "uuid";
import fs, { ReadStream } from "node:fs";
import { OAuth2Client } from "google-auth-library";
import { drive_v3, google } from "googleapis";

export interface FileMetadata {
    name: string;
    parents: Array<string>;
    appProperties: { [k: string]: string };
}

export interface FileMediaDrive {
    mimeType: string;
    body: ReadStream
}

export default function DriveService() {

    const buildFileMetadata = (image: UploadedImage): FileMetadata => {
        return {
            name: new Date().getMilliseconds().toString(),
            parents: ["appDataFolder"],
            appProperties: {
                "_id": uuid(),
                "originalName": image.name,
            },
        };
    };

    const buildMedia = (image: UploadedImage): FileMediaDrive => {
        return {
            mimeType: image.mimetype,
            body: fs.createReadStream(image.tempFilePath),
        };
    };

    const build = (client: OAuth2Client): drive_v3.Drive => {
        return google.drive({ version: "v3", auth: client });
    };

    return { buildFileMetadata, buildMedia, build };
}