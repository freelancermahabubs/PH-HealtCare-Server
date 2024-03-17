import {Request, Response} from "express";
import {AdminService} from "./admin.services";

const getAllFromDB = async (req: Request, res: Response) => {
  try {
    const result = await AdminService.getAllFromDB(req.query);
    res.status(200).json({
      success: true,
      message: "Admin Retrived Successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error?.name || "Something went wrong",
      error: error,
    });
  }
};

export const AdminController = {
  getAllFromDB,
};
