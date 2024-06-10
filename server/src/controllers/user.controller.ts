import type { RequestHandler } from "express";
import prisma from "../prisma-client.js";
import { createError } from "../utils/error-handling.js";
import bcryptjs from "bcryptjs";
import { EmailProps, sendMail } from "../utils/send-mail.js";
import { createJwtToken, verifyJwtToken } from "../utils/jwt-token.js";
import { VerifyErrors } from "jsonwebtoken";
import { supabase, supabaseUrl } from "../supabase.js";

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

    return res.status(200).json({
      msg: "User created",
    });
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
    let avatarUrl = null;
    const file = req.file;

    if (file) {
      const avatarObj = (
        await supabase.storage.from("avatars").list()
      ).data?.find((avatar) => avatar.name.split("+").at(0) === req.user?.id);

      if (avatarObj) {
        const randomNumberAfterId = avatarObj?.name.split("+").at(1);

        await supabase.storage
          .from("avatars")
          .remove([`${req.user?.id!}+${randomNumberAfterId}`]);
      }

      const randomNumber = Math.random();
      const { error } = await supabase.storage
        .from("avatars")
        .upload(`${req.user?.id!}+${randomNumber}`, file.buffer, {
          contentType: file.mimetype,
        });

      avatarUrl = `${supabaseUrl}/storage/v1/object/public/avatars/${req.user
        ?.id!}+${randomNumber}`;

      if (error)
        return next(createError(500, "Error uploading user avatar to bucket"));
    }

    await prisma.user
      .update({
        data: {
          avatar: avatarUrl ? avatarUrl : req.user?.avatar,
          ...req.body,
        },
        where: {
          id: req.user?.id,
        },
      })
      .then(() => {
        return res.status(200).json({ msg: "User updated" });
      })
      .catch(async (err) => {
        if (err) {
          await supabase.storage.from("avatars").remove([req.user?.id!]);
          return next(createError(500, "Internal Server Error"));
        }
      });
  } catch (error) {
    return next(createError(500, "Internal Server Error"));
  }
};

export const user: RequestHandler = async (req, res, next) => {
  try {
    const { resetToken, ...user } = req.user as UserData;
    return res.status(200).json({ user });
  } catch (error) {
    return next(createError(500, "Internal Server Error"));
  }
};

export const isAuth: RequestHandler = async (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.json({ msg: "Authorized", access: true });
  } else {
    return res.json({
      msg: "Not authenticated or session expired",
      access: false,
      text: "Please sign in! ⛔",
    });
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
            if (req.isAuthenticated()) {
              req.session.destroy((err) => console.log(err));
              res.clearCookie("sess");
            }

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
