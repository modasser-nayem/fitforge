import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { TUserRole } from "../types/global";

export type TSignTokenPayload = {
  id: string;
  role: TUserRole;
};

const signAccessToken = (payload: TSignTokenPayload) => {
  return jwt.sign(payload, config.JWT_ACCESS_SECRET, {
    expiresIn: config.JWT_ACCESS_EXPIRES_IN as "5d",
  });
};

const verifyAccessToken = (token: string) => {
  return jwt.verify(token, config.JWT_ACCESS_SECRET) as JwtPayload &
    TSignTokenPayload;
};

const jwtHelper = {
  signAccessToken,
  verifyAccessToken,
};
export default jwtHelper;
