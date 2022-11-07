import { Router } from "express";
import { AuthRouter } from "../../auth/auth-router";
import { UploadRouter } from "../../upload/upload-router";
import errorHandler from "../middleware/error-handler";

export const router = (): Router => {
    const router: Router = Router();
    AuthRouter(router);
    UploadRouter(router);
    router.use(errorHandler);
    return router;
};