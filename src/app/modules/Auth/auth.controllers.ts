import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import {AuthServices} from "./auth.services";
import {Request} from "express";

const logInUser = catchAsync(async (req, res) => {
  const result = await AuthServices.logInUser(req.body);
  const {refreshToken} = result;
  res.cookie("refreshToken", refreshToken, {
    secure: false,
    httpOnly: true,
  });
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Logged In Successfully!",
    data: {
      accessToken: result.accessToken,
      needPasswordChange: result.needPasswordChange,
    },
  });
});
const refreshToken = catchAsync(async (req, res) => {
  const {refreshToken} = req.cookies;
  const result = await AuthServices.refreshToken(refreshToken);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "AccessToken Generate Successfully!",
    data: result,
  });
});

const changePassword = catchAsync(async (req: Request & {user?: any}, res) => {
  const user = req.user;

  const result = await AuthServices.changePassword(user, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Password Changed Successfully!",
    data: result,
  });
});

const forgotPassword = catchAsync(async (req, res) => {
  await AuthServices.forgotPassword(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Check Your Email",
    data: null,
  });
});

const resetPassword = catchAsync(async (req, res) => {
  const token = req.headers.authorization || "";
  await AuthServices.resetPassword(token, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Password Reset!",
    data: null,
  });
});
export const AuthController = {
  logInUser,
  refreshToken,
  changePassword,
  forgotPassword,
  resetPassword,
};
