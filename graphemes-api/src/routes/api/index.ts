import { Router } from "express";

import db from "../../db/index.js";

const apiRouter = Router();

// GET /api
apiRouter.get("/", async (req, res) => {
  try {
    const rows = await db<{ count: string }>("grapheme").count();
    const count = rows[0]?.count;
    console.log("count: ", count);

    res.json({ message: `API, count of graphemes: ${count}` });
  } catch (error) {
    console.error("Error fetching grapheme count:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default apiRouter;
