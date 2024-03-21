import express from "express";
import {AdminController} from "./admin.controllers";

const router = express.Router();

router.get("/", AdminController.getAllFromDB);
router.get("/:id", AdminController.getByIdFromDB);
export const adminRoutes = router;
