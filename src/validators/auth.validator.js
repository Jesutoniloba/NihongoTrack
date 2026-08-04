import { z } from "zod";

export const registerSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, { message: "Must be 3 or more characters long" })
    .max(20, { message: "Must not be  more than 20 characters long" })
    .refine((value) => !value.includes("_"), {
      message: "Username cannot include underscore",
    }),
  email: z.email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(8, { message: "Must be 8 or more characters long" })
    .refine((value) => !value.includes(" "), {
      message: "Password cannot include spaces",
    }),
});

export const loginSchema = z.object({
  email: z.email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(8, { message: "Must be 8 or more characters long" })
    .refine((value) => !value.includes(" "), {
      message: "Password cannot include spaces",
    }),
});

export const logoutSchema = z.object({
  email: z.email({ message: "Please enter a valid email address" }),
});
