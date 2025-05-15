import { Router } from "express";
import db from "../../../../db/index.js";
import { LanguageSchema } from "../../../../models/Language.js";

const languagesRouter = Router();

// GET /api/v1/languages - Fetch all languages
languagesRouter.get("/", async (req, res) => {
  try {
    const rows = await db("language").select(
      "language_guid as id",
      "language_name as name",
      "alternate_names as alternateNames",
      "community_keywords as communityKeywords",
      "bcp47_language_codes as bcp47LanguageCodes"
    );
    const languages = rows.map((row) => LanguageSchema.parse(row)); // Transformation happens here
    res.json(languages);
  } catch (error) {
    console.error("Error fetching languages:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET /api/v1/languages/:id - Fetch a single language by ID
languagesRouter.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const row = await db("language").where({ id }).first();
    if (!row) {
      res.status(404).json({ error: "Language not found" });
      return;
    }

    const language = LanguageSchema.parse(row); // Transformation happens here
    res.json(language);
  } catch (error) {
    console.error(`Error fetching language with id ${id}:`, error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default languagesRouter;
