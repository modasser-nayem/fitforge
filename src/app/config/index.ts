import dotenv from "dotenv";
import path from "path";
import { requireEnv, requireNumberEnv } from "../utils/validateEnv";

const envFile = process.env.NODE_ENV === "test" ? ".env.test" : ".env";
dotenv.config({ path: path.join(process.cwd(), envFile) });

export default {
  NODE_ENV: requireEnv("NODE_ENV"),
  PORT: requireEnv("PORT"),
  DB_URL: requireEnv("DATABASE_URL"),
  BCRYPT_SALT_ROUNDS: requireNumberEnv("BCRYPT_SALT_ROUNDS"),
  JWT_ACCESS_SECRET: requireEnv("JWT_ACCESS_SECRET"),
  JWT_ACCESS_EXPIRES_IN: requireEnv("JWT_ACCESS_EXPIRES_IN"),
  FRONTEND_URL: requireEnv("FRONTEND_URL"),
};
