import express from "express";
import {AdminController} from "./admin.controllers";

const router = express.Router();

router.get("/", AdminController.getAllFromDB);
export const adminRoutes = router;
