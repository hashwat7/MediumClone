import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
const jwt = require("jsonwebtoken");
const prisma = new PrismaClient();

declare global {
  namespace Express {
    interface Request {
      userId?: string; // Define the userId property (optional or as needed)
    }
  }
}

export const userMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ msg: "No token provided" });
  }

  const words = token.split(" ");
  if (words.length !== 2 || words[0] !== "Bearer") {
    return res.status(401).json({ msg: "Invalid token format" });
  }

  const jwtToken = words[1];

  try {
    const decodedValue = jwt.verify(jwtToken, process.env.JWT_SECRET);

    if (decodedValue && decodedValue.id) {
      req.userId = decodedValue.id;
      next();
    } else {
      res.status(403).json({ msg: "You are not authenticated" });
    }
  } catch (error) {
    res.status(401).json({ msg: "Invalid token" });
  }
};
