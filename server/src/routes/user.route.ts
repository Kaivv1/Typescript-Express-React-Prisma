import { Router } from "express";
import { register, login, update } from "../controllers/user.controller.js";
import { auth } from "../controllers/auth.controller.js";

export const userRouter = Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.patch("/update", auth);
