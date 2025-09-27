import { Router } from "express";
import { authorize } from "../../middlewares/authorize";
import requestValidate from "../../middlewares/requestValidation";
import { authValidationSchema } from "./auth.dto";
import { authController } from "./auth.controller";

const router = Router();

// Create Admin - Admin
router.post(
  "/admin",
  authorize("ADMIN"),
  requestValidate(authValidationSchema.createAccount),
  authController.createAdmin,
);

// Create Trainer - Admin
router.post(
  "/trainer",
  authorize("ADMIN"),
  requestValidate(authValidationSchema.createAccount),
  authController.createTrainer,
);

// Register Trainee
router.post(
  "/trainee",
  requestValidate(authValidationSchema.createAccount),
  authController.createTrainee,
);

// Login
router.post(
  "/login",
  requestValidate(authValidationSchema.createAccount),
  authController.login,
);

export const authRoutes = router;
