import pool from "../config/db.js";

export const createUserService = async (username, email, password_hash) => {
  const result = await pool.query(
    "INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING *",
    [username, email, password_hash],
  );
  return result.rows[0];
};

export const getAllUsersService = async () => {
  const result = await pool.query("SELECT * FROM users");
  return result.rows;
};

export const getUserService = async (id) => {
  const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  return result.rows[0];
};

export const updateUsersService = async (
  username,
  email,
  password_hash,
  id,
) => {
  const result = await pool.query(
    "UPDATE users SET username = $1,email = $2 ,password_hash = $3 WHERE id = $4 RETURNING *",
    [username, email, password_hash, id],
  );
  return result.rows[0];
};

export const deleteUsersService = async (id) => {
  const result = await pool.query(
    "DELETE FROM user WHERE id = $1 RETURNING *",
    [id],
  );
  return result.rows[0];
};
