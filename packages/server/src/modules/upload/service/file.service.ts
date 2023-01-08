const validFileSizeInBytes: number = 5000000;

const isValidSize = (file: { size: number }): boolean => file.size <= validFileSizeInBytes;

export const FileService = {
    isValidSize,
};