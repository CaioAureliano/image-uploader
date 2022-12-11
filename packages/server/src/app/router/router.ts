import { Router } from "express";
import { AuthRouter } from "../../auth/routes/auth-router";
import { UploadRouter } from "../../upload/routes/upload-router";
import errorHandler from "../middleware/error-handler";

export const router = (): Router => {
    const router: Router = Router();
    AuthRouter(router);
    UploadRouter(router);
    router.use(errorHandler);
    return router;
};