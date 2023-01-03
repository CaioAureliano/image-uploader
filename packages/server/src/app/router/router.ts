import { Router } from "express";
import { AuthRouter } from "../../modules/auth/routes/auth-router";
import { UploadRouter } from "../../modules/upload/routes/upload-router";
import errorHandler from "../middleware/error-handler";

export const router = (): Router => {
    const router: Router = Router();
    
    AuthRouter(router);
    UploadRouter(router);

    router.use(errorHandler);

    return router;
};