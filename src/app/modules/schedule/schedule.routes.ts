import { Router } from "express";
import { authorize } from "../../middlewares/authorize";
import { scheduleController } from "./schedule.controller";
import requestValidate from "../../middlewares/requestValidation";
import { scheduleValidationSchema } from "./schedule.dto";

const router = Router();

// Get assigned schedules
router.get(
  "/trainer",
  authorize("TRAINER"),
  scheduleController.getTrainerAssignedSchedules,
);

// List trainees for schedule
router.get(
  "/:id/trainees",
  authorize("TRAINER"),
  scheduleController.getScheduleTrainees,
);

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

export const scheduleRoutes = router;
