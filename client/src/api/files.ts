import { api } from "@/constants";
import { customAxiosError } from "@/helpers/error";
import axios from "axios";

export type FileData = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  type: string;
  url: string;
  title: string;
  isFavorite: boolean;
  isForDeletion: boolean;
  userId: string;
};

export type RenameFileArgs = {
  id: string;
  title?: string;
  isFavorite?: boolean;
  isForDeletion?: boolean;
};

type Files = {
  files: FileData[];
};

export const getFiles = async (): Promise<Files> => {
  try {
    const res = await axios.get(`${api}/files/all`, { withCredentials: true });

    return res.data;
  } catch (error) {
    throw customAxiosError(error);
  }
};

export const uploadFile = async (
  formData: FormData,
): Promise<{ msg: string }> => {
  try {
    const res = await axios.post(`${api}/files/upload-file`, formData, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  } catch (error) {
    throw customAxiosError(error);
  }
};

export const updateFile = async (
  args: RenameFileArgs,
): Promise<{ msg: string }> => {
  try {
    const { id, ...rest } = args;
    const res = await axios.post(
      `${api}/files/update/${id}`,
      { ...rest },
      { withCredentials: true },
    );

    return res.data;
  } catch (error) {
    throw customAxiosError(error);
  }
};
