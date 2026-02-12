import Alert from "../models/Alert.js";
import User from "../models/User.js";

export const notifyAllUsers = async (scheme, type) => {
  const users = await User.find();

  const alerts = users.map((user) => ({
    userId: user._id,
    schemeId: scheme._id,
    type,
    message:
      type === "NEW_SCHEME"
        ? `New scheme added: ${scheme.name}`
        : `Scheme updated: ${scheme.name}`,
  }));

  await Alert.insertMany(alerts);
};

export const notifyWatchlistUsers = async (scheme) => {
  const users = await User.find({ watchlist: scheme._id });

  const alerts = users.map((user) => ({
    userId: user._id,
    schemeId: scheme._id,
    type: "UPDATED_SCHEME",
    message: `A scheme in your watchlist was updated: ${scheme.name}`,
  }));

  await Alert.insertMany(alerts);
};
