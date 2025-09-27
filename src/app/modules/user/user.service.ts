import prisma from "../../db/connector";
import AppError from "../../errors/AppError";
import { TUpdateProfile } from "./user.interface";

const getProfile = async (payload: { userId: string }) => {
  const user = await prisma.user.findUnique({
    where: { id: payload.userId },
  });

  if (!user) {
    throw new AppError(404, "User not found!");
  }

  const { password, ...result } = user;

  return result;
};

const updateProfile = async (payload: {
  userId: string;
  data: TUpdateProfile;
}) => {
  const user = await prisma.user.findUnique({
    where: { id: payload.userId },
  });

  if (!user) {
    throw new AppError(404, "User not found!");
  }

  if (payload.data.email) {
    const existEmail = await prisma.user.findUnique({
      where: { email: payload.data.email, NOT: { id: user.id } },
    });

    if (existEmail) {
      throw new AppError(400, "Try another email address");
    }
  }

  const updateResult = await prisma.user.update({
    where: { id: user.id },
    data: payload.data,
  });

  const { password, ...result } = updateResult;

  return result;
};

const getListOfTrainer = async () => {
  const result = await prisma.user.findMany({
    where: { role: "TRAINER" },
    select: {
      id: true,
      name: true,
      email: true,
      photo: true,
    },
  });

  return result;
};

const deleteUser = async (payload: { userId: string }) => {
  const user = await prisma.user.findUnique({
    where: { id: payload.userId },
  });

  if (!user) {
    throw new AppError(404, "User not found!");
  }

  const deleteResult = await prisma.user.delete({ where: { id: user.id } });

  const { password, ...result } = deleteResult;

  return result;
};

export const userService = {
  getProfile,
  updateProfile,
  getListOfTrainer,
  deleteUser,
};
