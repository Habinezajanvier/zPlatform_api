import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import { PrismaClient } from '@prisma/client'
import router from "./routes";

dotenv.config();

const app: Express = express();
const prisma = new PrismaClient()

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

app.use("/api", router)

app.all("*", (_req: Request, res: Response) => {
  res.status(404).json({ error: "Route not found" });
});

export default app;
