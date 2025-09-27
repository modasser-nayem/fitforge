import prisma from "../../db/connector";
import AppError from "../../errors/AppError";

const createBooking = async (payload: {
  traineeId: string;
  scheduleId: string;
}) => {
  const { traineeId, scheduleId } = payload;

  return await prisma.$transaction(async (tx) => {
    // Verify schedule exists and is not in the past
    const schedule = await tx.schedule.findUnique({
      where: { id: scheduleId },
      include: { bookings: true },
    });

    if (!schedule) throw new AppError(404, "Schedule not found.");

    if (schedule.startTime.getTime() < Date.now()) {
      throw new AppError(
        400,
        "Cannot book a schedule that has already started.",
      );
    }

    // Schedule Capacity check
    const bookingCount = await tx.booking.count({ where: { scheduleId } });
    if (bookingCount >= schedule.capacity) {
      throw new AppError(400, "This schedule is already full.");
    }

    // No overlapping bookings for this trainee
    const overlapping = await tx.booking.findMany({
      where: {
        traineeId,
        schedule: {
          startTime: { lt: schedule.endTime },
          endTime: { gt: schedule.startTime },
        },
      },
    });
    if (overlapping.length > 0) {
      throw new AppError(
        400,
        "You already have another booking that overlaps this schedule.",
      );
    }

    // Create new booking
    try {
      const booking = await tx.booking.create({
        data: { traineeId, scheduleId },
        include: {
          schedule: {
            include: {
              trainer: { include: { user: true } },
            },
          },
        },
      });
      return booking;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      // prevents duplicate booking
      if (err.code === "P2002") {
        throw new AppError(400, "You have already booked this schedule.");
      }
      throw err;
    }
  });
};

const getBookings = async (payload: { traineeId: string }) => {
  const { traineeId } = payload;

  const bookings = await prisma.booking.findMany({
    where: { traineeId },
    include: {
      schedule: {
        include: {
          trainer: { include: { user: true } },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return bookings;
};

const cancelBooking = async (payload: {
  traineeId: string;
  bookingId: string;
}) => {
  const { traineeId, bookingId } = payload;

  // Only the trainee who booked it can cancel
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: { schedule: true },
  });

  if (!booking) throw new AppError(404, "Booking not found.");

  if (booking.traineeId !== traineeId) {
    throw new AppError(403, "You are not allowed to cancel this booking.");
  }

  if (booking.schedule.startTime.getTime() < Date.now()) {
    throw new AppError(
      400,
      "Cannot cancel a booking after the class has started.",
    );
  }

  await prisma.booking.delete({ where: { id: bookingId } });
  return null;
};

export const bookingService = {
  createBooking,
  getBookings,
  cancelBooking,
};
