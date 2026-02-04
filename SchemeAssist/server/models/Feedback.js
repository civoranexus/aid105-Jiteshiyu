import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
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

    rating: {
      type: String,
      enum: ["HELPFUL", "NOT_HELPFUL"],
      required: true,
    },
  },
  { timestamps: true }
);

feedbackSchema.index({ userId: 1, schemeId: 1 }, { unique: true });

export default mongoose.model("Feedback", feedbackSchema);
