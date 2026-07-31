import express from "express";
import dotenv from "dotenv";
dotenv.config();
import router from "./routes/routes.js";
import authRoutes from "./routes/auth.routes.js";
import { env } from "./config/env.js";
import errorHandling from "./middleware/errorHandler.js";

const app = express();
const port = env.PORT;

app.use(express.json());

app.use("/api/vocabs", router);
app.use("/api/auth", authRoutes);
app.get("/", (req, res) => {
  res.status(200).send("whyyyyyy");
});

app.use(errorHandling);

export default app;

async function startServer() {
  const [{ default: createUsersTable }, { default: createVocabsTable }] =
    await Promise.all([
      import("./data/create-users-table.js"),
      import("./data/create-vocabs-table.js"),
    ]);
  await createUsersTable();
  await createVocabsTable();
  app.listen(port, () => {
    console.log(`Server running on http://localhost/${port}`);
  });
}

if (process.argv[1] && import.meta.url === new URL(`file://${process.argv[1]}`).href) {
  startServer();
}
