import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import compression from "compression";
import { userRouter } from "./routes/user.route.js";
import morgan from "morgan";
import { errorHandler } from "./utils/error-handling.js";
import cookieParser from "cookie-parser";
import { client, port } from "./constants.js";
import session from "express-session";
import passport from "passport";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import prisma from "./prisma-client.js";
import {
  githubStrategy,
  googleStrategy,
} from "./passport/social-strategies.js";
import { localStrategy } from "./passport/local-strategy.js";
import { filesRouter } from "./routes/files.route.js";
import "./cron-jobs.js";

dotenv.configDotenv();
const app: Application = express();
app.set("trust proxy", 1);
app.use(
  cors({
    credentials: true,
    origin: [client],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD"],
  })
);

app.use(
  session({
    name: "sess",
    secret: process.env.COOKIE_SECRET!,
    resave: false,
    saveUninitialized: true,
    proxy: true,
    cookie: {
      maxAge: 60 * 60 * 1000,
      secure: true,
      sameSite: "none",
    },
    store: new PrismaSessionStore(prisma, {
      checkPeriod: 30 * 60 * 1000,
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  })
);

app.use(express.urlencoded({ extended: false }));
app.disable("x-powered-by");
app.use(compression());
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

passport.use(googleStrategy);
passport.use(githubStrategy);
passport.use(localStrategy);

app.use("/user", userRouter);
app.use("/files", filesRouter);
app.use("/", (req, res) => {
  return res.status(200).json({ msg: "Hello" });
});
app.listen(port, () => console.log(`App running on port ${port}`));

app.use(errorHandler);

export default app;
