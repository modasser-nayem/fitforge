const createBooking = async (payload: {
  traineeId: string;
  scheduleId: string;
}) => {
  return payload;
};

const getBookings = async (payload: { traineeId: string }) => {
  return payload;
};

const cancelBooking = async (payload: {
  traineeId: string;
  bookingId: string;
}) => {
  return payload;
};

export const bookingService = { createBooking, getBookings, cancelBooking };
