
const validTypesImage: Array<string> = ["jpeg", "jpg", "png", "gif"];

export default function ImageService() {

    const isValidTypeImage = (file: {name: string, mimetype: string}): boolean => { 
        const splittedFileName: Array<string> = file.name.split(".");
        const extensionFile: string = splittedFileName[1];

        if (!validTypesImage.includes(extensionFile)) {
            return false;
        }

        if (!file.mimetype.includes("image")) {
            return false;
        }

        return true;
    };

    return { isValidTypeImage };
}