import express from "express";
import dotenv from "dotenv";
dotenv.config();
import router from "./routes/routes.js";
import authRoutes from "./routes/auth.routes.js";
import { env } from "./config/env.js";
import errorHandling from "./middleware/errorHandler.js";
import createVocabsTable from "./data/create-vocabs-table.js";
import createUsersTable from "./data/create-users-table.js";

const app = express();
const port = env.PORT;

app.use(express.json());

app.use("/api/vocabs", router);
app.use("/api/auth", authRoutes);
app.get("/", (req, res) => {
  res.status(200).send("whyyyyyy");
});

app.use(errorHandling);

//Run Server

async function startServer() {
  await createUsersTable();
  await createVocabsTable();
  app.listen(port, () => {
    console.log(`Server running on http://localhost/${port}`);
  });
}

startServer();
