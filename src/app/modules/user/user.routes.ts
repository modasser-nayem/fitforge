import { Router } from "express";
import { authorize } from "../../middlewares/authorize";
import { userController } from "./user.controller";
import requestValidate from "../../middlewares/requestValidation";
import { userValidationSchema } from "./user.dto";

const router = Router();

// Get Profile
router.get("/profile", authorize(), userController.getProfile);

// Update Profile
router.put(
  "/profile",
  authorize("ADMIN", "TRAINEE"),
  requestValidate(userValidationSchema.updateProfile),
  userController.updateProfile,
);

// Update trainer - Admin
router.put(
  "/trainers/:id",
  authorize("ADMIN"),
  requestValidate(userValidationSchema.updateProfile),
  userController.updateTrainer,
);

// List of trainer - Admin
router.get("/trainers", authorize("ADMIN"), userController.getListOfTrainer);

// Delete User
router.delete("/:id", authorize("ADMIN"), userController.deleteUser);

export const userRoutes = router;
