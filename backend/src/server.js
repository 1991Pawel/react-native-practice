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

app.put("/user/update", async (req, res) => {
  console.log("Received request to update user");
  console.log("Request body:", req.body);

  const { clerkId, name } = req.body;

  if (!clerkId) {
    return res.status(400).json({ error: "clerkId jest wymagane" });
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { clerkId },
      data: {
        firstName: name,
        profileCompleted: true,
      },
    });

    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Błąd podczas edytowania użytkownika" });
  }
});

app.get("/user/:clerkId", async (req, res) => {
  const { clerkId } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { clerkId },
    });

    if (!user) {
      return res.status(404).json({ error: "Użytkownik nie znaleziony" });
    }

    res.json(user);
  } catch (error) {
    console.error("Błąd podczas pobierania użytkownika:", error);
    res.status(500).json({ error: "Błąd serwera" });
  }
});
