import { Router } from "express";
import apiRouter from "./api/index.js";

const router = Router();

// GET /
router.get("/", (req, res) => {
  res.json({ message: "Root" });
});

router.use("/api", apiRouter);

export default router;
