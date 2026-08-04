import pool from "../config/db.js";

export const createVocabsService = async (word, meaning, userId) => {
  const result = await pool.query(
    "INSERT INTO vocabs (word, meaning, user_id) VALUES ($1, $2, $3) RETURNING *",
    [word, meaning, userId],
  );
  return result.rows[0];
};

export const getAllVocabsService = async (userId) => {
  const result = await pool.query("SELECT * FROM vocabs WHERE user_id = $1", [
    userId,
  ]);

  return result.rows;
};

export const getVocabService = async (id) => {
  const result = await pool.query("SELECT * FROM vocabs WHERE id = $1", [id]);
  return result.rows[0];
};

export const updateVocabsService = async (word, meaning, id) => {
  const result = await pool.query(
    "UPDATE vocabs SET word = $1, meaning = $2 WHERE id = $3 RETURNING *",
    [word, meaning, id],
  );
  return result.rows[0];
};

export const deleteVocabsService = async (id) => {
  const result = await pool.query(
    "DELETE FROM vocabs WHERE id = $1 RETURNING *",
    [id],
  );
  return result.rows[0];
};
