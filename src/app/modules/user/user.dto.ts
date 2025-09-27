import { z } from "zod";

const updateProfile = z.object({});

const updateTrainer = z.object({});

export const userValidationSchema = { updateProfile, updateTrainer };
