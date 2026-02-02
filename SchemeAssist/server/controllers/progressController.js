import ApplicationProgress from "../models/ApplicationProgress.js";

export const getProgress = async (req, res) => {
  const progress = await ApplicationProgress.find({
    userId: req.user.id,
  }).populate("schemeId");

  res.json(progress);
};

export const updateProgress = async (req, res) => {
  const { schemeId, status } = req.body;

  const progress = await ApplicationProgress.findOneAndUpdate(
    {
      userId: req.user.id,
      schemeId,
    },
    { status },
    { upsert: true, new: true }
  );

  res.json(progress);
};
