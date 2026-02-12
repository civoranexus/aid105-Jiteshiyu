import ApplicationProgress from "../models/ApplicationProgress.js";
import catchAsync from "../utils/catchAsync.js";

export const getProgress = catchAsync(async (req, res, next) => {
  const progress = await ApplicationProgress.find({
    userId: req.user.id,
  }).populate("schemeId");

  res.status(200).json({
    status: "success",
    data: progress,
  });
});

export const updateProgress = catchAsync(async (req, res, next) => {
  const { schemeId, status } = req.body;

  const progress = await ApplicationProgress.findOneAndUpdate(
    {
      userId: req.user.id,
      schemeId,
    },
    { status },
    { upsert: true, new: true }
  );

  res.status(200).json({
    status: "success",
    data: progress,
  });
});
