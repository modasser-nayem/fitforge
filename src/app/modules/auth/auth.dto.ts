import { z } from "zod";

const createAccount = z.object({});

const login = z.object({});

export const authValidationSchema = { createAccount, login };
