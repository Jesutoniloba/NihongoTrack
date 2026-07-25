import pool from "../config/db.js";

const vocabs = [
  ["\u5b66\u751f", "student"],
  ["\u81ea\u8ee2\u8eca", "bicycle"],
  ["\u6620\u753b", "movie"],
  ["\u672c", "book"],
  ["\u5b66\u6821", "school"],
];

const seedJapaneseVocabs = async () => {
  await pool.query("DELETE FROM vocabs");

  for (const [word, meaning] of vocabs) {
    await pool.query(
      "INSERT INTO vocabs (word, meaning) VALUES ($1, $2)",
      [word, meaning],
    );
  }
};

try {
  await seedJapaneseVocabs();
  console.log("Japanese vocabs seeded successfully");
} catch (error) {
  console.error("Failed to seed Japanese vocabs", error);
  process.exitCode = 1;
} finally {
  await pool.end();
}
