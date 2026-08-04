import jwt from "jsonwebtoken";
import argon2 from "argon2";
import pool from "../config/db.js";
import { env } from "../config/env.js";
import { createUserService } from "../models/user-model.js";
import {
  registerSchema,
  loginSchema,
  logoutSchema,
} from "../validators/auth.validator.js";

export async function register(req, res, next) {
  const result = registerSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ error: result.error.issues });
  }
  const { username, email, password } = result.data;
  try {
    const password_hash = await argon2.hash(password);

    const newUser = await createUserService(username, email, password_hash);
    return res.status(201).json({
      message: "User created Sucessfully",
      newUser: newUser.username,
    });
  } catch (err) {
    next(err);
  }
}

export async function refresh(req, res, next) {
  const result = await pool.query(`SELECT email FROM users WHERE email = $1`, [
    req.body.email,
  ]);
  const user = result.rows[0];

  try {
    const refreshToken = req.body.token;
    if (!refreshToken) return res.json({ message: "No request token" });
    const result = await pool.query(
      `SELECT refresh_token FROM users WHERE email = $1`,
      [req.body.email],
    );
    const storedToken = result.rows[0]?.refresh_token;
    const token = jwt.verify(refreshToken, env.REFRESH_TOKEN_SECRET);

    if (!storedToken) {
      return res.status(401).json({ message: "refresh token not found" });
    }
    if (refreshToken !== storedToken) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const accessToken = generateAccessToken(user);
    return res.json({ accessToken: accessToken });
  } catch (err) {
    return res.status(401).json({ message: "invalid token" });
  }
}

export async function login(req, res, next) {
  const result = loginSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ error: result.error.issues });
  }
  const { email, password } = result.data;
  const credential = await pool.query(
    `SELECT email,id FROM users WHERE email = $1`,
    [email],
  );
  const user = credential.rows[0];
  if (!user) return res.status(404).send(" User not found");
  try {
    const hash = await pool.query(
      `SELECT password_hash from users WHERE email = $1 LIMIT 1`,
      [req.body.email],
    );
    const storedHash = hash.rows[0].password_hash;
    if (await argon2.verify(storedHash, password)) {
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
  } catch (err) {
    next(err);
  }
}

function generateAccessToken(user) {
  return jwt.sign(user, env.ACCESS_TOKEN_SECRET, {
    expiresIn: env.ACCESS_TOKEN_EXPIRES_IN,
  });
}

export async function logout(req, res, next) {
  try {
    const email = req.user?.email;
    if (!email) {
      return res.status(401).json({ message: "unauthorized" });
    }

    await pool.query(
      `UPDATE  users SET refresh_token = NULL WHERE email = $1`,
      [email],
    );
    res.json({ message: "Logout" });
  } catch (err) {
    next(err);
  }
}
