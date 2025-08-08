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

// GET /api/v1/sites/:id - Fetch a single language by ID
sitesRouter.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const row = await db("site")
      .select(
        "site_guid as id",
        "slug",
        "first_voices_site_name as firstVoicesSiteName",
        "site_url as siteUrl",
        "language_guid as languageId"
      )
      .where({ site_guid: id })
      .first();
    if (!row) {
      res.status(404).json({ error: "Site not found" });
      return;
    }

    const site = SiteSchema.parse(row); // Transformation happens here
    res.json(site);
  } catch (error) {
    console.error("Error fetching site with site_guid '%s': %o", id, error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default sitesRouter;
