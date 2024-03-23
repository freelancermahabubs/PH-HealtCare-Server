import {UserStatus} from "@prisma/client";
import prisma from "../../../shared/prisma";
import * as bcrypt from "bcrypt";
import {jwtHelpers} from "../../../helpars/jwtHelpers";
import config from "../../../config";
import {Secret} from "jsonwebtoken";

const logInUser = async (payload: {email: string; password: string}) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
      status: UserStatus.ACTIVE,
    },
  });
  const isCorrectPassword: boolean = await bcrypt.compare(
    payload.password,
    userData.password
  );

  if (isCorrectPassword) {
    throw new Error("Password incorrect!");
  }
  const accessToken = jwtHelpers.generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    config.jwt.jwt_secret_key as Secret,
    config.jwt.expires_in as string
  );
  const refreshToken = jwtHelpers.generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    config.jwt.refresh_token_secret_key as Secret,
    config.jwt.refresh_token_expires_in  as string
  );

  return {
    accessToken,
    refreshToken,
    needPasswordChange: userData.needPasswordChange,
  };
};

const refreshToken = async (token: string) => {
  let decodedData;
  try {
      decodedData = jwtHelpers.verifyToken(token, config.jwt.refresh_token_secret_key as Secret);
  }
  catch (err) {
      throw new Error("You are not authorized!")
  }

  const userData = await prisma.user.findUniqueOrThrow({
      where: {
          email: decodedData.email,
          status: UserStatus.ACTIVE
      }
  });

  const accessToken = jwtHelpers.generateToken({
      email: userData.email,
      role: userData.role
  },
      config.jwt.jwt_secret_key as Secret,
      config.jwt.expires_in as string
  );

  return {
      accessToken,
      needPasswordChange: userData.needPasswordChange
  };

};
export const authService = {
  logInUser,
  refreshToken,
};