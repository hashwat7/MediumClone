import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { sign } from "jsonwebtoken";
const router = Router();
const prisma = new PrismaClient();

router.post("/", async (req: Request, res: Response) => {
  const { email, name, password } = req.body;
  try {
    const user = await prisma.user.create({
      data: {
        email: email,
        name: name,
        password: password,
      },
    });
    const jwtToken = sign(
      { id: user.id, name: user.name },
      process.env.JWT_SECRET as string
    );
    res.json({ jwt: jwtToken });
  } catch (error) {
    console.error("Error signing up:", error);
    res.status(403).json({ error: "Error while signing up" });
  }
});

export default router;
