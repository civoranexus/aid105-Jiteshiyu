const Scheme = require("../models/Scheme");
const { syncSchemesFromMyScheme } = require("../services/schemeSyncService");

exports.getSchemes = async (req, res) => {
  try {
    const filters = {};

    if (req.query.state) filters.state = req.query.state;
    if (req.query.category) filters.category = req.query.category;

    const schemes = await Scheme.find(filters).sort({ name: 1 });

    res.json(schemes);
  } catch (err) {
    console.error("Get schemes error:", err);
    res.status(500).json({ message: "Failed to fetch schemes" });
  }
};

exports.syncSchemes = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ message: "Forbidden" });
    }

    const result = await syncSchemesFromMyScheme();

    res.json({
      message: "Schemes synced successfully",
      inserted: result.inserted,
      updated: result.updated,
      totalFetched: result.total,
    });
  } catch (err) {
    console.error("Sync schemes error:", err);
    res.status(500).json({ message: "Scheme sync failed" });
  }
};
