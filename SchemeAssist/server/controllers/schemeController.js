import axios from "axios";
import Scheme from "../models/Scheme.js";

import { recommendationSchema } from "../validators/recommendationValidator.js";
import { filterEligibleSchemes } from "../utils/eligibility.js";
import { generateExplainabilityReport } from "../utils/explainabilityEngine.js";
import { getEligibilityBreakdown } from "../utils/breakdown.js";
import { getSchemeFeedbackStats } from "./feedbackController.js";

import AppError from "../utils/AppError.js";
import catchAsync from "../utils/catchAsync.js";

export const getRecommendations = catchAsync(async (req, res, next) => {
  const { error } = recommendationSchema.validate(req.body);

  if (error) {
    return next(
      new AppError(error.details[0].message, 400)
    );
  }

  const schemes = await Scheme.find();

  const eligibleSchemes = filterEligibleSchemes(schemes, req.body);

  if (eligibleSchemes.length === 0) {
    return res.status(200).json({
      status: "success",
      data: {
        recommendations: [],
      },
    });
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

  let mlResponse;

  try {
    mlResponse = await axios.post(
      "http://127.0.0.1:8001/predict",
      mlPayload,
      { timeout: 3000 }
    );
  } catch (err) {
    return next(
      new AppError(
        "ML Recommendation service unavailable",
        503
      )
    );
  }

  const ranked = mlResponse.data.ranked_schemes;

  const recommendations = await Promise.all(
    ranked.map(async (r) => {
      const scheme = eligibleSchemes.find(
        (s) => s._id.toString() === r.scheme_id
      );

      if (!scheme) return null;

      const stats = await getSchemeFeedbackStats(scheme._id);

      const feedbackBoost =
        stats.helpful * 0.02 - stats.notHelpful * 0.02;

      const finalScore = r.score + feedbackBoost;

      const breakdown = getEligibilityBreakdown(scheme, req.body);

      const explainReport = generateExplainabilityReport(
        scheme,
        req.body
      );

      return {
        scheme_id: scheme._id,
        scheme_name: scheme.name,

        ml_score: r.score,
        feedback_boost: feedbackBoost,
        final_score: finalScore,

        feedback: stats,

        reason: explainReport.summary,
        overall_match: explainReport.overall_match,
        explainability: explainReport.factors,

        eligibility: breakdown,
      };
    })
  );

  const cleanRecommendations = recommendations.filter(Boolean);

  cleanRecommendations.sort(
    (a, b) => b.final_score - a.final_score
  );

  res.status(200).json({
    status: "success",
    results: cleanRecommendations.length,
    data: {
      recommendations: cleanRecommendations,
    },
  });
});
