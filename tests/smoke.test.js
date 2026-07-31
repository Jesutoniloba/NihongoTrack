import test from "node:test";
import assert from "node:assert/strict";
import request from "supertest";
import app from "../src/server.js";
import * as authController from "../src/controllers/auth.controller.js";
import pool from "../src/config/db.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

test("project modules can be imported", async () => {
  const routesModule = await import("../src/routes/routes.js");
  const authRoutesModule = await import("../src/routes/auth.routes.js");

  assert.ok(routesModule);
  assert.ok(authRoutesModule);
});

test("GET / returns the root message", async () => {
  const response = await request(app).get("/");

  assert.equal(response.status, 200);
  assert.equal(response.text, "whyyyyyy");
});

test("POST /api/auth/register validates required fields", async () => {
  const response = await request(app).post("/api/auth/register").send({});

  assert.equal(response.status, 400);
  assert.equal(response.text, "Bad");
});

test("register creates a user and returns 201", async () => {
  const hashMock = test.mock.method(argon2, "hash", async () => "hashed-password");
  const createUserMock = test.mock.method(pool, "query", async () => ({
    rows: [{ username: "mika" }],
  }));

  const req = { body: { username: "mika", email: "mika@example.com", password: "secret" } };
  const res = {
    statusCode: 200,
    payload: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(body) {
      this.payload = body;
      return this;
    },
  };

  await authController.register(req, res);

  assert.equal(res.statusCode, 201);
  assert.equal(res.payload.message, "User created Sucessfully");
  assert.equal(createUserMock.mock.calls.length, 1);
  assert.equal(hashMock.mock.calls.length, 1);
});

test("login returns tokens for a valid user", async () => {
  test.mock.method(pool, "query", async (sql) => {
    if (sql.includes("SELECT email")) {
      return { rows: [{ email: "mika@example.com" }] };
    }
    if (sql.includes("password_hash")) {
      return { rows: [{ password_hash: "hashed-password" }] };
    }
    if (sql.includes("UPDATE users SET refresh_token")) {
      return { rows: [] };
    }
    return { rows: [] };
  });
  test.mock.method(argon2, "verify", async () => true);
  test.mock.method(jwt, "sign", () => "signed-token");

  const req = { body: { email: "mika@example.com", password: "secret" } };
  const res = {
    payload: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(body) {
      this.payload = body;
      return this;
    },
    send(body) {
      this.payload = body;
      return this;
    },
  };

  await authController.login(req, res);

  assert.equal(res.payload.accessToken, "signed-token");
  assert.equal(res.payload.refreshToken, "signed-token");
});

test("logout currently errors because refreshToken is not defined", async () => {
  const req = { body: { email: "mika@example.com" } };
  const res = {};

  await assert.rejects(() => authController.logout(req, res), {
    name: "ReferenceError",
  });
});
