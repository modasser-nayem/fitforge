import { z } from "zod";

const create = z.object({
  scheduleId: z
    .string({ required_error: "scheduleId is required" })
    .uuid("Invalid Schedule ID"),
});

export const bookingValidationSchema = { create };
