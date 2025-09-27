import { TCreateSchedule, TUpdateSchedule } from "./schedule.interface";

const getSchedules = async (payload: { date?: string }) => {
  return payload;
};

const getScheduleDetails = async (payload: { scheduleId: string }) => {
  return payload;
};

const createSchedule = async (payload: { data: TCreateSchedule }) => {
  return payload;
};

const updateSchedule = async (payload: {
  scheduleId: string;
  data: TUpdateSchedule;
}) => {
  return payload;
};

const deleteSchedule = async (payload: { scheduleId: string }) => {
  return payload;
};

const getTrainerAssignedSchedules = async (payload: { trainerId: string }) => {
  return payload;
};

const getScheduleTrainees = async (payload: { scheduleId: string }) => {
  return payload;
};

export const scheduleService = {
  getSchedules,
  getScheduleDetails,
  createSchedule,
  updateSchedule,
  deleteSchedule,
  getTrainerAssignedSchedules,
  getScheduleTrainees,
};
