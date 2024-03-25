import {Doctor, UserRole} from "@prisma/client";

import * as bcrypt from "bcrypt";
import prisma from "../../../shared/prisma";
import {fileUploader} from "../../../helpars/fileUploader";
import {IFile} from "../../interfaces/file";
import {Request} from "express";
const createAdmin = async (req: Request) => {
  const file = req.file as IFile;
  if (file) {
    const uploadToCloudinary = await fileUploader.uploadToCloudinary(file);
    req.body.admin.profilePhoto = uploadToCloudinary?.secure_url;
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

const crateDoctor = async (req: Request): Promise<Doctor> => {
  const file = req.file as IFile;
  if (file) {
    const uploadToCloudinary = await fileUploader.uploadToCloudinary(file);
    req.body.doctor.profilePhoto = uploadToCloudinary?.secure_url;
  }
  const hashedPassword: string = await bcrypt.hash(req.body.password, 12);
  const userData = {
    email: req.body.doctor.email,
    password: hashedPassword,
    role: UserRole.DOCTOR,
  };
  const result = await prisma.$transaction(async (transactionClient) => {
    await transactionClient.user.create({
      data: userData,
    });
    const crateDoctorData = await transactionClient.doctor.create({
      data: req.body.doctor,
    });
    return crateDoctorData;
  });
  return result;
};
export const userService = {
  createAdmin,
  crateDoctor,
};
