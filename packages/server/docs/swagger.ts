import swaggerJSDoc from "swagger-jsdoc";

const options = {
    swaggerDefinition: {
        openapi: "3.0.3",
        info: {
            title: "Image Uploader",
            version: "1.0.0",
            description: "Rest API from Image Uploader with Google Drive",
        },
    },
    apis: ["./src/*/routes/*.ts"],
};

export const swaggerSpecs = swaggerJSDoc(options);