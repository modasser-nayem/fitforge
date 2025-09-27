import { Router } from "express";
import { authorize } from "../../middlewares/authorize";
import { scheduleController } from "./schedule.controller";
import requestValidate from "../../middlewares/requestValidation";
import { scheduleValidationSchema } from "./schedule.dto";

const router = Router();

// Get schedules
router.get("/", scheduleController.getSchedules);

// Get schedule details
router.get("/:id", scheduleController.getScheduleDetails);

// Create Schedule - Admin
router.post(
  "/",
  authorize("ADMIN"),
  requestValidate(scheduleValidationSchema.create),
  scheduleController.createSchedule,
);

// Update Schedule - Admin
router.put(
  "/:id",
  authorize("ADMIN"),
  requestValidate(scheduleValidationSchema.update),
  scheduleController.updateSchedule,
);

// Delete Schedule - Admin
router.delete("/:id", authorize("ADMIN"), scheduleController.deleteSchedule);

// Get assigned schedules
router.get(
  "/trainer",
  authorize("TRAINER"),
  scheduleController.getTrainerAssignedSchedules,
);

// view trainees for schedule
router.get(
  "/:id/attendees",
  authorize("TRAINER"),
  scheduleController.getScheduleTrainees,
);

export const scheduleRoutes = router;
