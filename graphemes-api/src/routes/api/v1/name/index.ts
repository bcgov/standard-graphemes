import anyAscii from "any-ascii";
import { Router } from "express";

const nameRouter = Router();

// GET /api/v1/name/:search
nameRouter.get("/:search", async (req, res) => {
  try {
    const { search } = req.params;
    const trimmed = search.trim();
    const segmenter = new Intl.Segmenter("en-CA", { granularity: "grapheme" });

    res.json({
      input: trimmed,
      output: {
        charactersSplit: trimmed.split(""),
        charactersSegmented: Array.from(segmenter.segment(trimmed)),
        anyAscii: anyAscii(trimmed),
      },
    });
  } catch (error) {
    console.error("Error searching names: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default nameRouter;
