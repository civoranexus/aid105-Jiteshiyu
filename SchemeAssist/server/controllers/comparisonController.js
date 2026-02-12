import Scheme from "../models/Scheme.js";
import SchemeApplication from "../models/SchemeApplication.js";
import catchAsync from "../utils/catchAsync.js";

export const compareSchemes = catchAsync(async (req, res, next) => {
  const { schemeIds } = req.body;

  if (!schemeIds || schemeIds.length < 2 || schemeIds.length > 3) {
    return next(new AppError("Select 2 to 3 schemes for comparison", 400));
  }

  const schemes = await Scheme.find({
    _id: { $in: schemeIds },
  });

  if (!schemes.length) {
    return next(new AppError("Schemes not found", 404));
  }

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

  res.status(200).json({
    status: "success",
    data: result,
  });
});
