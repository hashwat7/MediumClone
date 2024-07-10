import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { sign } from "jsonwebtoken";
import { z, ZodError } from "zod";
const router = Router();
const prisma = new PrismaClient();

export const signinInput = z.object({
  email: z.string().email(),
  password: z.string(),
});

router.post("/", async (req: Request, res: Response) => {
  const body = req.body;
  const { success } = signinInput.safeParse(body);

  if (!success) {
    return res.status(400).json({ error: "invalid input" });
  }

  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res.status(403).json({ error: "User not found" });
    }
    if (user.password != password) {
      return res.status(403).json({ error: "Invalid username/password" });
    }
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error("JWT_SECRET is not defined in environment variables");
    }

    const jwtToken = sign({ id: user.id, name: user.name }, jwtSecret);
    res.json({ jwt: jwtToken });
  } catch (error) {
    console.error("Error signing in:", error);
    res.status(500).json({ error: "Error while signing in" });
  }
});

export default router;
