import { Router } from "express";

import db from "../../db/index.js";

const apiRouter = Router();

// GET /api
apiRouter.get("/", async (req, res) => {
  const rows = await db<{ count: string }>("grapheme").count();
  const count = rows[0]?.count;
  console.log("count: ", count);

  res.json({ message: `API, count of graphemes: ${count}` });
});

export default apiRouter;
