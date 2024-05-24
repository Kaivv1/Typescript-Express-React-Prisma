import { api } from "@/constants";
import { customAxiosError } from "@/helpers/error";
import axios from "axios";

export type User = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  fullName: string;
  password: string;
  avatar?: string | null;
  provider?: string;
};

export type IsAuth = {
  access: boolean;
  msg: string;
  text?: string;
};

export type RegisterArgs = {
  email: string;
  fullName: string;
  password: string;
};

export type RegisterData = {
  msg: string;
};

export type LoginArgs = {
  email: string;
  password: string;
};

export type LoginData = {
  msg: string;
  user: User;
};

export type ForgotPasswordArgs = {
  email: string;
};

export type ForgotPasswordData = {
  msg: string;
};

export type ResetPasswordArgs = {
  token: string;
};

export type ResetPasswordData = {
  msg: string;
};

type UserData = {
  user: User;
};

export const isAuth = async (): Promise<IsAuth> => {
  const res = await axios.get(`${api}/user/auth`, { withCredentials: true });

  return res.data;
};

export const user = async (): Promise<UserData> => {
  try {
    const res = await axios.get(`${api}/user/user-data`, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    throw customAxiosError(error);
  }
};

export const login = async (args: LoginArgs) => {
  try {
    await axios.post(
      `${api}/user/login`,
      { ...args },
      { withCredentials: true },
    );
  } catch (error) {
    throw customAxiosError(error);
  }
};

export const register = async (args: RegisterArgs): Promise<RegisterData> => {
  try {
    const res = await axios.post(`${api}/user/register`, { ...args });

    return res.data;
  } catch (error) {
    throw customAxiosError(error);
  }
};

export const forgotPassword = async (
  args: ForgotPasswordArgs,
): Promise<ForgotPasswordData> => {
  try {
    const res = await axios.post(`${api}/user/forgot-password`, { ...args });

    return res.data;
  } catch (error) {
    throw customAxiosError(error);
  }
};

export const resetPassword = async (
  args: ResetPasswordArgs,
): Promise<ResetPasswordData> => {
  try {
    const res = await axios.post(`${api}/user/reset-password`, { ...args });

    return res.data;
  } catch (error) {
    throw customAxiosError(error);
  }
};

export const logout = async () => {
  try {
    await axios.delete(`${api}/user/logout`, {
      withCredentials: true,
    });
  } catch (error) {
    throw customAxiosError(error);
  }
};
