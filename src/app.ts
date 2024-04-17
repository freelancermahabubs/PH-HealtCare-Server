import express, {Application, NextFunction, Request, Response} from "express";
import cors from "cors";
import morgan from "morgan";

import router from "./app/routes";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import httpStatus from "http-status";
import cookieParser from "cookie-parser";
import {AppointmentService} from "./app/modules/Appointment/appointment.service";
import cron from "node-cron";
const app: Application = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

cron.schedule("* * * * *", () => {
  try {
    AppointmentService.cancelUnpaidAppointments();
  } catch (error) {
    console.error(error);
  }
});

app.use(cors());
app.use(cookieParser());
app.use(morgan("tiny"));
app.use("/api/v1/", router);
app.use(globalErrorHandler);
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "API NOT Found",
    error: {
      path: req.originalUrl,
      message: "Your Requested Path is not Found",
    },
  });
});
app.get("/", (req: Request, res: Response) => {
  res.send({
    message: "PH Health Care Server..",
  });
});

export default app;
