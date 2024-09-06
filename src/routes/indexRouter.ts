import { Router } from "express";
import usersRouter from "./usersRouter";
import appointmentRouter from "./appointmentRouter";

const indexRouter: Router = Router();

indexRouter.use("/users", usersRouter);
indexRouter.use("/appointments", appointmentRouter);

export default indexRouter;
