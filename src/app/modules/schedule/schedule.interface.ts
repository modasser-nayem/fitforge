import { z } from "zod";
import { scheduleValidationSchema } from "./schedule.dto";

export type TCreateSchedule = z.infer<typeof scheduleValidationSchema.create>;

export type TUpdateSchedule = z.infer<typeof scheduleValidationSchema.create>;
