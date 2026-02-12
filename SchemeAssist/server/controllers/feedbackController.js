import Feedback from "../models/Feedback.js";

import catchAsync from "../utils/catchAsync.js";

export const submitFeedback = catchAsync(async (req, res, next) => {
  if (!req.user) {
    return next(new AppError("Unauthorized access", 401));
  }

  const { schemeId, rating } = req.body;

  if (!schemeId || !rating) {
    return next(new AppError("schemeId and rating are required", 400));
  }

  const feedback = await Feedback.findOneAndUpdate(
    { userId: req.user.id, schemeId },
    { rating },
    { upsert: true, new: true }
  );

  res.status(200).json({
    status: "success",
    message: "Feedback recorded",
    data: feedback,
  });
});

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
