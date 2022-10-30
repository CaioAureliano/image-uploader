const validFileSizeInBytes: number = 5000000;

export default function FileService() {

    const isValidSize = (file: { size: number }): boolean => {
        if (file.size <= validFileSizeInBytes) {
            return true;
        }
        
        return false;
    };

    return { isValidSize };
}