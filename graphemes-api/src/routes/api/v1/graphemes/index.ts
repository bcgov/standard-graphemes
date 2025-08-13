import { Router } from "express";
import db from "../../../../db/index.js";
import { GraphemeSchema } from "../../../../models/Grapheme.js";

const graphemesRouter = Router();

// GET /api/v1/graphemes - Fetch all graphemes with pagination
graphemesRouter.get("/", async (req, res) => {
  try {
    // Query parameters
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const limit = Math.min(
      1000,
      Math.max(1, parseInt(req.query.limit as string) || 100)
    );
    const offset = (page - 1) * limit;

    // Total count for pagination metadata
    const [{ count: totalCount }] = await db("grapheme").count("* as count");
    const totalPages = Math.ceil(Number(totalCount) / limit);

    // Paginated results
    const rows = await db("grapheme")
      .select(
        "language_guid as languageId",
        "site_guid as siteId",
        "canonical_grapheme_combination as canonicalGraphemeCombination"
      )
      .limit(limit)
      .offset(offset);

    const graphemes = rows.map((row) => GraphemeSchema.parse(row));

    res.json({
      data: graphemes,
      pagination: {
        page,
        limit,
        totalCount: Number(totalCount),
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    });
  } catch (error) {
    console.error("Error fetching graphemes:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default graphemesRouter;
