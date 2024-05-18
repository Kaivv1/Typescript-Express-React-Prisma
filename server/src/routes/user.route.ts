import { Router, Request, Response } from "express";
import {
  register,
  login,
  update,
  isAuth,
  logout,
  forgotPassword,
  resetPassword,
} from "../controllers/user.controller.js";
import passport from "passport";
import { client } from "../constants.js";
import { auth } from "../controllers/auth.controller.js";

export const userRouter = Router();

userRouter.post("/register", register);
userRouter.post(
  "/login",
  passport.authenticate("local", {
    failWithError: true,
  }),
  login
);
userRouter.patch("/update", auth, update);
userRouter.get("/auth", isAuth);
userRouter.post("/forgot-password", forgotPassword);
userRouter.post("/reset-password", resetPassword);
userRouter.delete("/logout", logout);

userRouter.get(
  "/auth/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

userRouter.get(
  "/auth/github/callback",
  passport.authenticate("github", {
    failureRedirect: `${client}/login`,
    successRedirect: `${client}`,
  })
);

userRouter.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

userRouter.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${client}/login`,
    successRedirect: `${client}`,
  })
);
