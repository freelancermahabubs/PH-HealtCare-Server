import {userService} from "./user.services";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";

const createAdmin = catchAsync(async (req, res) => {
  const result = await userService.createAdmin(req);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Admin Created Successfully!",
    data: result,
  });
});

export const UserController = {
  createAdmin,
};
