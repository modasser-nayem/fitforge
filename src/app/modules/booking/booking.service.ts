import prisma from "../../db/connector";
import AppError from "../../errors/AppError";

const createBooking = async (payload: {
  traineeId: string;
  scheduleId: string;
}) => {
  const { traineeId, scheduleId } = payload;

  const result = await prisma.$transaction(async (tx) => {
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
              _count: { select: { bookings: true } },
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

  const transformedResult = {
    id: result.id,
    bookedAt: result.createdAt,
    schedule: {
      id: result.schedule.id,
      startTime: result.schedule.startTime,
      endTime: result.schedule.endTime,
      capacity: result.schedule.capacity,
      totalBooking: result.schedule._count.bookings,
    },
    trainer: {
      id: result.schedule.trainer.user.id,
      name: result.schedule.trainer.user.name,
      email: result.schedule.trainer.user.email,
      photo: result.schedule.trainer.user.photo,
    },
  };

  return transformedResult;
};

const getBookings = async (payload: { traineeId: string }) => {
  const { traineeId } = payload;

  const bookings = await prisma.booking.findMany({
    where: { traineeId },
    include: {
      schedule: {
        include: {
          trainer: { include: { user: true } },
          _count: { select: { bookings: true } },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  const transformedResult = bookings.map((book) => ({
    id: book.id,
    bookedAt: book.createdAt,
    schedule: {
      id: book.schedule.id,
      startTime: book.schedule.startTime,
      endTime: book.schedule.endTime,
      capacity: book.schedule.capacity,
      totalBooking: book.schedule._count.bookings,
    },
    trainer: {
      id: book.schedule.trainer.user.id,
      name: book.schedule.trainer.user.name,
      email: book.schedule.trainer.user.email,
      photo: book.schedule.trainer.user.photo,
    },
  }));

  return transformedResult;
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
