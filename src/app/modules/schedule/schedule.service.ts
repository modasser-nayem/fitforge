import prisma from "../../db/connector";
import AppError from "../../errors/AppError";
import {
  endOfUTCDate,
  parseISOToUTCDate,
  toUTCDateOnly,
} from "../../utils/datetime";
import { TCreateSchedule, TUpdateSchedule } from "./schedule.interface";

const TWO_HOURS_MS = 2 * 60 * 60 * 1000;
const MAX_SCHEDULES_PER_DAY = 5;
const MAX_CAPACITY = 10;

const getSchedules = async (payload: { date?: string }) => {
  if (payload.date) {
    const parsed = parseISOToUTCDate(payload.date);
    if (!parsed) {
      throw new AppError(
        400,
        "Invalid date format. Provide an ISO date (YYYY-MM-DD).",
      );
    }

    const start = toUTCDateOnly(parsed);
    const end = endOfUTCDate(parsed);

    const schedules = await prisma.schedule.findMany({
      where: {
        startTime: { gte: start, lte: end },
      },
      include: {
        trainer: { include: { user: true } },
        bookings: { include: { trainee: { include: { user: true } } } },
      },
      orderBy: { startTime: "asc" },
    });

    return schedules;
  } else {
    const schedules = await prisma.schedule.findMany({
      include: {
        trainer: { include: { user: true } },
        bookings: { include: { trainee: { include: { user: true } } } },
      },
      orderBy: { startTime: "asc" },
    });
    return schedules;
  }
};

const getScheduleDetails = async (payload: { scheduleId: string }) => {
  if (!payload.scheduleId) throw new AppError(400, "Invalid Schedule ID!");

  const schedule = await prisma.schedule.findUnique({
    where: { id: payload.scheduleId },
    include: {
      trainer: { include: { user: true } },
      bookings: { include: { trainee: { include: { user: true } } } },
    },
  });

  if (!schedule) throw new AppError(404, "Schedule not found.");

  return schedule;
};

const createSchedule = async (payload: { data: TCreateSchedule }) => {
  const { startTime: startISO, trainerId, capacity } = payload.data;

  const start = parseISOToUTCDate(startISO);
  if (!start) throw new AppError(400, "Invalid ISO date.");

  // compute endTime (2 hours)
  const end = new Date(start.getTime() + TWO_HOURS_MS);

  // ensure trainer exists
  const trainer = await prisma.trainer.findUnique({
    where: { userId: trainerId },
    include: { user: true },
  });

  if (!trainer) {
    throw new AppError(404, "Trainer not found.");
  }

  // compute day boundaries in UTC based on start
  const startOfDay = toUTCDateOnly(start);
  const endOfDay = endOfUTCDate(start);

  const result = await prisma.$transaction(async (tx) => {
    const count = await tx.schedule.count({
      where: {
        startTime: { gte: startOfDay, lte: endOfDay },
      },
    });

    if (count >= MAX_SCHEDULES_PER_DAY) {
      throw new AppError(400, "Schedule Limit: max 5 classes per day");
    }

    // Ensure trainer doesn't have an overlapping schedule
    const existing = await tx.schedule.findMany({
      where: {
        trainerId,
        AND: [{ startTime: { lt: end } }, { endTime: { gt: start } }],
      },
    });

    if (existing.length > 0) {
      throw new AppError(
        400,
        "Trainer has an overlapping schedule for this time.",
      );
    }

    // Create schedule
    const created = await tx.schedule.create({
      data: {
        startTime: start,
        endTime: end,
        trainerId,
        capacity,
        date: toUTCDateOnly(start),
      },
      include: {
        trainer: { include: { user: true } },
      },
    });

    return created;
  });

  return result;
};

const updateSchedule = async (payload: {
  scheduleId: string;
  data: TUpdateSchedule;
}) => {
  const { scheduleId, data } = payload;

  const existing = await prisma.schedule.findUnique({
    where: { id: scheduleId },
  });
  if (!existing) throw new AppError(404, "Schedule not found.");

  // compute proposed new values
  const newStart = data.startTime
    ? parseISOToUTCDate(data.startTime)
    : existing.startTime;

  if (data.startTime && !newStart) throw new AppError(400, "Invalid ISO date.");

  const newEnd = new Date(newStart.getTime() + TWO_HOURS_MS);

  const newTrainerId = data.trainerId ?? existing.trainerId;
  const newCapacity = data.capacity ?? existing.capacity;

  // Ensure trainer exists
  const trainer = await prisma.trainer.findUnique({
    where: { userId: newTrainerId },
  });
  if (!trainer) throw new AppError(404, "Trainer not found.");

  const updated = await prisma.$transaction(async (tx) => {
    // If moving to a different day, ensure that day hasn't hit the max schedules limit
    const oldDay = toUTCDateOnly(existing.startTime);
    const newDay = toUTCDateOnly(newStart);

    if (oldDay.getTime() !== newDay.getTime()) {
      const startOfDay = newDay;
      const endOfDay = endOfUTCDate(newStart);
      const count = await tx.schedule.count({
        where: {
          startTime: { gte: startOfDay, lte: endOfDay },
        },
      });

      // if there are already 5 schedules and we are trying to move into that day (we may be moving from a day with count <5)
      if (count >= MAX_SCHEDULES_PER_DAY) {
        throw new AppError(
          400,
          "Schedule Limit: max 5 classes per day for the target date.",
        );
      }
    }

    // Ensure trainer does not have overlapping schedule with the new slot. excluding this schedule
    const overlapping = await tx.schedule.findMany({
      where: {
        trainerId: newTrainerId,
        id: { not: scheduleId },
        AND: [{ startTime: { lt: newEnd } }, { endTime: { gt: newStart } }],
      },
    });

    if (overlapping.length > 0) {
      throw new AppError(
        400,
        "Trainer has an overlapping schedule for this time.",
      );
    }

    // if decreasing capacity check that current bookings are less then newCapacity
    if (newCapacity < existing.capacity) {
      const bookingsCount = await tx.booking.count({ where: { scheduleId } });
      if (bookingsCount > newCapacity) {
        throw new AppError(
          400,
          "Cannot reduce capacity below current number of bookings.",
        );
      }
    }

    // perform update
    const s = await tx.schedule.update({
      where: { id: scheduleId },
      data: {
        startTime: newStart,
        endTime: newEnd,
        trainerId: newTrainerId,
        capacity: newCapacity,
        date: toUTCDateOnly(newStart),
      },
      include: { trainer: { include: { user: true } }, bookings: true },
    });

    return s;
  });

  return updated;
};

const deleteSchedule = async (payload: { scheduleId: string }) => {
  const existing = await prisma.schedule.findUnique({
    where: { id: payload.scheduleId },
  });
  if (!existing) throw new AppError(404, "Schedule not found.");

  const result = await prisma.schedule.delete({
    where: { id: payload.scheduleId },
  });

  return result;
};

const getTrainerAssignedSchedules = async (payload: { trainerId: string }) => {
  const schedules = await prisma.schedule.findMany({
    where: { trainerId: payload.trainerId },
    include: {
      bookings: { include: { trainee: { include: { user: true } } } },
      trainer: { include: { user: true } },
    },
    orderBy: { startTime: "asc" },
  });

  return schedules;
};

const getScheduleTrainees = async (payload: { scheduleId: string }) => {
  const bookings = await prisma.booking.findMany({
    where: { scheduleId: payload.scheduleId },
    include: {
      trainee: {
        include: { user: true },
      },
    },
    orderBy: { createdAt: "asc" },
  });

  // map into a clean list of trainee users
  const trainees = bookings.map((b) => ({
    bookingId: b.id,
    traineeId: b.trainee.userId,
    name: b.trainee.user.name,
    email: b.trainee.user.email,
    photo: b.trainee.user.photo,
    bookedAt: b.createdAt,
  }));

  return trainees;
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
