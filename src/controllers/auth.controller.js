import jwt from "jsonwebtoken";
import argon2 from "argon2";
import pool from "../config/db.js";
import { env } from "../config/env.js";
import { createUserService } from "../models/user-model.js";

export async function register(req, res) {
  const { username, email, password } = req.body;
  try {
    if (password && username && email) {
      const password_hash = await argon2.hash(password);

      const newUser = createUserService(username, email, password_hash);
      return res.status(201).json({
        message: "User created Sucessfully",
        newUser: newUser.username,
      });
    } else {
      res.status(400).send("Bad");
    }
  } catch (error) {}
}

export async function refresh(req, res) {
  const result = await pool.query(`SELECT email FROM users WHERE email = $1`, [
    req.body.email,
  ]);
  const user = result.rows[0];
  const refreshToken = req.body.token;
  if (!refreshToken) return res.json({ message: "No request token" });
  jwt.verify(refreshToken, env.REFRESH_TOKEN_SECRET);
  const accessToken = generateAccessToken(user);
  res.json({ accessToken: accessToken });
}
export async function login(req, res) {
  const result = await pool.query(
    `SELECT email,id FROM users WHERE email = $1`,
    [req.body.email],
  );
  const user = result.rows[0];
  if (!user) return res.status(404).send(" User not found");
  try {
    const hash = await pool.query(
      `SELECT password_hash from users WHERE email = $1 LIMIT 1`,
      [req.body.email],
    );
    const storedHash = hash.rows[0].password_hash;
    if (await argon2.verify(storedHash, req.body.password)) {
      const accessToken = generateAccessToken(user);

      const refreshToken = jwt.sign(user, env.REFRESH_TOKEN_SECRET, {
        expiresIn: env.REFRESH_TOKEN_EXPIRES_IN,
      });
      await pool.query(`UPDATE users SET refresh_token = $1 WHERE email = $2`, [
        refreshToken,
        req.body.email,
      ]);
      res.json({
        accessToken: accessToken,
        refreshToken: refreshToken,
        user: user,
      });
    } else {
      res.status(403).send("Authentication Failed");
    }
  } catch (err) {}
}

function generateAccessToken(user) {
  return jwt.sign(user, env.ACCESS_TOKEN_SECRET, {
    expiresIn: env.ACCESS_TOKEN_EXPIRES_IN,
  });
}

export async function logout(req, res) {
  await pool.query(`UPDATE  users SET refresh_token = NULL WHERE email = $1`, [
    req.body.email,
  ]);
  res.json({ message: "Logout" });
}
