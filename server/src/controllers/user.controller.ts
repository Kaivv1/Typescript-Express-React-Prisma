import type { RequestHandler } from "express";
import bcryptjs from "bcryptjs";
import prisma from "../prisma-client.js";
import { createError } from "../utils/error-handling.js";
import { createJwtToken } from "../utils/jwt-token.js";
import { randomBytes } from "crypto";

type BaseUserData = {
  email: string;
  fullName: string;
  password: string;
  avatar?: string | null;
};

type UserData = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
} & BaseUserData;

type LoginRequest = {
  email: string;
  password: string;
};

type SuccessResponse<T = {}> = {
  msg: string;
  success: boolean;
  data?: T | null;
};

export const register: RequestHandler<{}, {}, BaseUserData> = async function (
  req,
  res,
  next
) {
  try {
    const { password } = req.body;
    const hashesPassword: string = await bcryptjs.hash(password, 10);

    await prisma.user.create({
      data: { ...req.body, password: hashesPassword },
    });

    const successResponse: SuccessResponse = {
      msg: "User created",
      success: true,
    };
    return res.status(200).json(successResponse);
  } catch (error) {
    return next(createError(500, "Internal Server Error"));
  }
};

export const login: RequestHandler<{}, {}, LoginRequest> = async function (
  req,
  res,
  next
) {
  try {
    const { email, password } = req.body;

    const existingUser = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!existingUser) return next(createError(404, "Invalid credentials"));

    const correctPassword = bcryptjs.compareSync(
      password,
      existingUser.password
    );
    if (!correctPassword) return next(createError(404, "Invalid credentials"));

    const userId = existingUser.id;

    await createJwtToken(userId, "1hr")
      .then(function (token) {
        res.cookie("access_token", token, {
          httpOnly: true,
          signed: true,
        });
      })
      .catch(function (err) {
        if (err) next(createError(500, "Error creating token"));
      });

    const csrfToken = randomBytes(148).toString("hex");

    res.cookie("csrf", csrfToken, {
      httpOnly: true,
    });

    const successResponse: SuccessResponse = {
      msg: "User logged in. Session created",
      success: true,
      data: {
        token: csrfToken,
      },
    };
    return res.status(200).json(successResponse);
  } catch (error) {
    return next(createError(500, "Internal Server Error"));
  }
};

export const update: RequestHandler<unknown, unknown, UserData> =
  async function (req, res, next) {
    try {
      console.log(req.body);

      const updatedUser = await prisma.user
        .update({
          data: {
            ...req.body,
          },
          where: {
            id: req.body.id,
          },
        })
        .catch((err) => {
          if (err) return next(createError(500, "Internal Server Error"));
        });

      const successResponse: SuccessResponse = {
        msg: "User updated",
        success: true,
        data: updatedUser,
      };

      return res.status(200).json(successResponse);
    } catch (error) {
      return next(createError(500, "Internal Server Error"));
    }
  };
