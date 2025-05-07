import { describe, it, expect } from "vitest";
import request from "supertest";

import express from "express";

const app = express();
app.use(express.json());
app.get("/", (req, res) => {
  res.status(200).json("Passing smoke test");
});

describe("Express.js", () => {
  it("GET / should return 'Passing smoke test'", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.body).toBe("Passing smoke test");
  });
});
