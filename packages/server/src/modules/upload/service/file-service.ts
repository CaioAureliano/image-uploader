const validFileSizeInBytes: number = 5000000;

export default function FileService() {

    const isValidSize = (file: { size: number }): boolean => file.size <= validFileSizeInBytes;

    return { isValidSize };
}