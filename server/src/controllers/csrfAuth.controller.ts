import type { RequestHandler } from "express";
import { createError } from "../utils/error-handling.js";

export const csrfAuth: RequestHandler = async (req, res, next) => {
  const csrfToken = req.cookies.csrf;
  const headerCsrfToken = req.headers["x-csrf-token"];

  if (csrfToken !== headerCsrfToken) return next(createError(403, "Forbidden"));

  next();
};
