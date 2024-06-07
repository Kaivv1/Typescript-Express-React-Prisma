import { api } from "@/constants";
import { customAxiosError } from "@/helpers/error";
import axios from "axios";

export type FileData = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  trashedAt?: Date;
  type: string;
  url: string;
  size: string;
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
  trashedAt?: Date;
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

export const searchFiles = async (query: string): Promise<Files> => {
  try {
    const res = await axios.get(`${api}/files/search?query=${query}`, {
      withCredentials: true,
    });

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
    const res = await axios.patch(
      `${api}/files/update/${id}`,
      { ...rest },
      { withCredentials: true },
    );

    return res.data;
  } catch (error) {
    throw customAxiosError(error);
  }
};

export const deleteFile = async (id: string): Promise<{ msg: string }> => {
  try {
    const res = await axios.delete(`${api}/files/delete/${id}`, {
      withCredentials: true,
    });

    return res.data;
  } catch (error) {
    throw customAxiosError(error);
  }
};

export const deleteAll = async (args: {
  files: FileData[];
}): Promise<{ msg: string }> => {
  try {
    const res = await axios.put(
      `${api}/files/delete/all`,
      { ...args },
      {
        withCredentials: true,
      },
    );

    return res.data;
  } catch (error) {
    throw customAxiosError(error);
  }
};
