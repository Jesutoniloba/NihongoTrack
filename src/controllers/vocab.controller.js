import {
  getAllVocabsService,
  getVocabService,
  createVocabsService,
  deleteVocabsService,
  updateVocabsService,
} from "../models/vocab-model.js";
import { createVocabSchema } from "../validators/vocabs.validator.js";

const handleResponse = (res, status, message, data = null) => {
  res.status(status).json({
    status,
    message,
    data,
  });
};

const getAllVocabs = async (req, res, next) => {
  try {
    const vocabs = await getAllVocabsService(req.user.id);
    handleResponse(res, 200, "Vocabs fetched successfully", vocabs);
  } catch (err) {
    next(err);
  }
};

const getVocab = async (req, res, next) => {
  try {
    const vocab = await getVocabService(req.params.id, req.user.id);
    if (!vocab) return handleResponse(res, 404, "Vocab not Found");
    handleResponse(res, 200, "Vocab fetched successfully", vocab);
  } catch (err) {
    next(err);
  }
};

const updateVocabs = async (req, res, next) => {
  try {
    const { word, meaning } = req.body;
    const vocab = await updateVocabsService(
      word,
      meaning,
      req.params.id,
      req.user.id,
    );
    if (!vocab) return handleResponse(res, 404, "Vocab not Found");
    handleResponse(res, 200, "Vocab updated successfully", vocab);
  } catch (err) {
    next(err);
  }
};

const createVocabs = async (req, res, next) => {
  const result = createVocabSchema.safeParse(req.body);
  if (!result.success)
    return res.status(400).json({ error: result.error.issues });
  try {
    const word = req.body.word;
    const meaning = req.body.meaning;
    const userId = req.user.id;
    const newVocab = await createVocabsService(word, meaning, userId);
    handleResponse(res, 200, "Vocab created successfully", newVocab);
  } catch (err) {
    next(err);
  }
};

const deleteVocabs = async (req, res, next) => {
  try {
    const vocab = await deleteVocabsService(req.params.id, req.user.id);
    if (!vocab) return handleResponse(res, 404, "Vocab not Found");
    handleResponse(res, 200, "Vocab deleted successfully");
  } catch (err) {
    next(err);
  }
};
export { getAllVocabs, getVocab, updateVocabs, createVocabs, deleteVocabs };
