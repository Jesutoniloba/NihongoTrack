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

export const getVocabService = async (id, userId) => {
  const result = await pool.query(
    "SELECT * FROM vocabs WHERE id = $1 AND user_id = $2",
    [id, userId],
  );
  return result.rows[0];
};

export const updateVocabsService = async (word, meaning, id, userId) => {
  // Old logic kept for review:
  // const result = await pool.query(
  //   "UPDATE vocabs SET word = $1, meaning = $2 WHERE id = $3 RETURNING *",
  //   [word, meaning, id],
  // );

  // New logic:
  // Only update a vocab if it belongs to the current user.
  const result = await pool.query(
    "UPDATE vocabs SET word = $1, meaning = $2 WHERE id = $3 AND user_id = $4 RETURNING *",
    [word, meaning, id, userId],
  );
  return result.rows[0];
};

export const deleteVocabsService = async (id, userId) => {
  // Old logic kept for review:
  // const result = await pool.query(
  //   "DELETE FROM vocabs WHERE id = $1 RETURNING *",
  //   [id],
  // );

  // New logic:
  // Only delete a vocab if it belongs to the current user.
  const result = await pool.query(
    "DELETE FROM vocabs WHERE id = $1 AND user_id = $2 RETURNING *",
    [id, userId],
  );
  return result.rows[0];
};
