import prisma from "../../db/connector";
import AppError from "../../errors/AppError";
import { TUserRole } from "../../types/global";
import passwordHelper from "../../utils/hash";
import jwtHelper from "../../utils/jwt";
import { TCreateAccount, TLogin } from "./auth.interface";

const createTrainee = async (payload: { data: TCreateAccount }) => {
  const { confirmPassword, ...userData } = payload.data;

  const createUser = await createUserIntoDB({ ...userData, role: "TRAINEE" });

  return createUser;
};

const createTrainer = async (payload: { data: TCreateAccount }) => {
  const { confirmPassword, ...userData } = payload.data;

  const createUser = await createUserIntoDB({ ...userData, role: "TRAINER" });

  return createUser;
};

const createAdmin = async (payload: { data: TCreateAccount }) => {
  const { confirmPassword, ...userData } = payload.data;

  const createUser = await createUserIntoDB({ ...userData, role: "ADMIN" });

  return createUser;
};

const login = async (payload: { data: TLogin }) => {
  // find user
  const user = await prisma.user.findUnique({
    where: { email: payload.data.email },
  });

  if (!user) {
    throw new AppError(404, "User not found");
  }

  // Verify password
  const isPasswordValid = await passwordHelper.comparePassword(
    payload.data.password,
    user.password,
  );
  if (!isPasswordValid) {
    throw new AppError(400, "Incorrect password!");
  }

  // Generate tokens
  const accessToken = jwtHelper.signAccessToken({
    id: user.id,
    role: user.role,
  });

  return {
    accessToken,
  };
};

const createUserIntoDB = async (payload: {
  name: string;
  email: string;
  photo?: string;
  password: string;
  role: TUserRole;
}) => {
  // Check if user already exists
  const existUser = await prisma.user.findUnique({
    where: { email: payload.email },
  });

  if (existUser) {
    throw new AppError(400, "User with this email already exists");
  }

  // Hashed Password
  payload.password = await passwordHelper.hashPassword(payload.password);

  const result = await prisma.$transaction(async (tran) => {
    const user = await tran.user.create({
      data: payload,
    });

    if (payload.role === "TRAINEE") {
      await tran.trainee.create({
        data: {
          userId: user.id,
        },
      });
    }

    if (payload.role === "TRAINER") {
      await tran.trainer.create({
        data: {
          userId: user.id,
        },
      });
    }

    const { password, ...resultUser } = user;

    return resultUser;
  });

  return result;
};

export const authService = { createTrainee, createTrainer, createAdmin, login };
