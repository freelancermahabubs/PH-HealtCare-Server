import {Request, Response} from "express";
import {userService} from "./user.services";

const createAdmin = async (req: Request, res: Response) => {
  try {
    const result = await userService.createAdmin(req.body);
    res.status(201).json({
      success: true,
      message: "Admin Created Successfully!",
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

export const userController = {
  createAdmin,
};
