import jwt from "jsonwebtoken";
import argon2 from "argon2";
import { createUserService } from "../models/user-model.js";

export async function register(req, res) {
  const password_hash = await argon2.hash(req.body.password);
  const { username, email } = req.body;
  const newUser = createUserService(username, email, password_hash);
  res
    .status(201)
    .json({ message: "User created Sucessfully", newUser: newUser.username });
}

export async function login(req, res) {}

export async function logout(req, res) {}
