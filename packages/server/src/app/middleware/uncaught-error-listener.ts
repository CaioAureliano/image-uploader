export const uncaughtErrorListener = (err: Error): void => {
    console.error(err);
    process.exit(1);
};