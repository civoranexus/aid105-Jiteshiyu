import SchemeApplication from "../models/SchemeApplication.js";

export const getApplicationProcess = async (req, res) => {
  try {
    const application = await SchemeApplication.findOne({
      schemeId: req.params.schemeId,
    });

    if (!application) {
      return res.status(404).json({
        message: "Application process not available",
      });
    }

    res.json(application);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch application process" });
  }
};
