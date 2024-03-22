import {NextFunction, Request, Response} from "express";
import {AdminService} from "./admin.services";
import pick from "../../../shared/pick";
import {adminFilterAbleFields} from "./admin.constant";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";

const getAllFromDB = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
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
  } catch (error) {
    next(error);
  }
};
const getByIdFromDB = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {id} = req.params;
  try {
    const result = await AdminService.getByIdFromDB(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Single Admin Retrived Successfully!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateIntoDB = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {id} = req.params;
  try {
    const result = await AdminService.updateIntoDB(id, req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Admin Data Updated Successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const deleteFromDB = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {id} = req.params;
  try {
    const result = await AdminService.deleteFromDB(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Admin Data Deleted Successfully!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const softDeleteFromDB = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {id} = req.params;
  try {
    const result = await AdminService.deleteFromDB(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Admin Data Soft Deleted Successfully!",

      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const AdminController = {
  getAllFromDB,
  getByIdFromDB,
  updateIntoDB,
  deleteFromDB,
  softDeleteFromDB,
};
