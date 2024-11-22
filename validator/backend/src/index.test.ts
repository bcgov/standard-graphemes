import { describe, it, expect } from "vitest";
import { Hono } from "hono";
import { api } from "./routes/confusable.mts";

const app = new Hono();
app.get("/", (c) => c.text("Hello Hono!"));
app.route("/api/v1", api);

describe("Hono API", () => {
  it("GET / should return Hello Hono!", async () => {
    const res = await app.request("/");
    expect(res.status).toBe(200);
    expect(await res.text()).toBe("Hello Hono!");
  });

  it("GET /api/v1/confusable should return list of confusables", async () => {
    const res = await app.request("/api/v1/confusable");
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toHaveLength(912); // For our current confusables data set
  });

  it("GET /api/v1/confusable/label/:label should return a confusable", async () => {
    const targetLabel = "’";
    const res = await app.request(`/api/v1/confusable/label/${targetLabel}`);
    expect(res.status).toBe(200);
    const confusable = await res.json();
    expect(typeof confusable).toBe("object");

    // label
    expect(confusable).toHaveProperty("label");
    expect(confusable.label).toBeTypeOf("string");
    expect(confusable.label).toBe(targetLabel);

    // id
    expect(confusable).toHaveProperty("id");
    expect(confusable.id).toBeTypeOf("string");
    expect(confusable.id).toBe("\\u2019");

    // confusableChar
    expect(confusable).toHaveProperty("confusableChar");
    expect(confusable.confusableChar).toBeTypeOf("object");
    expect(Array.isArray(confusable.confusableChar)).toBeTruthy();
    expect(confusable.confusableChar).toHaveLength(8);
    expect(confusable.confusableChar[0]).toBeTypeOf("string");
    expect(confusable.confusableChar[0]).toBe(" ̒");

    // confusableUnicode
    expect(confusable).toHaveProperty("confusableUnicode");
    expect(confusable.confusableUnicode).toBeTypeOf("object");
    expect(Array.isArray(confusable.confusableUnicode)).toBeTruthy();
    expect(confusable.confusableUnicode).toHaveLength(8);
    expect(confusable.confusableUnicode[0]).toBeTypeOf("string");
    expect(confusable.confusableUnicode[0]).toBe("\\u0312");
  });

  it("GET /api/v1/confusable/char/:confusableChar", async () => {
    const targetChar = " ̔";
    const res = await app.request(`/api/v1/confusable/char/${targetChar}`);
    expect(res.status).toBe(200);
    const confusables = await res.json();
    expect(typeof confusables).toBe("object");
    expect(Array.isArray(confusables)).toBeTruthy();
    const match = confusables[0];

    // label
    expect(match).toHaveProperty("label");
    expect(match.label).toBeTypeOf("string");
    expect(match.label).toBe("’");

    // id
    expect(match).toHaveProperty("id");
    expect(match.id).toBeTypeOf("string");
    expect(match.id).toBe("\\u2019");

    // confusableChar
    expect(match).toHaveProperty("confusableChar");
    expect(match.confusableChar).toBeTypeOf("object");
    expect(Array.isArray(match.confusableChar)).toBeTruthy();
    expect(match.confusableChar).toHaveLength(8);
    expect(match.confusableChar[0]).toBeTypeOf("string");
    expect(match.confusableChar[0]).toBe(" ̒");

    // confusableUnicode
    expect(match).toHaveProperty("confusableUnicode");
    expect(match.confusableUnicode).toBeTypeOf("object");
    expect(Array.isArray(match.confusableUnicode)).toBeTruthy();
    expect(match.confusableUnicode).toHaveLength(8);
    expect(match.confusableUnicode[0]).toBeTypeOf("string");
    expect(match.confusableUnicode[0]).toBe("\\u0312");
  });

  it("GET /api/v1/docs should return OpenAPI documentation", async () => {
    const res = await app.request("/api/v1/docs");
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body?.openapi).toEqual("3.1.0");
  });
});
