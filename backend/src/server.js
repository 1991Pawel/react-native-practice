import { PrismaClient } from "@prisma/client";
import { ENV } from "./config/env.js";
import express from "express";
import "dotenv/config";

const prisma = new PrismaClient();
const app = express();
app.use(express.json());

const PORT = ENV.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}!!`);
});

app.get("/", (req, res) => {
  res.send("Backend działa! 🚀");
});

app.post("/register", async (req, res) => {
  const { email, clerkId } = req.body;

  if (!email || !clerkId) {
    return res.status(400).json({ error: "Email i clerkId są wymagane" });
  }

  try {
    const newUser = await prisma.user.create({
      data: { email, clerkId },
    });
    res.json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Błąd podczas tworzenia użytkownika" });
  }
});
