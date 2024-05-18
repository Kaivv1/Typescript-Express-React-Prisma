import type { ErrorRequestHandler, Response } from "express";

export type CustomError = {
  statusCode: number;
} & Error;

export type CustomErrorResponse = {
  statusCode: number;
  success: boolean;
  msg: string;
};

export function createError(statusCode: number, msg: string): CustomError {
  const error: CustomError = new Error(msg) as CustomError;
  error.statusCode = statusCode;

  return error;
}

export const errorHandler: ErrorRequestHandler = function (
  err: CustomError,
  req,
  res: Response<CustomErrorResponse>,
  next
) {
  const statusCode = err.statusCode || 500;
  const msg = err.message || "Internal Server Error";
  const success: boolean = false;

  return res.status(statusCode).json({ msg, success, statusCode });
};
