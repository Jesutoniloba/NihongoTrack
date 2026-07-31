import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
export function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "access token required" });

  const decoded = jwt.verify(token, env.ACCESS_TOKEN_SECRET);
  req.user = decoded;
  next();
}
