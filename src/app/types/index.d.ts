import { JwtPayload } from "jsonwebtoken";
import { TSignTokenPayload } from "../utils/jwt";

declare global {
  namespace Express {
    interface Request {
      user: JwtPayload & TSignTokenPayload;
    }
  }
}
