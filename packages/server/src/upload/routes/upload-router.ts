import { Router } from "express";
import { authMiddleware } from "../../auth/auth-middleware";
import UploadHandler from "../upload-handler";

/**
 * @swagger
 *  tags:
 *      name: Upload
 *      description: upload image and get uploaded image
 * 
 */
export const UploadRouter = (router: Router): void => {
    /**
     * @swagger
     * /image:
     *  post:
     *    summary: upload file
     *    tags: [Upload]
     *    requestBody:
     *      required: true
     *      content:
     *        multipart/form-data:
     *          schema:
     *            type: object
     *            properties:
     *              image:
     *                description: file to upload
     *                type: string 
     *                format: binary
     *    responses:
     *      201:
     *        description: id from image uploaded and created on google drive and link to thumbnail
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              properties:
     *                id:
     *                  description: id from google drive uploaded file
     *                  type: string
     *                thumbnailLink:
     *                  description: thumbnail link from google drive uploaded image
     *                  type: string
     *      400:
     *        description: bad request
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              properties:
     *                message:
     *                  description: error message
     *                  type: string
     *                error:
     *                  description: error trace
     *                  type: string
     *      500:
     *        description: unknow error
     */
    router.post("/image", authMiddleware, UploadHandler().uploadImage);

    /**
     * @swagger
     * /image/{id}:
     *  get:
     *   summary: get image url by id
     *   tags: [Upload]
     *   parameters:
     *      - in: path
     *        name: id
     *        description: ID from image created
     *        schema:
     *          type: string
     *        required: true
     *   produces: 
     *      - application/json
     *   responses:
     *      200:
     *          description: URL image from Google Drive
     *          content:
     *              application/json:
     *                  schema:
     *                      type: object
     *                      properties:
     *                          imageUrl:
     *                              description: url to image from Google Drive 
     *                              type: string
     *      404:
     *          description: image can not be found(invalid ID)
     *      500:
     *          description: unknow error
     * 
     */
    router.get("/image/:id", UploadHandler().getImage);
};