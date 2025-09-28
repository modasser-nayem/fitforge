import { asyncHandler } from "../../utils/asyncHandler";
import sendResponse from "../../utils/sendResponse";
import { scheduleService } from "./schedule.service";

const getSchedules = asyncHandler(async (req, res) => {
  const date = req.query?.date as string;

  const result = await scheduleService.getSchedules({ date: date });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Successfully retrieved schedules",
    data: result,
  });
});

const getScheduleDetails = asyncHandler(async (req, res) => {
  const result = await scheduleService.getScheduleDetails({
    scheduleId: req.params.id,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Successfully retrieved schedule details",
    data: result,
  });
});

const createSchedule = asyncHandler(async (req, res) => {
  const result = await scheduleService.createSchedule({
    data: req.body,
  });

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Successfully create new schedule",
    data: result,
  });
});

const updateSchedule = asyncHandler(async (req, res) => {
  const result = await scheduleService.updateSchedule({
    scheduleId: req.params.id,
    data: req.body,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Successfully update schedule",
    data: result,
  });
});

const deleteSchedule = asyncHandler(async (req, res) => {
  const result = await scheduleService.deleteSchedule({
    scheduleId: req.params.id,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Successfully delete schedule",
    data: result,
  });
});

const getTrainerAssignedSchedules = asyncHandler(async (req, res) => {
  const result = await scheduleService.getTrainerAssignedSchedules({
    trainerId: req.user.id,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Successfully retrieved assigned schedules",
    data: result,
  });
});

const getScheduleTrainees = asyncHandler(async (req, res) => {
  const result = await scheduleService.getScheduleTrainees({
    scheduleId: req.params.id,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Successfully retrieved schedule trainees",
    data: result,
  });
});

export const scheduleController = {
  getSchedules,
  getScheduleDetails,
  createSchedule,
  updateSchedule,
  deleteSchedule,
  getTrainerAssignedSchedules,
  getScheduleTrainees,
};
