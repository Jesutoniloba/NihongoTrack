import pool from "../config/db.js";

const createVocabsTable = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS vocabs(
    id SERIAL PRIMARY KEY,
    word TEXT NOT NULL,
    meaning TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
)
`;
  try {
    await pool.query(queryText);
    console.log("Vovab table created");
  } catch (error) {
    console.log("Error creating vocab table", error);
  }
};

export default createVocabsTable;
