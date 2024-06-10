import { RequestHandler } from "express";
import prisma from "../prisma-client.js";
import { supabase, supabaseUrl } from "../supabase.js";
import { createError } from "../utils/error-handling.js";
type UploadRequestBody = {
  title: string;
};

type FileData = {
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

type SupportedFileTypes =
  | "application/pdf"
  | "image/jpeg"
  | "image/png"
  | "text/plain"
  | "text/csv";

const isSupportedFileType = (fileType: string): boolean => {
  return [
    "application/pdf",
    "image/jpeg",
    "image/png",
    "text/plain",
    "text/csv",
  ].includes(fileType);
};

const getFileType = (file: Express.Multer.File) => {
  let type;
  switch (file.mimetype) {
    case "application/pdf":
      return (type = "pdf");
    case "image/jpeg":
      return (type = "image");
    case "image/png":
      return (type = "image");
    case "text/plain":
      return (type = "txt");
    case "text/csv":
      return (type = "csv");
  }
  return type;
};

const calcFileSize = (file: Express.Multer.File) => {
  const sizeInBytes = file.size;
  const sizeInKB = +(sizeInBytes / 1024).toFixed(0);
  const sizeInMB = +(sizeInKB / 1024).toFixed(0);
  const fileSize = `${sizeInKB >= 1024 ? sizeInMB : sizeInKB} ${
    sizeInKB >= 1024 ? "MB" : "KB"
  }`;
  return { fileSize, sizeInMB };
};

export const getFiles: RequestHandler = async (req, res, next) => {
  try {
    const files = await prisma.file.findMany({
      where: {
        userId: req.user?.id,
      },
    });

    if (!files) return next(createError(404, "No files found"));

    return res.status(200).json({ files });
  } catch (error) {
    return next(createError(500, "Internal Server Error"));
  }
};

export const searchFiles: RequestHandler<
  unknown,
  unknown,
  unknown,
  { query: string }
> = async (req, res, next) => {
  try {
    const { query } = req.query;
    if (!query) return next(createError(400, "No query provided"));

    const searchedFiles = await prisma.file.findMany({
      where: {
        userId: req.user?.id,
        title: {
          contains: query,
        },
      },
    });
    if (!searchedFiles || searchedFiles.length === 0)
      return next(createError(404, "No results found"));

    return res.status(200).json({ files: searchedFiles });
  } catch (error) {
    return next(createError(500, "Internal Server Error"));
  }
};

export const upload: RequestHandler<
  unknown,
  unknown,
  UploadRequestBody
> = async (req, res, next) => {
  try {
    const file = req.file;
    const { title } = req.body;

    if (!file) return next(createError(404, "No file provided"));

    const isFileSupported = isSupportedFileType(
      req.file?.mimetype as SupportedFileTypes
    );

    if (!isFileSupported)
      return next(createError(415, "File type not supported"));

    const { sizeInMB, fileSize } = calcFileSize(file);

    if (sizeInMB > 10) return next(createError(413, "File exceeds 10MB"));

    const userFiles = await prisma.file.findMany({
      where: { userId: req.user?.id },
    });

    const isExisting = userFiles.some((file) => file.title === title);

    if (isExisting)
      return next(
        createError(
          409,
          "File with this title already exists, choose another title."
        )
      );

    const { error: bucketError } = await supabase.storage
      .from("files")
      .upload(title, file.buffer, {
        contentType: file.mimetype,
      });

    if (bucketError)
      return next(createError(500, "Error uploading file to bucket"));

    const fileUrl = `${supabaseUrl}/storage/v1/object/public/files/${title}`;
    const fileType = getFileType(file);
    await prisma.file
      .create({
        data: {
          title,
          url: fileUrl,
          type: fileType!,
          userId: req.user?.id!,
          size: fileSize,
          isFavorite: false,
          isForDeletion: false,
        },
      })
      .then(() => {
        return res.status(200).json({ msg: "File uploaded" });
      })
      .catch(async (error) => {
        if (error) {
          await supabase.storage.from("files").remove([title]);
          return next(createError(500, "Error uploading file to database"));
        }
      });
  } catch (error) {
    return next(createError(500, "Internal Server Error"));
  }
};

export const update: RequestHandler<
  { id: string },
  unknown,
  { title?: string; isFavorite?: boolean; isForDeletion?: boolean }
> = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) return next(createError(400, "No id provided"));

    await prisma.file
      .update({
        where: {
          id,
        },
        data: {
          ...req.body,
        },
      })
      .then(() => {
        return res.status(200).json({ msg: "File updated" });
      })
      .catch((error) => {
        if (error) return next(createError(500, "Error updating database"));
      });
  } catch (error) {
    return next(createError(500, "Internal Server Error"));
  }
};

export const remove: RequestHandler<{ id: string }> = async (
  req,
  res,
  next
) => {
  try {
    const { id } = req.params;

    const file = await prisma.file.findUnique({
      where: {
        id,
      },
    });

    if (!file) return next(createError(404, "File not found"));

    await prisma.file
      .delete({
        where: {
          id,
        },
      })
      .then(() => {
        return res.status(200).json({ msg: "File deleted" });
      })
      .catch((error) => {
        if (error)
          return next(
            createError(
              500,
              "There was a problem deleting this file from the database"
            )
          );
      });
  } catch (error) {
    return next(createError(500, "Internal Server Error"));
  }
};

export const removeAll: RequestHandler<
  unknown,
  unknown,
  { files: FileData[] }
> = async (req, res, next) => {
  try {
    const { files } = req.body;

    if (!files || files.length === 0)
      return next(createError(404, "No files found"));

    await prisma.file
      .deleteMany({
        where: {
          id: {
            in: files.map((file) => file.id),
          },
        },
      })
      .then(async () => {
        const imageNames = files.map((file) => file.title);
        await supabase.storage
          .from("files")
          .remove(imageNames)
          .catch((error) => {
            if (error)
              return next(
                createError(500, "Problem deleting file images from bucket")
              );
          });
        return res.status(200).json({ msg: "Files deleted" });
      })
      .catch((error) => {
        if (error)
          return next(
            createError(500, "Problem deleting the files from the database")
          );
      });
  } catch (error) {
    return next(createError(500, "Internal Server Error"));
  }
};
