import { Router } from "express";
import { authRoutes } from "../modules/auth/auth.routes";
import { userRoutes } from "../modules/user/user.routes";
import { scheduleRoutes } from "../modules/schedule/schedule.routes";
import { bookingRoutes } from "../modules/booking/booking.routes";

const routers = Router();
const moduleRoutes: { path: string; route: Router }[] = [
  {
    path: "/auth",
    route: authRoutes,
  },
  {
    path: "/users",
    route: userRoutes,
  },
  {
    path: "/schedules",
    route: scheduleRoutes,
  },
  {
    path: "/booking",
    route: bookingRoutes,
  },
];

moduleRoutes.forEach((route) => routers.use(route.path, route.route));

export default routers;
