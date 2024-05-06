import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import compression from "compression";
import { userRouter } from "./routes/user.route.js";
import morgan from "morgan";
import { errorHandler } from "./utils/error-handling.js";
import cookieParser from "cookie-parser";
import { client } from "./constants.js";

dotenv.configDotenv();
const app: Application = express();

app.use(
  cors({
    credentials: true,
    origin: client,
    methods: ["GET", "POST", "PUT", "DELETE", "HEAD", "PATCH"],
  })
);

app.disable("x-powered-by");
app.use(compression());
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use("/user", userRouter);

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`App running on port ${port}`));

app.use(errorHandler);

export default app;
