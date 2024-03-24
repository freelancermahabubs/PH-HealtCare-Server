import express from "express";
import {AuthController} from "./auth.controllers";
import auth from "../../middlewares/auth";
import {UserRole} from "@prisma/client";

const router = express.Router();
router.post("/login", AuthController.logInUser);
router.post("/refresh-token", AuthController.refreshToken);
router.post(
  "/change-password",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.DOCTOR, UserRole.PATIENT),
  AuthController.changePassword
);

router.post("/forgot-password", AuthController.forgotPassword);
router.post("/reset-password", AuthController.resetPassword);

export const authRoutes = router;
