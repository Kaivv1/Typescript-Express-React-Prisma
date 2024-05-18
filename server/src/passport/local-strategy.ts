import { Strategy as LocalStrategy } from "passport-local";
import prisma from "../prisma-client.js";
import bcryptjs from "bcryptjs";
import { createError } from "../utils/error-handling.js";
import passport from "passport";
import { UserData } from "../controllers/user.controller.js";

type ExpressUser = Express.User & {
  id?: string;
};

export const localStrategy = new LocalStrategy(
  { usernameField: "email", passwordField: "password" },
  async (email, password, done) => {
    try {
      const existingUser = await prisma.user.findFirst({
        where: {
          email,
        },
      });
      if (!existingUser) return done(createError(404, "Invalid Credentials"));

      const correctPassword = bcryptjs.compareSync(
        password,
        existingUser.password!
      );
      if (!correctPassword)
        return done(createError(404, "Invalid Credentials"));

      const { password: removedPassword, ...rest } = existingUser;

      return done(null, rest);
    } catch (error) {
      return done(error);
    }
  }
);

passport.serializeUser((user: ExpressUser, done) => {
  return done(null, user.id);
});

passport.deserializeUser(async (user: any, done) => {
  try {
    const existingUser = await prisma.user.findFirst({
      where: { id: user.id },
    });
    const { password, ...userWithoutPass } = existingUser as UserData;

    return done(null, userWithoutPass);
  } catch (error) {
    return done(createError(500, "Problem with deserializing the user"));
  }
});
