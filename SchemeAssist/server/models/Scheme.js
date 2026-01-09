import mongoose from "mongoose";

const schemeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    targetGroup: {
      type: String,
    },
    eligibility: {
      incomeRange: String,
      ageGroup: String,
      occupation: String,
      category: String,
      location: String,
    },
    benefits: {
      type: String,
    },
    officialLink: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Scheme", schemeSchema);
