import type { AxiosError } from "axios";

export type CustomError = {
  msg: string;
  statusCode: number;
  success: boolean;
};

export const customAxiosError = (error: unknown) => {
  const err = error as AxiosError;
  return err.response?.data;
};
