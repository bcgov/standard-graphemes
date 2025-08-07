import { Router } from "express";
import db from "../../../../db/index.js";
import { SiteSchema } from "../../../../models/Site.js";

const sitesRouter = Router();

// GET /api/v1/sites - Fetch all sites
sitesRouter.get("/", async (req, res) => {
  try {
    const rows = await db("site").select(
      "site_guid as id",
      "slug",
      "first_voices_site_name as firstVoicesSiteName",
      "site_url as siteUrl",
      "language_guid as languageId"
    );
    const sites = rows.map((row) => SiteSchema.parse(row));
    res.json(sites);
  } catch (error) {
    console.error("Error fetching sites:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default sitesRouter;
