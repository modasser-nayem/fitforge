import { asyncHandler } from "../../utils/asyncHandler";
import sendResponse from "../../utils/sendResponse";
import { bookingService } from "./booking.service";

const createBooking = asyncHandler(async (req, res) => {
  const result = await bookingService.createBooking({
    traineeId: req.user.id,
    scheduleId: req.body.scheduleId,
  });

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Successfully Booking Gym Training Schedule",
    data: result,
  });
});

const getBookings = asyncHandler(async (req, res) => {
  const result = await bookingService.getBookings({
    traineeId: req.user.id,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Successfully retrieved your bookings",
    data: result,
  });
});

const cancelBooking = asyncHandler(async (req, res) => {
  const result = await bookingService.cancelBooking({
    traineeId: req.user.id,
    bookingId: req.params.id,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Successfully Cancel Your Booking",
    data: result,
  });
});

export const bookingController = { createBooking, getBookings, cancelBooking };
