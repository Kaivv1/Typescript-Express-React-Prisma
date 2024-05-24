import { Router } from "express";
import multer from "multer";
import { getFiles, upload } from "../controllers/files.controller.js";
import { auth } from "../controllers/auth.controller.js";

const storage = multer.memoryStorage();
const uploadFile = multer({ storage });

export const filesRouter = Router();

filesRouter.post("/upload-file", auth, uploadFile.single("file"), upload);
filesRouter.get("/all", auth, getFiles);
