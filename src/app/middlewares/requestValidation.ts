import { ZodSchema } from "zod";
import { asyncHandler } from "../utils/asyncHandler";

const requestValidate = (schema: ZodSchema) => {
  return asyncHandler(async (req, _res, next) => {
    const result = await schema.parseAsync(req.body);
    req.body = result;
    next();
  });
};

export default requestValidate;
