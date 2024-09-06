import { Router } from "express";
import {
  getAppointments,
  getAppointment,
  scheduleAppointment,
  cancelAppointment,
} from "../controllers/appointmentController";

const appointmentRouter: Router = Router();

appointmentRouter.get("/", getAppointments);

appointmentRouter.get("/:id", getAppointment);

appointmentRouter.post("/schedule", scheduleAppointment);

appointmentRouter.put("/cancel/:id", cancelAppointment);

export default appointmentRouter;
