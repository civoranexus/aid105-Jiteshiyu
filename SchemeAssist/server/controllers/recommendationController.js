import axios from "axios";
import { recommendationSchema } from "../validators/recommendationValidator.js";
import { filterEligibleSchemes } from "../utils/eligibility.js";
import { generateExplainabilityReport } from "../utils/explainabilityEngine.js";
import { getEligibilityBreakdown } from "../utils/breakdown.js";
import { getSchemeFeedbackStats } from "./feedbackController.js";
import Scheme from "../models/Scheme.js";

export const getRecommendations = async (req, res) => {
  const { error } = recommendationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }

  try {
    const schemes = await Scheme.find();

    const eligibleSchemes = filterEligibleSchemes(schemes, req.body);

    if (eligibleSchemes.length === 0) {
      return res.json({ recommendations: [] });
    }

    const mlPayload = {
      user_profile: req.body,
      eligible_schemes: eligibleSchemes.map((s) => ({
        scheme_id: s._id.toString(),
        features: {
          minIncome: s.minIncome,
          maxIncome: s.maxIncome,
        },
      })),
    };

    const mlResponse = await axios.post(
      "http://127.0.0.1:8001/predict",
      mlPayload,
      { timeout: 3000 }
    );

    const ranked = mlResponse.data.ranked_schemes;

    const recommendations = ranked
      .map((r) => {
        const scheme = eligibleSchemes.find(
          (s) => s._id.toString() === r.scheme_id
        );

        if (!scheme) return null;

        const breakdown = getEligibilityBreakdown(scheme, req.body);

        const explainReport = generateExplainabilityReport(
          scheme,
          req.body
        );

        return {
          scheme_id: scheme._id,
          scheme_name: scheme.name,
          score: r.score,

          reason: explainReport.summary,
          overall_match: explainReport.overall_match,
          explainability: explainReport.factors,

          eligibility: breakdown,
        };
      })
      .filter(Boolean);

    return res.json({ recommendations });

  } catch (err) {
    console.error("Recommendation Error:", err.message);

    return res.status(500).json({
      message: "Recommendation service unavailable",
    });
  }
};
