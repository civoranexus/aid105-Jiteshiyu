import Feedback from "../models/Feedback.js";

export const submitFeedback = async (req, res) => {
  const { schemeId, rating } = req.body;

  const feedback = await Feedback.findOneAndUpdate(
    { userId: req.user.id, schemeId },
    { rating },
    { upsert: true, new: true }
  );

  res.json({
    message: "Feedback recorded",
    feedback,
  });
};

export const getSchemeFeedbackStats = async (schemeId) => {
  const helpful = await Feedback.countDocuments({
    schemeId,
    rating: "HELPFUL",
  });

  const notHelpful = await Feedback.countDocuments({
    schemeId,
    rating: "NOT_HELPFUL",
  });

  return { helpful, notHelpful };
};
