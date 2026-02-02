import mongoose from "mongoose";

const applicationProgressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    schemeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Scheme",
      required: true,
    },

    status: {
      type: String,
      enum: [
        "Not Started",
        "Applied",
        "Under Review",
        "Approved",
        "Rejected",
      ],
      default: "Not Started",
    },
  },
  { timestamps: true }
);

applicationProgressSchema.index(
  { userId: 1, schemeId: 1 },
  { unique: true }
);

export default mongoose.model(
  "ApplicationProgress",
  applicationProgressSchema
);
