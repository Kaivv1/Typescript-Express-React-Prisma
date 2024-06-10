import { Router } from "express";
import {
  register,
  login,
  update,
  isAuth,
  logout,
  forgotPassword,
  resetPassword,
  user,
} from "../controllers/user.controller.js";
import passport from "passport";
import { client } from "../constants.js";
import { auth } from "../controllers/auth.controller.js";
import multer from "multer";

export const userRouter = Router();
const storage = multer.memoryStorage();
const uploadFile = multer({ storage });

userRouter.post("/register", register);
userRouter.post(
  "/login",
  passport.authenticate("local", {
    failWithError: true,
  }),
  login
);
userRouter.put("/update", auth, uploadFile.single("avatar"), update);
userRouter.get("/auth", isAuth);
userRouter.get("/user-data", auth, user);
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
    successRedirect: `${client}/dashboard`,
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
    successRedirect: `${client}/dashboard`,
  })
);
