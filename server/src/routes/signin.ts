import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { sign } from "jsonwebtoken";
const router = Router();
const prisma = new PrismaClient();

router.post("/signin", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
        password: password,
      },
    });

    if (!user) {
      return res.status(403).json({ error: "User not found" });
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
