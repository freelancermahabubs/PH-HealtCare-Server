import express, {NextFunction, Request, Response} from "express";
import {AdminController} from "./admin.controllers";
import validateRequest from "../../middlewares/validateRequest";
import {adminValidationSchemas} from "./admin.validation";

const router = express.Router();

router.get("/", AdminController.getAllFromDB);
router.get("/:id", AdminController.getByIdFromDB);
router.patch("/:id", validateRequest(adminValidationSchemas.update), AdminController.updateIntoDB);
router.delete("/:id", AdminController.deleteFromDB);
router.delete("/soft/:id", AdminController.softDeleteFromDB);
export const adminRoutes = router;
