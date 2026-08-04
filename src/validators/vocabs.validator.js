import { z } from "zod";

export const createVocabSchema = z.object({
  word: z.string({ message: "Please enter a word" }),
  meaning: z.string({ message: "Please enter a meaning" }),
});
