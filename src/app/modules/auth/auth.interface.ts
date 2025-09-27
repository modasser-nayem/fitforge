import { z } from "zod";
import { authValidationSchema } from "./auth.dto";

export type TCreateAccount = z.infer<typeof authValidationSchema.createAccount>;

export type TLogin = z.infer<typeof authValidationSchema.login>;
