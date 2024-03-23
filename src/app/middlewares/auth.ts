import {NextFunction, Request, Response} from "express";
import { jwtHelpers } from "../../helpars/jwtHelpers";
import config from "../../config";
import { Secret } from "jsonwebtoken";

const auth = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        throw new Error("You Are Not Authorized");
      }
      const verifiedUser = jwtHelpers.verifyToken(
        token,
        config.jwt.jwt_secret_key as Secret
      );
      if (roles.length && !roles.includes(verifiedUser.role)) {
        throw new Error("You Are Not Authorized");
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};

export default auth;
