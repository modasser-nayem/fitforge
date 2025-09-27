import { z } from "zod";

const updateProfile = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(30, "Name too long")
    .optional(),
  email: z.string().email("Invalid email address").optional(),
  photo: z.string().url("Invalid photo URL").optional(),
});

export const userValidationSchema = { updateProfile };
