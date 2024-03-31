import {userService} from "./user.services";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import {userFilterAbleFields} from "./user.constant";
import {Request} from "express";
import {IAuthUser} from "../../interfaces/common";

const createAdmin = catchAsync(async (req, res) => {
  const result = await userService.createAdmin(req);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Admin Created Successfully!",
    data: result,
  });
});

const createDoctor = catchAsync(async (req, res) => {
  const result = await userService.createDoctor(req);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Doctor Created Successfully!",
    data: result,
  });
});

const createPatient = catchAsync(async (req, res) => {
  const result = await userService.createPatient(req);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Patient Created successfuly!",
    data: result,
  });
});
const getAllFromDB = catchAsync(async (req, res) => {
  const filters = pick(req.query, userFilterAbleFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  const result = await userService.getAllFromDB(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All User Retrived Successfully",
    meta: result.meta,
    data: result.data,
  });
});

const changeProfileStatus = catchAsync(async (req, res) => {
  const {id} = req.params;
  const result = await userService.changeProfileStatus(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Users profile status changed!",
    data: result,
  });
});

const getMyProfile = catchAsync(
  async (req: Request & {user?: IAuthUser}, res) => {
    const user = req.user;

    const result = await userService.getMyProfile(user as IAuthUser);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "My profile data fetched!",
      data: result,
    });
  }
);

const updateMyProfie = catchAsync(
  async (req: Request & {user?: IAuthUser}, res) => {
    const user = req.user;

    const result = await userService.updateMyProfie(user as IAuthUser, req);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "My profile updated!",
      data: result,
    });
  }
);
export const UserController = {
  createAdmin,
  createDoctor,
  createPatient,
  getAllFromDB,
  changeProfileStatus,
  getMyProfile,
  updateMyProfie,
};
