import { Router } from "express";
import { AuthRouter } from "../../modules/auth/routes/auth-router";
import { UploadRouter } from "../../modules/upload/upload.routes";
import errorHandler from "../middleware/error-handler";

export const router = (): Router => {
    const router: Router = Router();
    
    AuthRouter(router);
    UploadRouter.resolve(router);

    router.use(errorHandler);

    return router;
};