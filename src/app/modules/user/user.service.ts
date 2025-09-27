import { TUpdateProfile, TUpdateTrainer } from "./user.interface";

const getProfile = async (payload: { userId: string }) => {
  return payload;
};

const updateProfile = async (payload: {
  userId: string;
  data: TUpdateProfile;
}) => {
  return payload;
};

const updateTrainer = async (payload: {
  userId: string;
  data: TUpdateTrainer;
}) => {
  return payload;
};

const getListOfTrainer = async () => {
  return {};
};

const deleteUser = async (payload: { userId: string }) => {
  return payload;
};

export const userService = {
  getProfile,
  updateProfile,
  updateTrainer,
  getListOfTrainer,
  deleteUser,
};
