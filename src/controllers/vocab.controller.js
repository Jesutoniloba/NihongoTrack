import {
  getAllVocabsService,
  getVocabService,
  createVocabsService,
  deleteVocabsService,
  updateVocabsService,
} from "../models/vocab-model.js";

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
    handleResponse(res, 200, "Vocabs fetched sucessfully", vocabs);
  } catch (err) {
    next(err);
  }
};

const getVocab = async (req, res, next) => {
  try {
    const vocab = await getVocabService(req.params.id);
    if (!vocab) return handleResponse(res, 404, "Vocab not Found");
    handleResponse(res, 200, "Vocab fetched sucessfully", vocab);
  } catch (err) {
    next(err);
  }
};

const updateVocabs = async (req, res, next) => {
  try {
    const { word, meaning } = req.body;
    const vocab = await updateVocabsService(word, meaning, req.params.id);
    if (!vocab) return handleResponse(res, 404, "Vocab not Found");
    handleResponse(res, 201, "Vocab updated sucessfully", vocab);
  } catch (err) {
    next(err);
  }
};

const createVocabs = async (req, res, next) => {
  try {
    const word = req.body.word;
    const meaning = req.body.meaning;
    const userId = req.user.id;
    const newVocab = await createVocabsService(word, meaning, userId);
    handleResponse(res, 200, "Vocab created sucessfully", newVocab);
  } catch (err) {
    next(err);
  }
};

const deleteVocabs = async (req, res, next) => {
  try {
    const vocab = await deleteVocabsService(req.params.id);
    if (!vocab) return handleResponse(res, 404, "Vocab not Found");
    handleResponse(res, 201, "Vocab deleted sucessfully");
  } catch (err) {
    next(err);
  }
};
export { getAllVocabs, getVocab, updateVocabs, createVocabs, deleteVocabs };
