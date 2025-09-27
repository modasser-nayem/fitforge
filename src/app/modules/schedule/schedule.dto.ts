import { z } from "zod";

const create = z.object({
  startTime: z.string({ required_error: "startTime is required" }).datetime(),
  trainerId: z
    .string({ required_error: "trainerId is required" })
    .uuid("Invalid ID"),
  capacity: z
    .number()
    .min(2, "capacity must be minimum 2")
    .max(10, "Capacity max 10")
    .optional(),
});

const update = z.object({
  startTime: z.string().datetime().optional(),
  trainerId: z.string().uuid("Invalid ID").optional(),
  capacity: z
    .number()
    .min(2, "capacity must be minimum 2")
    .max(10, "Capacity max 10")
    .optional(),
});

export const scheduleValidationSchema = { create, update };
