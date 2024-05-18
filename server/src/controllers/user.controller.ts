import type { RequestHandler } from "express";
import prisma from "../prisma-client.js";
import { createError } from "../utils/error-handling.js";
import bcryptjs from "bcryptjs";
import { randomBytes } from "crypto";
import { EmailProps, sendMail } from "../utils/send-mail.js";
import { createJwtToken, verifyJwtToken } from "../utils/jwt-token.js";
import { VerifyErrors } from "jsonwebtoken";

type BaseUserData = {
  email: string;
  fullName: string;
  password?: string | undefined | null;
  avatar?: string | null;
};

export type UserData = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  provider?: string;
  resetToken?: string;
} & BaseUserData;

type SuccessResponse<T = {}> = {
  msg: string;
  data?: T | null;
};

type ForgotPassword = {
  email: string;
};

type ResetPassword = {
  token: string;
  newPassword: string;
  confirmPassword: string;
};

export const register: RequestHandler<unknown, unknown, BaseUserData> = async (
  req,
  res,
  next
) => {
  try {
    const { email, password } = req.body;
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser)
      return next(createError(409, "User with that email already exists"));

    const hashesPassword = bcryptjs.hashSync(password!, 10);

    await prisma.user.create({
      data: { ...req.body, password: hashesPassword },
    });

    const successResponse: SuccessResponse = {
      msg: "User created",
    };
    return res.status(200).json(successResponse);
  } catch (error) {
    return next(createError(500, "Internal Server Error"));
  }
};

export const login: RequestHandler = async (req, res, next) => {
  try {
    return res.status(200).json("User logged in");
  } catch (error) {
    return next(error);
  }
};

export const update: RequestHandler<unknown, unknown, UserData> = async (
  req,
  res,
  next
) => {
  try {
    console.log("This is user update function");

    // const updatedUser = await prisma.user
    //   .update({
    //     data: {
    //       ...req.body,
    //     },
    //     where: {
    //       id: req.userId,
    //     },
    //   })
    //   .catch((err) => {
    //     if (err) return next(createError(500, "Internal Server Error"));
    //   });

    // const successResponse: SuccessResponse = {
    //   msg: "User updated",
    //   success: true,
    //   data: updatedUser,
    // };

    // return res.status(200).json(successResponse);
  } catch (error) {
    return next(createError(500, "Internal Server Error"));
  }
};

export const isAuth: RequestHandler = async (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.status(200).json({ msg: "Authorized", access: true });
  } else {
    return res.status(401).json({ msg: "Session expired", access: false });
  }
};

export const forgotPassword: RequestHandler<
  unknown,
  unknown,
  ForgotPassword
> = async (req, res, next) => {
  try {
    const { email } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!existingUser) return next(createError(404, "User not found"));

    const mail: EmailProps = {
      name: existingUser?.fullName,
      userEmail: email,
      subject: "Password Recovery",
      text: "This button will redirect you to a page where you have 10 minutes to reset your password after that this link will expire.",
      button: {
        text: "Reset password",
        buttonLinkType: "reset",
      },
    };

    await createJwtToken(existingUser.id, "10min")
      .then(async (token) => {
        const mailObj = {
          emailObj: mail,
          token,
        };
        const hashedToken = bcryptjs.hashSync(token!, 10);

        await sendMail(mailObj)
          .then(async () => {
            await prisma.user.update({
              where: {
                id: existingUser.id,
              },
              data: {
                resetToken: hashedToken,
              },
            });
            return res.status(200).json({ msg: "Reset link sent" });
          })
          .catch((error) => {
            if (error)
              return next(createError(500, "Error when sending email"));
          });
      })
      .catch((error) => {
        if (error)
          return next(createError(500, "Error when generating jwt token"));
      });
  } catch (error) {
    return next(createError(500, "Internal Server Error"));
  }
};

export const resetPassword: RequestHandler<
  unknown,
  unknown,
  ResetPassword
> = async (req, res, next) => {
  try {
    const { token, newPassword, confirmPassword } = req.body;

    if (newPassword !== confirmPassword)
      return next(createError(400, "Passwords don't match"));

    await verifyJwtToken(token)
      .then(async ({ id }) => {
        const user = await prisma.user.findUnique({
          where: {
            id,
          },
        });

        const isTokenVerified = bcryptjs.compareSync(token, user?.resetToken!);
        if (!isTokenVerified) return next(createError(403, "Invalid token"));

        const hashedPassword = bcryptjs.hashSync(newPassword, 10);

        await prisma.user
          .update({
            where: {
              id,
            },
            data: {
              password: hashedPassword,
              resetToken: null,
            },
          })
          .then(() => {
            return res.status(200).json({ msg: "User password updated" });
          })
          .catch((error) => {
            if (error)
              return next(createError(500, "Error updating the password"));
          });
      })
      .catch((error) => {
        if (error as VerifyErrors) {
          if (error.message === "jwt expired")
            return next(createError(403, "Token expired"));
          return next(createError(500, error.message));
        }
      });
  } catch (error) {
    return next(createError(500, "Internal Server Error"));
  }
};

export const logout: RequestHandler = async (req, res, next) => {
  req.session.destroy((err) => {
    if (err) return next(createError(500, "Error logging out"));
  });

  res.clearCookie("sess");

  return res.status(200).json("User logged out");
};
