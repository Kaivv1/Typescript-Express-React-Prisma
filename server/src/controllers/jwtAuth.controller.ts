import type { RequestHandler, Request as ExpressRequest } from "express";
import { verifyJwtToken } from "../utils/jwt-token.js";
import prisma from "../prisma-client.js";
import { VerifyErrors } from "jsonwebtoken";
import { createError } from "../utils/error-handling.js";

export type Request = ExpressRequest & {
  userId?: string;
};

export const jwtAuth: RequestHandler = async (req: Request, res, next) => {
  const token = req.signedCookies.access_token;

  await verifyJwtToken(token)
    .then(async (decoded) => {
      const user = await prisma.user.findFirst({ where: { id: decoded.id } });
      if (!user) return next(createError(404, "User not found!"));
      req.userId = user.id;
      next();
    })
    .catch((err: VerifyErrors) => {
      return next(createError(401, err.message));
    });
};
