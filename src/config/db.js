import pg from "pg";
const { Pool } = pg;
import { env } from "./env.js";

const pool = new Pool({
  connectionString: env.DATABASE_URL,
});

export default pool;
