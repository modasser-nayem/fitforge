import { asyncHandler } from "../../utils/asyncHandler";
import sendResponse from "../../utils/sendResponse";
import { authService } from "./auth.service";

const createTrainee = asyncHandler(async (req, res) => {
  const result = await authService.createTrainee({ data: req.body });

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Account Successfully Created",
    data: result,
  });
});

const createTrainer = asyncHandler(async (req, res) => {
  const result = await authService.createTrainer({ data: req.body });

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Account Successfully Created",
    data: result,
  });
});

const createAdmin = asyncHandler(async (req, res) => {
  const result = await authService.createAdmin({ data: req.body });

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Account Successfully Created",
    data: result,
  });
});

const login = asyncHandler(async (req, res) => {
  const result = await authService.login({ data: req.body });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Successfully Login!",
    data: result,
  });
});

export const authController = {
  createTrainee,
  createTrainer,
  createAdmin,
  login,
};
