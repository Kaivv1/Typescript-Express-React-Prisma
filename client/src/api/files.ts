import { api } from "@/constants";
import { customAxiosError } from "@/helpers/error";
import axios from "axios";

type UploadFile = {
  title: string;
  file: File;
};

type UploadFileData = {
  msg: string;
};

type FileData = {
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
): Promise<UploadFileData> => {
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
