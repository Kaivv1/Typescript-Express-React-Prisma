import { RequestHandler } from "express";
import prisma from "../prisma-client.js";
import { createError } from "../utils/error-handling.js";

export const auth: RequestHandler = async (req, res, next) => {
  try {
    if (req.isAuthenticated() && req.user) {
      const existingUser = await prisma.user.findUnique({
        where: {
          id: req.user.id,
        },
      });
      if (!existingUser) return next(createError(404, "User not found"));
      next();
    } else {
      next(createError(403, "Forbidden"));
    }
  } catch (error) {
    return next(createError(500, "Internal Server Error"));
  }
};
