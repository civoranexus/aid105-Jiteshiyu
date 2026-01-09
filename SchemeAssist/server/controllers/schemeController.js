import Scheme from "../models/Scheme.js";

export const getAllSchemes = async (req, res) => {
  try {
    const schemes = await Scheme.find().sort({ createdAt: -1 });
    res.status(200).json(schemes);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch schemes",
      error: error.message,
    });
  }
};
