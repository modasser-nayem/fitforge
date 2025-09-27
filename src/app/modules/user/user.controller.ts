import { asyncHandler } from "../../utils/asyncHandler";
import sendResponse from "../../utils/sendResponse";
import { userService } from "./user.service";

const getProfile = asyncHandler(async (req, res) => {
  const result = await userService.getProfile({ userId: req.user.id });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Successfully Get Profile",
    data: result,
  });
});

const updateProfile = asyncHandler(async (req, res) => {
  const result = await userService.updateProfile({
    userId: req.user.id,
    data: req.body,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Successfully Update Profile",
    data: result,
  });
});

const updateTrainer = asyncHandler(async (req, res) => {
  const result = await userService.updateTrainer({
    userId: req.params.id,
    data: req.body,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Successfully Update Trainer Profile",
    data: result,
  });
});

const getListOfTrainer = asyncHandler(async (req, res) => {
  const result = await userService.getListOfTrainer();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Successfully retrieve list of trainers",
    data: result,
  });
});

const deleteUser = asyncHandler(async (req, res) => {
  const result = await userService.deleteUser({
    userId: req.params.id,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Successfully Delete User",
    data: result,
  });
});

export const userController = {
  getProfile,
  updateProfile,
  updateTrainer,
  getListOfTrainer,
  deleteUser,
};
