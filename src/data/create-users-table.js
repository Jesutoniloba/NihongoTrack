import pool from "../config/db.js";

const createUsersTable = async () => {
  const queryText = `
   CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(225) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    refresh_token TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
) `;
  await pool.query(queryText);
  console.log("Users table created");
};
export default createUsersTable;
