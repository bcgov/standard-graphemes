import express from "express";
import { describe, it, expect } from "vitest";
import request from "supertest";

import router from "./routes/index.js";

const app = express();
app.use(express.json());
app.use("/", router);

describe("graphemes-api server", () => {
  it("GET / should return JSON with status 200", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(typeof response.body).toBe("object");
  });
});
