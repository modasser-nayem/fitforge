import { z } from "zod";
import { bookingValidationSchema } from "./booking.dto";

export type TCreateBooking = z.infer<typeof bookingValidationSchema.create>;
