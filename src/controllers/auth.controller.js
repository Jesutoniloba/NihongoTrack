import jwt from "jsonwebtoken";
import argon2 from "argon2";
import pool from "../config/db.js";
import { env } from "../config/env.js";
import { createUserService } from "../models/user-model.js";

export async function register(req, res) {
  const password_hash = await argon2.hash(req.body.password);
  const { username, email } = req.body;
  const newUser = createUserService(username, email, password_hash);
  res
    .status(201)
    .json({ message: "User created Sucessfully", newUser: newUser.username });
}

//async function verifyUser(req, res) {}
export async function login(req, res) {
  const result = await pool.query(`SELECT email FROM users WHERE email = $1`, [
    req.body.email,
  ]);
  const user = result.rows[0];
  if (!user) return res.status(404).send(" User not found");
  try {
    const hash = await pool.query(
      `SELECT password_hash from users WHERE email = $1 LIMIT 1`,
      [req.body.email],
    );
    const storedHash = hash.rows[0].password_hash;
    if (await argon2.verify(storedHash, req.body.password)) {
      //   res
      //   .status(200)
      //   .json({ user: user, message: "AUTHENTICATION SUCESSFULL" });
    } else {
      // res.status(403).send("Authentication Failed");
    }
  } catch (err) {
    res.send("Authentication Error");
  }
  const accessToken = generateAccessToken(user);
  res.json({ accessToken: accessToken });
}

function generateAccessToken(user) {
  return jwt.sign(user, env.ACCESS_TOKEN_SECRET, { expiresIn: "20s" });
}

export async function logout(req, res) {}
