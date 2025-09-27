import { z } from "zod";

const createAccount = z
  .object({
    name: z
      .string({ required_error: "name is required" })
      .min(3, "Name must be at least 3 characters")
      .max(30, "Name too long"),
    email: z
      .string({ required_error: "email is required" })
      .email("Invalid email address"),
    photo: z.string().url("Invalid photo URL").optional(),
    password: z
      .string({ required_error: "password is required" })
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string({
        required_error: "confirmPassword is required",
      })
      .nonempty("confirmPassword is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const login = z.object({
  email: z
    .string({ required_error: "email is required" })
    .email({ message: "Invalid email address" }),
  password: z
    .string({ required_error: "password is required" })
    .nonempty("password is required"),
});

export const authValidationSchema = { createAccount, login };
