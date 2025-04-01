import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";

import { api } from "./routes/confusable.mjs";

const app = new Hono();

// Log requests to all routes
app.use(async (c, next) => {
  console.log("Request:", c.req.method, c.req.url);
  console.log("Headers:", c.req.header());
  await next();
});

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

// Mount Confusable API and OpenAPI docs at /api/v1/
app.use("/api/*", cors());
app.route("/api/v1", api);

const port = process.env?.PORT ? parseInt(process.env.PORT) : 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
