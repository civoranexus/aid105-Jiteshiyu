const axios = require("axios");
const Scheme = require("../models/Scheme");
const {
  notifyAllUsers,
  notifyWatchlistUsers,
} = require("../utils/alertService");

async function syncSchemesFromMyScheme() {
  console.log("Starting MyScheme sync...");

  try {
    const response = await axios.get(
      "https://www.myscheme.gov.in/search/data",
      { timeout: 15000 }
    );

    const schemes = response.data?.data || [];

    let inserted = 0;
    let updated = 0;

    for (const raw of schemes) {
      const schemeCode = raw.scheme_code || raw.id;
      const name = raw.scheme_name;

      if (!schemeCode || !name) continue;

      const normalizedScheme = {
        schemeCode,
        name,
        ministry: raw.ministry_name || "Unknown",
        description: raw.brief_description || "",
        benefits: raw.benefits || "",
        eligibility: raw.eligibility || "",
        state: raw.state_name || "All",
        category: raw.category || "General",
        lastSyncedAt: new Date(),
      };

      const existingScheme = await Scheme.findOne({ schemeCode });

      const savedScheme = await Scheme.findOneAndUpdate(
        { schemeCode },
        { $set: normalizedScheme },
        { upsert: true, new: true }
      );

      if (!existingScheme) {
        inserted++;
        await notifyAllUsers(savedScheme, "NEW_SCHEME");
      } else {
        updated++;
        await notifyWatchlistUsers(savedScheme);
      }
    }

    console.log(
      `MyScheme sync completed | Inserted: ${inserted}, Updated: ${updated}`
    );

    return {
      inserted,
      updated,
      total: schemes.length,
    };
  } catch (error) {
    console.error("MyScheme sync failed:", error);
    throw error;
  }
}

module.exports = { syncSchemesFromMyScheme };
