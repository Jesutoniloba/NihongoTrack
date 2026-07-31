import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  getAllVocabs,
  createVocabs,
  updateVocabs,
  deleteVocabs,
  getVocab,
} from "../controllers/vocab.controller.js";
const router = express.Router();

router.get("/", verifyToken, getAllVocabs);
router.get("/:id", verifyToken, getVocab);
router.post("/", verifyToken, createVocabs);
router.put("/:id", verifyToken, updateVocabs);
router.delete("/:id", verifyToken, deleteVocabs);
export default router;
