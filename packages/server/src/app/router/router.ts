import { Router } from "express";
import { UserRouter } from "../../modules/user/user.routes";
import { UploadRouter } from "../../modules/upload/upload.routes";
import errorHandler from "../middleware/error-handler";

export const router = (): Router => {
    const router: Router = Router();
    
    UserRouter.resolve(router);
    UploadRouter.resolve(router);

    router.use(errorHandler);

    return router;
};