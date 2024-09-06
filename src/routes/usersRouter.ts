import { Router } from "express";
import {
  getUsers,
  getUsersById,
  login,
  usersRegister,
} from "../controllers/usersController";

const usersRouter: Router = Router();

usersRouter.get("/", getUsers);

usersRouter.get("/:id", getUsersById);

usersRouter.post("/register", usersRegister);

usersRouter.post("/login", login);

export default usersRouter;
