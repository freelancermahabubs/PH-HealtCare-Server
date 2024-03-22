import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import {authService} from "./auth.services";

const logInUser = catchAsync(async (req, res) => {
  const result = await authService.logInUser(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Logged In Successfully!",
    data: result,
  });
});

export const AuthController = {
  logInUser,
};
