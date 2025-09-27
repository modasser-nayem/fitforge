import { Router } from "express";
import sendResponse from "../utils/sendResponse";

const router = Router();

router.get("/test", (req, res) => {
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "API Successfully Works",
    data: {
      name: "I am test routes",
    },
  });
});

export const testRoutes = router;
