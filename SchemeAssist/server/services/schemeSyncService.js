const axios = require("axios");
const Scheme = require("../models/Scheme");

async function syncSchemesFromMyScheme() {
  try {
    console.log("Starting MyScheme sync...");

    const response = await axios.get(
      "https://www.myscheme.gov.in/search/data"
    );

    const schemes = response.data?.data || [];

    let upsertCount = 0;

    for (const raw of schemes) {
      const normalizedScheme = {
        schemeCode: raw.scheme_code || raw.id,
        name: raw.scheme_name,
        ministry: raw.ministry_name,
        description: raw.brief_description,
        benefits: raw.benefits || "",
        eligibility: raw.eligibility || "",
        state: raw.state_name || "All",
        category: raw.category || "General",
        lastSyncedAt: new Date(),
      };

      if (!normalizedScheme.schemeCode || !normalizedScheme.name) {
        continue; 
      }

      await Scheme.updateOne(
        { schemeCode: normalizedScheme.schemeCode },
        { $set: normalizedScheme },
        { upsert: true }
      );

      upsertCount++;
    }

    console.log(`MyScheme sync completed. Upserted: ${upsertCount}`);
  } catch (error) {
    console.error("MyScheme sync failed:", error.message);
    throw error;
  }
}

module.exports = { syncSchemesFromMyScheme };
