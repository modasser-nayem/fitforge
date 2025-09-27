import { NextFunction, Request, Response } from "express";
import AppError from "../errors/AppError";
import { asyncHandler } from "../utils/asyncHandler";
import jwtHelper from "../utils/jwt";
import { TUserRole } from "../types/global";

export const authorize = (...roles: TUserRole[]) => {
  return asyncHandler(
    async (req: Request, _res: Response, next: NextFunction) => {
      const token = req.headers.authorization;
      if (!token) throw new AppError(401, "Unauthorized access");

      const decoded = jwtHelper.verifyAccessToken(token);
      if (!decoded) throw new AppError(401, "invalid access token");

      if (roles.length && !roles.includes(decoded.role)) {
        throw new AppError(
          403,
          `You must be an ${decoded.role.toLowerCase()} to perform this action.`,
        );
      }

      req.user = decoded;
      next();
    },
  );
};
