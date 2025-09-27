import { Router } from "express";
import { authorize } from "../../middlewares/authorize";
import requestValidate from "../../middlewares/requestValidation";
import { bookingValidationSchema } from "./booking.dto";
import { bookingController } from "./booking.controller";

const router = Router();

// Create booking
router.post(
  "/",
  authorize("TRAINEE"),
  requestValidate(bookingValidationSchema.create),
  bookingController.createBooking,
);

// Get bookings
router.get("/", authorize("TRAINEE"), bookingController.getBookings);

// Cancel booking
router.delete(
  "/:id/cancel",
  authorize("TRAINEE"),
  bookingController.cancelBooking,
);

export const bookingRoutes = router;
