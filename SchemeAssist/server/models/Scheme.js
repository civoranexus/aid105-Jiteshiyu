const mongoose = require("mongoose");

const schemeSchema = new mongoose.Schema(
  {
    schemeCode: {
      type: String,
      required: true,
      unique: true, 
    },
    name: {
      type: String,
      required: true,
    },
    ministry: String,
    description: String,
    benefits: String,
    eligibility: String,
    state: {
      type: String,
      default: "All",
    },
    category: String,
    source: {
      type: String,
      default: "MyScheme",
    },
    lastSyncedAt: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Scheme", schemeSchema);
