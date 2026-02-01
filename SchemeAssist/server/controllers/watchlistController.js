import User from "../models/User.js";
import Scheme from "../models/Scheme.js";

export const addToWatchlist = async (req, res) => {
  const userId = req.user.id;
  const { schemeId } = req.body;

  const scheme = await Scheme.findById(schemeId);
  if (!scheme) {
    return res.status(404).json({ message: "Scheme not found" });
  }

  const user = await User.findById(userId);

  if (user.watchlist.includes(schemeId)) {
    return res.status(400).json({ message: "Already in watchlist" });
  }

  user.watchlist.push(schemeId);
  await user.save();

  res.json({ message: "Added to watchlist" });
};

export const removeFromWatchlist = async (req, res) => {
  const userId = req.user.id;
  const { schemeId } = req.params;

  const user = await User.findById(userId);
  user.watchlist = user.watchlist.filter(
    (id) => id.toString() !== schemeId
  );

  await user.save();

  res.json({ message: "Removed from watchlist" });
};

export const getWatchlist = async (req, res) => {
  const user = await User.findById(req.user.id).populate("watchlist");
  res.json(user.watchlist);
};
