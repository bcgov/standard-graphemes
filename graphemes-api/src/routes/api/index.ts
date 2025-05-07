import { Router } from "express";

const apiRouter = Router();

// GET /api
apiRouter.get("/", (req, res) => {
  res.json({ message: "API" });
});

export default apiRouter;
