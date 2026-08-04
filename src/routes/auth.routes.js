import express from "express";
import {
  register,
  refresh,
  login,
  logout,
} from "../controllers/auth.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/register", register);
router.post("/refresh", refresh);
router.post("/login", login);
router.post("/logout", verifyToken, logout);

export default router;
