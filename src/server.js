import express from "express";
import dotenv from "dotenv";
dotenv.config();
import router from "./routes/routes.js";
import { env } from "./config/env.js";
import errorHandling from "./middleware/errorHandler.js";
import createVocabsTable from "./data/create-vocabs-table.js";

const app = express();
const port = env.PORT;

app.use(express.json());

app.use("/api/vocabs", router);

app.use(errorHandling);

//Run Server
(async () => {
  await createVocabsTable();
  app.listen(port, () => {
    console.log(`Server running on http://localhost/${port}`);
  });
})();
