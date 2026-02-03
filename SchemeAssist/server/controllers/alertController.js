import Alert from "../models/Alert.js";

export const getAlerts = async (req, res) => {
  const alerts = await Alert.find({ userId: req.user.id })
    .sort({ createdAt: -1 })
    .populate("schemeId");

  res.json(alerts);
};

export const markAlertRead = async (req, res) => {
  await Alert.findByIdAndUpdate(req.params.id, {
    isRead: true,
  });

  res.json({ message: "Alert marked as read" });
};
