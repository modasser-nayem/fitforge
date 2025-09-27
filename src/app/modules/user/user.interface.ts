import { z } from "zod";
import { userValidationSchema } from "./user.dto";

export type TUpdateProfile = z.infer<typeof userValidationSchema.updateProfile>;
