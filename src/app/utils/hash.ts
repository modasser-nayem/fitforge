import bcrypt from "bcrypt";
import config from "../config";

const hashPassword = async (plainTextPassword: string): Promise<string> => {
  return await bcrypt.hash(plainTextPassword, config.BCRYPT_SALT_ROUNDS);
};

const comparePassword = async (
  plainTextPassword: string,
  hashPassword: string,
): Promise<boolean> => {
  return await bcrypt.compare(plainTextPassword, hashPassword);
};

const passwordHelper = { hashPassword, comparePassword };
export default passwordHelper;
