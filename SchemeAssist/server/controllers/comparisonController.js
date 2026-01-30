import Scheme from "../models/Scheme.js";
import SchemeApplication from "../models/SchemeApplication.js";

export const compareSchemes = async (req, res) => {
  try {
    const { schemeIds } = req.body;

    if (!schemeIds || schemeIds.length < 2 || schemeIds.length > 3) {
      return res.status(400).json({
        message: "Select 2 to 3 schemes for comparison",
      });
    }

    const schemes = await Scheme.find({
      _id: { $in: schemeIds },
    });

    const applications = await SchemeApplication.find({
      schemeId: { $in: schemeIds },
    });

    const appMap = {};
    applications.forEach((a) => {
      appMap[a.schemeId.toString()] = a;
    });

    const result = schemes.map((s) => {
      const app = appMap[s._id.toString()];

      return {
        id: s._id,
        name: s.name,
        benefits: s.benefits,
        minAge: s.minAge,
        maxAge: s.maxAge,
        minIncome: s.minIncome,
        maxIncome: s.maxIncome,
        category: s.category,
        education: s.education,
        applicationMode: app?.applicationMode || "N/A",
        documents: app?.requiredDocuments || [],
      };
    });

    res.json({ schemes: result });
  } catch (err) {
    res.status(500).json({ message: "Comparison failed" });
  }
};
