import express from "express";
import {userRoutes} from "../modules/User/user.routes";
import {adminRoutes} from "../modules/Admin/admin.routes";
import {authRoutes} from "../modules/Auth/auth.routes";
import {specialtiesRoutes} from "../modules/Specialties/specialties.routes";
import {doctorRoutes} from "../modules/Doctor/doctor.routes";
import {patientRoutes} from "../modules/Patient/patient.route";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/user",
    route: userRoutes,
  },
  {
    path: "/admin",
    route: adminRoutes,
  },
  {
    path: "/auth",
    route: authRoutes,
  },
  {
    path: "/specialties",
    route: specialtiesRoutes,
  },
  {
    path: "/doctor",
    route: doctorRoutes,
  },
  {
    path: "/patient",
    route: patientRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
