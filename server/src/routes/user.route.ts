import { Router } from "express";
import { register, login, update } from "../controllers/user.controller.js";
import { csrfAuth } from "../controllers/csrfAuth.controller.js";
import { jwtAuth } from "../controllers/jwtAuth.controller.js";

export const userRouter = Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.patch("/update", csrfAuth, jwtAuth, update);
