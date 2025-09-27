import { ZodError } from "zod";
import { TErrorHandlerResponse } from "../types/error";

const zodErrorHandler = (err: ZodError): TErrorHandlerResponse => {
  const message = err.issues[0].message;
  const error = err.issues.map((issue) => ({
    field: issue.path[issue.path.length - 1],
    message: issue.message,
  }));
  return {
    statusCode: 400,
    message: message,
    error: error,
  };
};

export default zodErrorHandler;
