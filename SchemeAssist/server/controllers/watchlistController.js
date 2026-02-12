import User from "../models/User.js";
import Scheme from "../models/Scheme.js";
import catchAsync from "../utils/catchAsync.js";

export const addToWatchlist = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const { schemeId } = req.body;

  const scheme = await Scheme.findById(schemeId);
  if (!scheme) {
    return next(new AppError("Scheme not found", 404));
  }

  const user = await User.findById(userId);

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  if (user.watchlist.includes(schemeId)) {
    return next(new AppError("Already in watchlist", 400));
  }

  user.watchlist.push(schemeId);
  await user.save();

  res.status(200).json({
    status: "success",
    message: "Added to watchlist",
  });
});

export const removeFromWatchlist = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const { schemeId } = req.params;

  const user = await User.findById(userId);

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  user.watchlist = user.watchlist.filter(
    (id) => id.toString() !== schemeId
  );

  await user.save();

  res.status(200).json({
    status: "success",
    message: "Removed from watchlist",
  });
});

export const getWatchlist = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id).populate("watchlist");

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  res.status(200).json({
    status: "success",
    data: user.watchlist,
  });
});
