import express from "express";
import {
  getAllVocabs,
  createVocabs,
  updateVocabs,
  deleteVocabs,
  getVocab,
} from "../controllers/vocab.controller.js";
const router = express.Router();

router.get("/", getAllVocabs);
router.get("/:id", getVocab);
router.post("/", createVocabs);
router.put("/:id", updateVocabs);
router.delete("/:id", deleteVocabs);
export default router;
