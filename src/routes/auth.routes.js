import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  register,
  refresh,
  login,
  logout,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/refresh", refresh);
router.post("/login", login);
router.post("/logout", verifyToken, logout);

export default router;
