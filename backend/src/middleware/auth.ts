import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JwtPayload } from "../types";

export function auth(req: Request, res: Response, next: NextFunction) {
  const authH = req.headers.authorization;
  if (!authH?.startsWith("Bearer ")) return res.status(401).json({ error: "No token" });
  const token = authH.substring(7);
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
    (req as any).user = payload;
    next();
  } catch {
    return res.status(401).json({ error: "Invalid token" });
  }
}

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: number, email: string };
    req.user = { id: decoded.id, email: decoded.email }; // <- asignación correcta
    next();
  } catch (err) {
    res.status(401).json({ error: "Token inválido" });
  }
}