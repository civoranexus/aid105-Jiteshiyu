import Alert from "../models/Alert.js";
import AppError from "../utils/AppError.js";
import catchAsync from "../utils/catchAsync.js";

export const getAlerts = catchAsync(async (req, res, next) => {
  const alerts = await Alert.find({ userId: req.user.id })
    .sort({ createdAt: -1 })
    .populate("schemeId");

  res.status(200).json({
    status: "success",
    data: alerts,
  });
});

export const markAlertRead = catchAsync(async (req, res, next) => {
  const alert = await Alert.findByIdAndUpdate(
    req.params.id,
    { isRead: true },
    { new: true }
  );

  if (!alert) {
    return next(new AppError("Alert not found", 404));
  }

  res.status(200).json({
    status: "success",
    message: "Alert marked as read",
  });
});
