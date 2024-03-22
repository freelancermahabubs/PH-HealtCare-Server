import {AdminService} from "./admin.services";
import pick from "../../../shared/pick";
import {adminFilterAbleFields} from "./admin.constant";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";


const getAllFromDB = catchAsync(async (req, res) => {
  const filters = pick(req.query, adminFilterAbleFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  const result = await AdminService.getAllFromDB(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All admin Retrived Successfully",
    meta: result.meta,
    data: result.data,
  });
});
const getByIdFromDB = catchAsync(async (req, res) => {
  const {id} = req.params;
  const result = await AdminService.getByIdFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Single Admin Retrived Successfully!",
    data: result,
  });
});

const updateIntoDB = catchAsync(async (req, res) => {
  const {id} = req.params;
  const result = await AdminService.updateIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin Data Updated Successfully",
    data: result,
  });
});
const deleteFromDB = catchAsync(async (req, res) => {
  const {id} = req.params;
  const result = await AdminService.deleteFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin Data Deleted Successfully!",
    data: result,
  });
});
const softDeleteFromDB = catchAsync(async (req, res) => {
  const {id} = req.params;
  const result = await AdminService.deleteFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin Data Soft Deleted Successfully!",

    data: result,
  });
});
export const AdminController = {
  getAllFromDB,
  getByIdFromDB,
  updateIntoDB,
  deleteFromDB,
  softDeleteFromDB,
};
