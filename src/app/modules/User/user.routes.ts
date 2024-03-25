import express, {NextFunction, Request, Response} from "express";
import {UserController} from "./user.controller";
import auth from "../../middlewares/auth";
import {UserRole} from "@prisma/client";

import {fileUploader} from "../../../helpars/fileUploader";
import {userValidations} from "./user.validation";

const router = express.Router();

router.post(
  "/",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = userValidations.createAdmin.parse(JSON.parse(req.body.data));
    return UserController.createAdmin(req, res, next);
  }
);
export const userRoutes = router;
