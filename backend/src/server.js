import { PrismaClient } from "@prisma/client";
import { ENV } from "./config/env.js";
import express from "express";
import "dotenv/config";

const prisma = new PrismaClient();
const app = express();

const PORT = ENV.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}!!`);
});

app.get("/", (req, res) => {
  res.send("Backend działa! 🚀");
});
