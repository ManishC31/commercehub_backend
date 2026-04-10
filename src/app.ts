import express from "express";
import { Express } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import mainRoute from "./routes/index.route.ts";

const app: Express = express();

// middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// main route
app.use("/api", mainRoute);

export default app;
