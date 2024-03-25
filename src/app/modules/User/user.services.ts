import {UserRole} from "@prisma/client";

import * as bcrypt from "bcrypt";
import prisma from "../../../shared/prisma";
import {fileUploader} from "../../../helpars/fileUploader";
import { IFile } from "../../interfaces/file";
const createAdmin = async (req: any) => {
  const file : IFile = req.file;
  if (file) {
    const uploadToCloudinary = await fileUploader.uploadToCloudinary(file);
    req.body.admin.profilePhoto = uploadToCloudinary?.secure_url
  }

  
  const hasedPassword: string = await bcrypt.hash(req.body.password, 12);

  const userData = {
    email: req.body.admin.email,
    password: hasedPassword,
    role: UserRole.ADMIN,
  };
  const result = await prisma.$transaction(async (transactionClient) => {
    await transactionClient.user.create({
      data: userData,
    });
    const createdAdminData = await transactionClient.admin.create({
      data: req.body.admin,
    });
    return createdAdminData;
  });
  return result;
};
export const userService = {
  createAdmin,
};
