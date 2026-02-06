import SchemeApplication from "../models/SchemeApplication.js";
import AppError from "../utils/AppError.js";
import catchAsync from "../utils/catchAsync.js";

export const getApplicationProcess = catchAsync(async (req, res, next) => {
  const application = await SchemeApplication.findOne({
    schemeId: req.params.schemeId,
  });

  if (!application) {
    return next(new AppError("Application process not available", 404));
  }

  res.status(200).json({
    status: "success",
    data: application,
  });
});
