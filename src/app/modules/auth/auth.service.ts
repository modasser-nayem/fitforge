import { TCreateAccount, TLogin } from "./auth.interface";

const createTrainee = (payload: { data: TCreateAccount }) => {
  return payload;
};

const createTrainer = (payload: { data: TCreateAccount }) => {
  return payload;
};

const createAdmin = (payload: { data: TCreateAccount }) => {
  return payload;
};

const login = (payload: { data: TLogin }) => {
  return payload;
};

export const authService = { createTrainee, createTrainer, createAdmin, login };
