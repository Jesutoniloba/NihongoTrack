import { z } from "zod";

export const createVocabSchema = z.object({
  word: z.string().min(1, { message: "Please enter a word" }),
  meaning: z.string().min(1, { message: "Please enter a meaning" }),
});
