import { GaxiosResponse } from "gaxios";
import { OAuth2Client } from "google-auth-library";
import { drive_v3, google } from "googleapis";
import fs, { ReadStream } from "node:fs";
import { UploadedImage } from "./upload-service";
import logger from "pino";

export interface FileMetadata {
    name: string;
    parents: Array<string>;
    appProperties: { [k: string]: string };
}

export interface FileMediaDrive {
    mimeType: string;
    body: ReadStream
}

export interface ImageUploaded {
    id?: string | undefined | null;
    name?: string | undefined | null;
    appProperties?: { [k: string]: string } | null;
    thumbnailLink?: string | null;    
}

export interface ImageResponse {
    id?: string | undefined | null;
}

export default function DriveService() {
    
    const sendImageToDrive = async (drive: drive_v3.Drive, image: UploadedImage): Promise<ImageResponse> => {
        const driveResponse: GaxiosResponse<drive_v3.Schema$File> = await drive.files.create({
            requestBody: buildFileMetadata(image),
            media: buildMedia(image),
            fields: "id",
        });

        if (!driveResponse.status || driveResponse.status !== 200) {
            logger().info(driveResponse);
            throw new Error("error to create file");
        }

        return driveResponse.data;
    };

    const getUploadedImageFromDriveById = async (drive: drive_v3.Drive, fileId: string): Promise<ImageUploaded> => {
        const imageUploaded: GaxiosResponse<drive_v3.Schema$File> = await drive.files.get({
            fileId,
            fields: "id,name,appProperties,thumbnailLink,imageMediaMetadata",
        });
        return imageUploaded.data;
    };

    const getDriveImageLinkFromThumbnailLink = (thumbnailLink: string): string => {
        const thumbnailSpllited: Array<string> = thumbnailLink.split("=");
        return thumbnailSpllited[0];
    };

    const buildFileMetadata = (image: UploadedImage): FileMetadata => {
        return {
            name: new Date().getMilliseconds().toString(),
            parents: ["appDataFolder"],
            appProperties: {
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

    return { sendImageToDrive, getUploadedImageFromDriveById, getDriveImageLinkFromThumbnailLink, build };
}